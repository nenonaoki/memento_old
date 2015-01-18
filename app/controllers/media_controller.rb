class MediaController < ApplicationController
  before_action :admin_user, only: [:new, :create, :edit, :update, :destroy]

  def index
    @media = Medium.all
  end

  def show
    @medium = Medium.find(params[:id])
    @comments = @medium.comments.all

    if logged_in?
      @user = current_user 
      @comment = @user.comments.build
      @ticket = @medium.tickets.find_by(user_id: @user.id)
    
      if @ticket && @ticket.activated?
        render 'show' # Video playable
      elsif @ticket && @ticket.checked_in?
        render 'show_activate'
      else
        render 'show_checkin' # Video playable
      end
    else
      render 'show_signup'
    end
  end

  def new
    @medium = Medium.new
  end

  def create
    @medium = Medium.new(medium_params)
    if @medium.save
      @medium.update_tags(tag_params)
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
      @medium.update_tags(tag_params)
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

    def tag_params
      params[:tags].nil? ? [] : params.require(:tags)
    end

    # Confirm an admin user.
    def admin_user
      if !logged_in? || !current_user.admin?
        redirect_to(root_url)
      end
    end
end
