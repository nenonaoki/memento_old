class Api::PasswordResetsController < Api::ApplicationController
  before_action :get_user,   only: [:update]
  before_action :valid_user, only: [:update]
  before_action :check_expiration, only: [:update]

  def create
    @user = User.find_by(email: params[:user][:email].downcase)
    if @user
      @user.create_reset_digest
      @user.send_password_reset_email
    else
      @errors = {
        email: [
          I18n.t('activerecord.errors.models.user.attributes.email.notfound')
        ]
      }
      render status: :unprocessable_entity
    end
  end

  def update
    is_empty = user_params[:password].empty?

    if !is_empty && @user.update_attributes(user_params)
      log_in @user
      flash[:success] = "パスワードを設定しました。"
    else
      if is_empty then
        @errors = {
          password: [
            I18n.t('activerecord.errors.models.user.attributes.password.blank')
          ]
        }
      else
        @errors = @user.errors.to_hash(false)
      end
      render status: :unprocessable_entity
    end
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
        # redirect_to root_url
        render status: :bad_request
      end
    end

    # Checks expiration of reset token.
    def check_expiration
      if @user.password_reset_expired?
        # flash[:warning] = "Password reset has expired."
        # redirect_to new_password_reset_url
        render status: :bad_request
      end
    end
end
