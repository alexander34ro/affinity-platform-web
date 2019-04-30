class PagesController < ApplicationController
  include PagesHelper
  before_action :load_components

  def home; end

  def search
    term = params[:component].downcase
    @components = @components.select { |c| c.to_s.downcase.include?(term) }
    render layout: false
  end

  def component
    term = params[:component]
    @component = @components.select { |c| !c.instance_of?(String) && c[:name] == term }.first
    render layout: false
  end

  private

  def load_components
    @components =
      [
        command_executor,
        sender,
        server,
        bluetooth_sender,
        bluetooth_server,
        'Heart Rate Extractor',
        'Accelerometer Extractor',
        'Android Wear Heart Rate Pass-through',
        'Android Route Display',
        'Affinity Emotion Analyzer',
        'Affinity Emotion Visualizer',
        'Affinity Route Planner',
        'Camera Extractor',
        'Camera Fuser',
        'Band Reader'
      ]

    # https://github.com/search?utf8=%E2%9C%93&q=affinity+filename%3Acomponent.js+path%3A%2F&type=Code
    creds = ENV['GITHUB_CREDS']
    github = Github.new basic_auth: creds
    components_from_github = github.search.code('name ins out filename:affinity_component.json path:/')
    @components += components_from_github.items.map { |i| { name: i.repository.name, description: i.repository.description, config_options: []} }
  end

  def command_executor
    {
      name: 'Command Executor',
      description: 'Execute a given system command',
      config_options: ['command']
    }
  end

  def sender
    {
      name: 'Sender',
      description: 'Send data over HTTP',
      config_options: ['url', 'port']
    }
  end

  def server
    {
      name: 'Server',
      description: 'Receive data over HTTP',
      config_options: ['port']
    }
  end

  def bluetooth_sender
    {
      name: 'Bluetooth Sender',
      description: 'Send data over bluetooth',
      config_options: ['device name', 'port']
    }
  end

  def bluetooth_server
    {
      name: 'Bluetooth Server',
      description: 'Receive data over bluetooth',
      config_options: ['port']
    }
  end
end
