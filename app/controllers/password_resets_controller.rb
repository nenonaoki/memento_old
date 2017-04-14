class PasswordResetsController < ApplicationController
  before_action :get_user,   only: [:edit]
  before_action :valid_user, only: [:edit]
  before_action :check_expiration, only: [:edit]

  def new
  end

  def edit
  end

  private

    def user_params
      params.require(:user).permit(:password, :password_confirmation)
    end

    def get_user
      @user = User.find_by(email: params[:email])
    end

    # Confirms a valid user.
    def valid_user
      unless (@user && @user.activated? &&
              @user.authenticated?(:reset, params[:id]))
        redirect_to root_url
      end
    end

    # Checks expiration of reset token.
    def check_expiration
      if @user.password_reset_expired?
        flash[:warning] = "Password reset has expired."
        redirect_to new_password_reset_url
      end
    end
end
