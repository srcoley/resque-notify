# -*- encoding: utf-8 -*-
$:.push File.expand_path("../lib", __FILE__)
require "version"

Gem::Specification.new do |s|
  s.name        = "resque-notify"
  s.version     = Resque::Plugins::Notify::VERSION
  s.platform    = Gem::Platform::RUBY
  s.authors     = ["Stephen Coley"]
  s.email       = ["stephen@coley.co"]
  s.homepage    = ""
  s.summary     = %q{}
  s.description = %q{}

  s.files         = `git ls-files`.split("\n")
  s.test_files    = `git ls-files -- {test,spec,features}/*`.split("\n")
  s.executables   = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
  s.require_paths = ["lib"]
  s.has_rdoc      = false

  s.add_dependency('resque', '>= 1.9.10')
  s.add_dependency('multi_json', '~> 1.0')

  s.add_development_dependency('rspec', '>= 2.3.0')
  s.add_development_dependency('rack-test')
  s.add_development_dependency('simplecov', '>= 0.4.2')

end
