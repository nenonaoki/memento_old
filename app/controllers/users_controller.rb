class UsersController < ApplicationController
  before_action :logged_in_user, only: [:index, :edit, :update]
  # before_action :correct_user,   only: [:edit, :update]

  def show
    @user = User.find_by(name: params[:name])
    if @user.activated
      @json = JSON.parse(
        render_to_string(
          template: 'api/users/show.json.jbuilder',
            locals: { :@user => @user, :@status => 200 }
        )
      )
      respond_to do |format|
        format.html
      end
    else
      redirect_to root_url
    end
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      @user.send_activation_email
      flash[:info] = "Plesae check your email to achieve your account."
      redirect_to root_url # equivalent to redirect_to user_url(@user)
    else
      render 'new'
    end
  end

  private

    def user_params
     params.require(:user).permit(:name, :display_name, :email,
                                  :password, :password_confirmation,
                                  :avatar, :cover)
    end

    # Confirms the correct user.
    def correct_user
      @user = User.find_by(name: params[:name])
      redirect_to(root_url) unless current_user?(@user)
    end
end
