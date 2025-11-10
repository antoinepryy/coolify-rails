class Api::PostsController < ApplicationController
  before_action :set_posts

  def index
    render json: @posts
  end

  def create
    post = {
      id: @posts.length + 1,
      title: params[:title],
      content: params[:content],
      user_id: params[:user_id]&.to_i,
      created_at: Time.current.iso8601
    }
    
    @posts << post
    render json: post, status: :created
  end

  private

  def set_posts
    @posts = Rails.cache.fetch('posts', expires_in: 1.hour) do
      [
        { 
          id: 1, 
          title: 'First Post', 
          content: 'This is the content of the first post',
          user_id: 1,
          created_at: Time.current.iso8601
        },
        { 
          id: 2, 
          title: 'Second Post', 
          content: 'This is the content of the second post',
          user_id: 2,
          created_at: Time.current.iso8601
        }
      ]
    end
  end
end