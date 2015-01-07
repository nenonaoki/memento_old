class TagsController < ApplicationController
  before_action :admin_user, only: [:new, :create, :edit, :update, :destroy]

  def index
    @tags = Tag.all
  end

  def show
    @tag = Tag.find(params[:id])
  end

  def new
    @tag = Tag.new
  end

  def create
    @tag = Tag.new(tag_params)
    if @tag.save
      flash[:info] = "New tag created"
      redirect_to @tag
    else
      render 'new'
    end
  end

  def edit
    @tag = Tag.find(params[:id])
  end

  def update
    @tag = Tag.find(params[:id])
    if @tag.update_attributes(tag_params)
      flash[:success] = "Tag updated"
      redirect_to @tag
    else
      render 'edit'
    end
  end

  # Destroy (destroy)
  def destroy
    Tag.find(params[:id]).destroy
    flash[:success] = "Tag deleted"
    redirect_to tags_url
  end

  private
    # Strong parameters that prevent mass assignment
    def tag_params
      params.require(:tag).permit(:id, :label, :description)
    end

    # Confirm an admin user.
    def admin_user
      if !logged_in? || !current_user.admin?
        redirect_to(root_url)
      end
    end
end
