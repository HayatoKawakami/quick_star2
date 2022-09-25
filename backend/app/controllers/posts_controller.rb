class PostsController < ApplicationController
  before_action :set_post, only: %i[show update destroy]

  def index
    posts = Post.all.order(created_at: :desc)
    render json: posts
  end

  def show
    render json: @post
  end

  def create
    post = Post.new(post_params)
    if post.save
      render json: post
    else
      render json: post.errors
    end
  end

  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors
    end
  end

  def destroy
    if @post.destroy
      render json: @post
    else
      render json: @post.errors
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :content)
  end

  def set_post
    @post = Post.find(params[:id])
  end
end
