class Api::UsersController < ApplicationController
  before_action :set_users

  def index
    render json: @users
  end

  def create
    user = {
      id: @users.length + 1,
      name: params[:name],
      email: params[:email],
      created_at: Time.current.iso8601
    }
    
    @users << user
    render json: user, status: :created
  end

  private

  def set_users
    @users = Rails.cache.fetch('users', expires_in: 1.hour) do
      [
        { id: 1, name: 'John Doe', email: 'john@example.com', created_at: Time.current.iso8601 },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', created_at: Time.current.iso8601 }
      ]
    end
  end
end