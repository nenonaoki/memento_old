class MediaController < ApplicationController
  before_action :admin_user, only: [:new, :create, :edit, :update, :destroy]

  def index
    @media = Medium.all
  end

  def show
    @medium = Medium.find(params[:id])
  end

  def new
    @medium = Medium.new
  end

  def create
    @medium = Medium.new(medium_params)
    if @medium.save
      flash[:info] = "New medium created"
      redirect_to @medium
    else
      render 'new'
    end
  end

  def edit
    @medium = Medium.find(params[:id])
  end

  def update
    @medium = Medium.find(params[:id])
    if @medium.update_attributes(medium_params)
      flash[:success] = "Medium updated"
      redirect_to @medium
    else
      render 'edit'
    end
  end

  # Destroy (destroy)
  def destroy
    Medium.find(params[:id]).destroy
    flash[:success] = "Medium deleted"
    redirect_to media_url
  end

  private
    # Strong parameters that prevent mass assignment
    def medium_params
      params.require(:medium).permit(:title, :source, :description)
    end

    # Confirm an admin user.
    def admin_user
      if !logged_in? || !current_user.admin?
        redirect_to(root_url)
      end
    end
end
