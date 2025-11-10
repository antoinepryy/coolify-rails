class Api::HealthController < ApplicationController
  def show
    render json: {
      status: 'ok',
      timestamp: Time.current.iso8601,
      version: '1.0.0'
    }
  end
end