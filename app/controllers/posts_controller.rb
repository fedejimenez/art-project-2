class PostsController < ApplicationController
  # before_action :authenticate_user

  # GET /posts
  def index
    binding.pry
    @posts = Post.paginate(page: params[:page]).order(id: :desc)

    render json: {
      posts: @posts,
      page: @posts.current_page,
      pages: @posts.total_pages
    }
  end

  # GET /posts/1
  def show
    @post = Post.find(params[:id])
    render json: @post
  end

  # POST /posts
  def create
    @post = Post.new(post_params)

    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post = Post.find(params[:id])
    if current_user&.admin?
      @post.destroy
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :content, :src, :page)
  end
end
