require 'resque'
require 'resque/server'

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
  set :views, [settings.views, File.join(File.dirname(__FILE__), 'server', 'views')]

  helpers do
    def find_template(views, name, engine, &block)
      views.each { |v| super(v, name, engine, &block) }
    end
  end


  def show(page, layout = :'notify-layout')
    response["Cache-Control"] = "max-age=0, private, must-revalidate"
    begin
      erb page.to_sym, {:layout => layout}, :resque => Resque
    rescue Errno::ECONNREFUSED
      erb :error, {:layout => false}, :error => "Can't connect to Redis! (#{Resque.redis_id})"
    end
  end

  get "/failed.poll/?" do
    show_for_polling('failed')
  end

  include ResqueNotify::Server
end
