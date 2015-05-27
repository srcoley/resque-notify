require 'resque'
require 'resque/server'
require File.expand_path(File.join('../','resque_notify_helper'), File.dirname(__FILE__))

# Extends Resque Web Based UI.
# Structure has been borrowed from ResqueScheduler and ResquePause.
module ResqueNotify
  module Server

    def self.public_path(filename)
      File.join(File.dirname(__FILE__), 'server', 'public', filename)
    end

    def self.included(base)

      base.class_eval do

        get /notify\/public\/([a-z]+\.[a-z]+)/ do
          send_file ResqueNotify::Server.public_path(params[:captures].first)
        end
      end

    end
  end
end

Resque.extend ResqueNotify
Resque::Server.class_eval do
  set :views, File.join(File.dirname(__FILE__), 'server', 'views')

  get "/failed.poll/?" do
    show_for_polling('failed')
  end

  include ResqueNotify::Server
end
