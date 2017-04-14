class Api::NewEmailsController < Api::ApplicationController
  before_action :get_user,   only: [:update]
  before_action :valid_user, only: [:update]
  before_action :check_expiration, only: [:update]

  def create
    @user = current_user
    is_empty = params[:user][:email].empty?
    is_taken = User.exists?(email: params[:user][:email])

    if !is_empty && !is_taken && @user.update_attributes(new_email: params[:user][:email])
      @user.create_new_email_digest
      @user.send_new_email_confirm_email
    else
      if is_empty then
        @errors = {
          new_email: [
            I18n.t('activerecord.errors.models.user.attributes.new_email.blank')
          ]
        }
      elsif is_taken then
        @errors = {
          new_email: [
            I18n.t('activerecord.errors.models.user.attributes.new_email.taken')
          ]
        }
      else
        @errors = @user.errors.to_hash(false)
      end
      render status: :unprocessable_entity
    end
  end

  def update
    if @user && @user.authenticate(params[:user][:password])
      @user.update_attribute(:email, @user.new_email)
      log_in @user
      flash[:success] = "メールアドレスを変更しました。"
    else
      @errors = {
        password: [
          'パスワードが正しくありません。'
        ]
      }
      # @errors = @user.errors.to_hash(false)
      render status: :unprocessable_entity
    end
  end

  private

    def get_user
      @user = User.find_by(new_email: params[:email])
    end

    # Confirms a valid user.
    def valid_user
      unless (@user && @user.activated? &&
              @user.authenticated?(:new_email, params[:id]))
        render status: :bad_request
      end
    end

    # Checks expiration of reset token.
    def check_expiration
      if @user.new_email_expired?
        # flash[:warning] = "Password reset has expired."
        # redirect_to new_password_reset_url
        render status: :bad_request
      end
    end
end
