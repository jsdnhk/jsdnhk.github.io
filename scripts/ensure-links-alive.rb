#!/usr/bin/env ruby
# frozen_string_literal: true

# Check out whether all the http links validity for the selected files

require 'yaml'
require 'uri'

SUFFIX_INVALID='_invalid.yaml'

DATA_FOLDER_PATH = File.expand_path('../_data', File.dirname(__FILE__))
SOURCE_FOLDER_PATH = File.expand_path('../', File.dirname(__FILE__))

class UrlsChecker
  attr_reader :filename, :filename_invalid, :urls, :urls_valid, :urls_invalid, :urls_changed

  def initialize(filename, urls = [])
    @filename = filename    # fullpath preferred
    @filename_invalid = getSuffixedFilename(filename, SUFFIX_INVALID)
    @urls = urls
    @urls_valid, @urls_invalid = [], []
    @urls_changed = {}
    checkUrls()
  end

  private
  def checkUrls()
    threads = []
    @urls.each do |url|
      threads << Thread.new do
        puts "thread [#{url}] started."
        furl = UrlsChecker.formattedUrl(url)
        @urls_changed[url] = furl if !url.eql?(furl)
        if `curl -Is #{furl} | head -1` =~ /\b[2-3][0-9][0-9]\b/
          @urls_valid.push(furl)
        else
          @urls_invalid.push(furl)
        end
      end
    end
    threads.each { |thr| thr.join }
   end

  def getSuffixedFilename(filename, suffix)
    dirname = File.dirname(filename)
    basename = File.basename(filename, ".*") + suffix
    File.expand_path(basename, dirname)
  end

  public
  def self.formattedUrl(input_url)
    return_url = input_url.strip.gsub(/(?=\/?)www\./,'').gsub(/\/+$/, '')
    uri_url = URI(return_url)
    return_url = "https://#{return_url}" if !uri_url.scheme
    return_url
  end
end

class Main
  LINKS = [Dir["#{DATA_FOLDER_PATH}/links.yaml"]].flatten

  def initialize()
    @files = [LINKS].flatten
    @objs = {}
    @checkers = {}
  end

  public
  def start()
    @files.each do |file|
      checkFile(file)
    end
    @files.each do |file|
      obj = @objs[file]
      checker = @checkers[file]
      puts "@checkers[#{file}].urls_valid:"
      pp checker.urls_valid
      puts "@checkers[#{file}].urls_invalid:"
      pp checker.urls_invalid
      puts "@checkers[#{file}].urls_changed:"
      pp checker.urls_changed
    end
  end

  private
  def checkFile(file)
    obj_file = nil
    urls_file = []
    if LINKS.include?(file)
      obj_file = YAML.load_file(file)
      obj_file.each { |ary_item| urls_file.concat(ary_item['suggestions']) if ary_item.include?('suggestions') }
    end
    @objs[file] = obj_file
    @checkers[file] = UrlsChecker.new(file, urls_file)
  end
end

if __FILE__ == $0
  is_success = true
  begin
    main = Main.new()
    main.start()
  rescue Exception => ex
    $stderr.puts('Error occurred: ')
    $stderr.puts(ex.message)
    $stderr.puts(ex.backtrace)
    is_run_success = false
  ensure
    $stdout.puts('Work finished.')
    exit(is_success)
  end
end