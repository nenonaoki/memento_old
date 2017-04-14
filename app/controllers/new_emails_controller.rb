class NewEmailsController < ApplicationController
  before_action :get_user,   only: [:edit]
  before_action :valid_user, only: [:edit]
  before_action :check_expiration, only: [:edit]

  def edit
    log_out if logged_in?
  end

  private

    def user_params
      params.require(:user).permit(:password, :password_confirmation)
    end

    def get_user
      @user = User.find_by(new_email: params[:email])
    end

    # Confirms a valid user.
    def valid_user
      unless (@user && @user.activated? &&
              @user.authenticated?(:new_email, params[:id]))
        redirect_to root_url
      end
    end

    # Checks expiration of reset token.
    def check_expiration
      if @user.new_email_expired?
        flash[:warning] = "New e-mail has expired."
        redirect_to root_url
      end
    end
end
