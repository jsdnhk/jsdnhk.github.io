#!/usr/bin/env ruby
# frozen_string_literal: true

# Check out and log whether all the http links validity for the selected files

require 'yaml'
require 'uri'
require "net/http"

IS_FORMAT_URLS = true
DATA_FOLDER_PATH = File.expand_path('../_data', File.dirname(__FILE__))
SOURCE_FOLDER_PATH = File.expand_path('../', File.dirname(__FILE__))
CHECKLIST = {
  links: [Dir["#{DATA_FOLDER_PATH}/links.yaml"]].flatten,
  fonts: [Dir["#{DATA_FOLDER_PATH}/fonts/*.yaml"]].flatten,
  toolset: [Dir["#{DATA_FOLDER_PATH}/toolset/*.yaml"]].flatten
}
FILES_ALL = CHECKLIST.values.flatten

class String
  def fUrl!
    return self unless self && IS_FORMAT_URLS
    self.strip!
    self.gsub!(/(?=\/?)www\./,'')
    self.gsub!(/\/+$/, '')
    self
  end
end

class Array
  def mapfUrl!
    return self unless self && IS_FORMAT_URLS
    self.map! { |url| url.fUrl!; url }
  end
end

class UrlsChecker
  attr_reader :filename, :urls, :urls_valid, :urls_invalid

  def initialize(filename, urls = [])
    @filename = filename    # fullpath preferred
    @urls = urls
    @urls_valid, @urls_invalid= {}, {}
    checkUrls()
  end

  public
  def self.getHTTPStatus(url_string)
    status = {code: nil, msg: nil}
    begin
      url = URI.parse(url_string)
      req = Net::HTTP.new(url.host, url.port)
      req.use_ssl = (url.scheme == 'https')
      path = url.path if !url.path.empty?
      res = req.request_head(path || '/')
      status = {code: res.code, msg: res.code_type.to_s}
    rescue Exception => ex
      status = {code: nil, msg: ex.message}
    end
    status
  end

  def self.codeConnective?(http_code)
    http_code.to_s =~ /\b[2-3][0-9][0-9]\b/
  end

  private
  def checkUrls()
    threads = []
    @urls.each do |url|
      threads << Thread.new do
        status = UrlsChecker::getHTTPStatus(url)
        if UrlsChecker::codeConnective?(status[:code])
          @urls_valid[url] = status[:msg]
        else
          @urls_invalid[url] = status[:msg]
        end
      end
    end
    threads.each { |thr| thr.join }
   end
end

class Main
  def initialize()
    @filenames = FILES_ALL
    @objs = {}
    @checkers = {}
  end

  public
  def start()
    # formatFiles()
    checkFiles()
    displayFiles()
  end

  private
  def formatFiles()
    threads = []
    @filenames.each do |filename|
      threads << Thread.new do
        formatFile(filename)
      end
    end
    threads.each { |thr| thr.join }
  end

  def formatFile(filename)
  end

  def checkFiles()
    threads = []
    @filenames.each do |file|
      threads << Thread.new do
          checkFile(file)
      end
    end
    threads.each { |thr| thr.join }
  end

  def checkFile(file)
    obj_file = nil
    urls_file = []
    if CHECKLIST[:links].include?(file)
      obj_file = YAML.load_file(file)
      obj_file.each { |ary_item| urls_file.concat(ary_item['suggestions'].mapfUrl!) if ary_item.include?('suggestions') }
    elsif CHECKLIST[:fonts].include?(file)
      obj_file = YAML.load_file(file)
      obj_file.each { |ary_item| urls_file.push(ary_item['url'].fUrl!) if ary_item.include?('url') }
    elsif CHECKLIST[:toolset].include?(file)
      obj_file = YAML.load_file(file)
      obj_file.each do |ary_item|
        urls_file.concat(ary_item['tools'].map { |ary_item_inner| ary_item_inner['url'].fUrl! if ary_item_inner.include?('url') }) if ary_item.include?('tools')
      end
    end
    @objs[file] = obj_file
    @checkers[file] = UrlsChecker.new(file, urls_file)
  end

  def displayFiles
    @filenames.each do |file|
      obj = @objs[file]
      checker = @checkers[file]
      puts "#{file}:"
      # puts "- urls_valid:"; pp checker.urls_valid
      puts "- urls_invalid:"; pp checker.urls_invalid
    end
  end
end

if __FILE__ == $0
  is_success = true
  begin
    $stdout.puts('Starting verify-data-urls:')
    main = Main.new()
    main.start()
  rescue Exception => ex
    $stderr.puts('Error occurred:')
    $stderr.puts(ex.message)
    $stderr.puts(ex.backtrace)
    is_run_success = false
  ensure
    $stdout.puts('Work finished.')
    exit(is_success)
  end
end