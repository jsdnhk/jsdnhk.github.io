#!/usr/bin/env ruby
# frozen_string_literal: true

# Ensures that quote texts in json files(quote) are appeared once only

require 'json'

saints_folder_path = File.expand_path('../assets/saints', File.dirname(__FILE__))
json_files = Dir["#{saints_folder_path}/*.json"]

class String
  def formatted
    self.strip!
    !self.match?(/[[:punct:]]/) ? (self + ".") : self
  end
end

is_success = true
begin
  json_files.each do |json_file|
    data = JSON.load(File.read(json_file))
    data_results_new = Array.new(data['results'])
    data_quotes = []
    data_results_new.reject! do |result|
      result.delete("_id")
      if data_quotes.any? { |quote| quote.formatted.eql?(result["quoteText"].formatted) }
        true
      else
        result["quoteText"] = result["quoteText"].formatted
        data_quotes.append(result["quoteText"])
        false
      end
    end
    next if(!data_results_new || data_results_new.empty?)
    data = {'count' => data_results_new.length, 'results' => data_results_new}
    File.open(json_file, "w") { |f| f.write(JSON.pretty_generate(data)) }
  end
rescue
  $stderr.puts "Error occurred: #{$!}"
  is_success = false
ensure
  $stdout.puts( is_success ? "Success!" : "Failed" )
  exit(is_success)
end
