# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "version"

Gem::Specification.new do |s|
  s.name        = "resque-notify"
  s.version     = Resque::Plugins::Notify::VERSION
  s.platform    = Gem::Platform::RUBY
  s.authors     = ["Stephen Coley"]
  s.email       = ["stephen@coley.co"]
  s.homepage    = "https://github.com/srcoley/resque-notify"
  s.summary     = %q{A Resque plugin that sends desktop notifications when a job fails}
  s.description = %q{A Resque plugin that sends desktop notifications when a job fails}

  s.files         = ['lib/resque-notify.rb']
  s.require_paths = ["lib"]

  s.add_dependency('resque', '>= 1.9.10')
end
