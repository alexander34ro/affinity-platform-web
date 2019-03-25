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
        'Android Wear Accelerometer Extractor',
        'Android Wear Heart Rate Pass-through',
        'Affinity Emotion Analyzer',
        'Affinity Emotion Visualizer',
        'Camera Extractor',
        'Camera Fuser',
        'Band Reader'
      ]
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
