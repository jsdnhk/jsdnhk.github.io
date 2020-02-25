#!/usr/bin/env ruby
# frozen_string_literal: true

# Get all the pages latest updated dates and export the result to yaml file

require 'yaml'

# Dir["**/*"], to fetch inside the directories as well
pages_folder_path = File.expand_path('../pages', File.dirname(__FILE__))
data_folder_path = File.expand_path('../_data', File.dirname(__FILE__))
collections_folder_path = File.expand_path('../collections', File.dirname(__FILE__))
pages = Dir["#{pages_folder_path}/*"].map { |dir| File.basename(dir.to_s.strip) }

latest_dates = []
output_yaml = "#{data_folder_path}/pages_latest.yaml"

def getLatestTimeFiles(arr_files)
  return nil if(!arr_files || arr_files.empty?)
  mtime_latest = nil
  arr_files.each do |file|
    if mtime_latest
      mtime_latest = File.mtime(file) if File.mtime(file) > mtime_latest
    else
      mtime_latest = File.mtime(file)
    end
  end
  mtime_latest
end

pages.each do |page|
  arr_page_files =
  case page
  when 'blog'
    Dir["#{collections_folder_path}/_posts/*"]
  when 'debug'
    Dir["#{pages_folder_path}/debug/*"]
  when 'links'
    Dir["#{data_folder_path}/links.yaml"]
  when 'quotes'
    Dir["#{data_folder_path}/quotes/*"]
  when 'resume'
    Dir["#{pages_folder_path}/resume/*"]
  else
    raise("have page which is not yet handled.[#{page}]")
  end
  mtime_page = getLatestTimeFiles(arr_page_files)
  latest_date = {'name' => page, 'mtime' => (mtime_page ? mtime_page.strftime("%Y%m%d") : nil)}
  latest_dates.append(latest_date)
end
File.write(output_yaml, latest_dates.to_yaml)


