# frozen_string_literal: true

require "rubygems"
require "html-proofer"
require "rake"

require 'yaml'
require 'time'

SOURCE = "."
COLLECTIONS = "collections"
ASSETS = "assets"
DIRS = {
    'layouts' => File.join(SOURCE, "_layouts"),
    'scripts' => File.join(SOURCE, "scripts"),
    'pages' => File.join(SOURCE, "pages"),
    'site' => File.join(SOURCE, "_site"),
    'drafts' => File.join(SOURCE, COLLECTIONS, "_drafts"),
    'posts' => File.join(SOURCE, COLLECTIONS, "_posts"),
    'posts_asset' => File.join(SOURCE, ASSETS, "posts"),
    'post_ext' => "md",
    'page_ext' => "md"
}

def ask(message, valid_options)
  if valid_options
    answer = get_stdin("#{message}-->#{valid_options.to_s.gsub(/"/, '').gsub(/, /,'/')} ") while !valid_options.include?(answer)
  else
    answer = get_stdin(message)
  end
  answer
end

def get_stdin(message)
  print message
  STDIN.gets.chomp
end

def true?(obj)
  obj.to_s.downcase == "true"
end

IS_COMMENT_ENABLE = true
IS_DISPLAY_ENABLE = true
# Usage: rake post [title="${title}"] [date="YYYY-MM-DD"] [tags=[${tag1},${tag2}...]] [category="${category}"]
desc "Begin a new post in #{DIRS['posts']}"
task :post do
  abort("rake aborted: '#{DIRS['posts']}' directory not found.") unless FileTest.directory?(DIRS['posts'])
  title = ENV["title"] || "new-post"
  tags = ENV["tags"] || "[]"
  category = ENV["category"] || ""
  category = "\"#{category.gsub(/-/,' ')}\"" if !category.empty?
  # slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  slug = "post"
  begin
    date = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%Y-%m-%d')
  rescue => e
    puts "Error - date format must be YYYY-MM-DD, please check you typed it correctly!"
    exit -1
  end
  filename = File.join(DIRS['posts'], "#{date}-#{slug}.#{DIRS['post_ext']}")
  dirname_asset = File.join(DIRS['posts_asset'], "#{date}")
  if File.exist?(filename)
    abort("rake aborted!") unless ask("#{filename} already exists. Do you want to overwrite?", %w(y n)) == 'y'
  end

  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    # post.puts "layout: post"
    post.puts "title: \"#{title.strip}\""
    post.puts "tags: #{tags}"
    post.puts "category: \"#{category}\""
    # post.puts "display: #{IS_DISPLAY_ENABLE.to_s}"
    post.puts "comment: #{IS_COMMENT_ENABLE.to_s}"
    post.puts "---"
  end
  mkdir_p dirname_asset
end # task :post

IS_TITLE_DISPLAY = true
# Usage: rake page title="${pagename}"
desc "Create a new page folder with index page"
task :page do
  abort("rake aborted: the page title must be given.") unless ENV["title"] && !ENV["title"].empty?
  title = ENV["title"].strip
  dirname = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  filename = File.join(DIRS['pages'], [dirname, "index.#{DIRS['page_ext']}"])
  # title = File.basename(filename, File.extname(filename)).gsub(/[\W\_]/, " ").gsub(/\b\w/){$&.upcase}
  if File.exist?(filename)
    abort("rake aborted!") unless ask("#{filename} already exists. Do you want to overwrite?", %w(y n)) == 'y'
  end

  mkdir_p File.dirname(filename)
  puts "Creating new page folder: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: page"
    post.puts "title: \"#{title}\""
    post.puts "title_image: \"\""
    post.puts "title_display: #{IS_TITLE_DISPLAY.to_s}"
    post.puts "footer_quote: \"\\\"quote\\\"---person\""
    post.puts "permalink: \"/#{dirname}/\""
    post.puts "---"
  end
end # task :page

namespace :check do
  desc "Outputs any deprecation or configuration issues"
  task :doctor do
    system 'bundle exec jekyll doctor'
  end

  desc "Perform Ruby programming syntax check"
  task :syntax do
    system 'bundle exec rubocop -D -S'
  end
end

namespace :test do
  desc "Test the HTML output elements"
  task :html do
    begin
      system 'bundle exec jekyll build'
      HTMLProofer.check_directory(DIRS['site'], check_html: true).run
    rescue Exception => ex
      puts "#{ex.message}"
    end
  end

  desc "Test urls validity in data files"
  # Usage: rake urltest [format=[bool]]
  task :url do
    format = true?(ENV["format"] || false)
    args = []
    args << "-f" if format
    system ["./verify-data-urls.rb", args].join(' '), chdir: DIRS['scripts']
  end
end

desc "Reset bundle install(system-wide)"
task :reset do
  abort("rake aborted!") unless ask("Sure to reset bundle install(system-wide)?", %w(y n)) == 'y'
  system 'sudo bundle clean --force'
  system 'sudo bundle install'
end

desc "Lint the files format"
task :lint do
  system "./lint-src.sh", chdir: DIRS['scripts']
end

desc "Launch preview environment"
task :preview do
  system "bundle exec jekyll serve -w -l --port 4000"
end

desc "Reload the site info"
task :update do
  system "./get-pages-latest-date.rb", chdir: DIRS['scripts']
end

desc "Push the current code to the master branch"
task :cmpush => :update do
  abort("rake aborted!") unless ask("Sure to commit all the change to remote?", %w(y n)) == 'y'
  system "./git-commit-push.sh", chdir: DIRS['scripts']
end

desc "Push the current code to the master branch"
task :verpush => :update do
  abort("rake aborted!") unless ask("Sure to push the new version to remote?", %w(y n)) == 'y'
  system "./git-version-push.sh", chdir: DIRS['scripts']
end
