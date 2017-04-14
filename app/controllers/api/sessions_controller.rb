class Api::SessionsController < Api::ApplicationController
  def create
    @user = User.find_by(email: params[:session][:email].downcase)
    if @user && @user.authenticate(params[:session][:password])
      if @user.activated?
        log_in @user
        params[:session][:remember_me] == '1' ? remember(@user) : forget(@user)
        # redirect_back_or @user # equivalent to redirect_to user_url(@user)
      else
        # message  = "Account not activated. "
        # message += "Check your email for the activation link."
        # flash[:warning] = message
        # redirect_to root_url
        render status: :unauthorized
      end
    else
      # Create an error message.
      @user = User.new(
        email: params[:session][:email].downcase,
        password: params[:session][:password]
      )
      @user.valid? # necessary to validate inputs
      @errors = @user.errors.to_hash(false)
      @errors.merge!({
          general: [
            I18n.t('activerecord.errors.models.user.attributes.general.invalid')
          ]
        })
      render status: :unprocessable_entity
    end
  end

  def destroy
    log_out if logged_in?
    # redirect_to root_url
  end
end
