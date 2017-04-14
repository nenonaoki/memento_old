class Api::UsersController < Api::ApplicationController
  before_action :logged_in_user, only: [:edit, :update]
  before_action :correct_user,   only: [:edit, :update]

  def show
    @user = User.find_by(name: params[:name])
    # redirect_to root_url and return unless @user.activated
  end

  def create
    @user = User.new(user_params)
    if @user.save
      @user.send_activation_email
    else
      # Create an error message.
      @errors = @user.errors.to_hash(false)
      render status: :unprocessable_entity
    end
  end

  def update
    @user = User.find_by(name: params[:name])
    if @user.update_attributes(user_params)
      # Handle a successful update.
      # flash[:success] = "Profile updated"
    else
      @errors = @user.errors.to_hash(false)
      render status: :unprocessable_entity
    end
  end

  def history
    @user = User.find_by(name: params[:name])
    media = @user.media
    @media_count = media.count

    if params[:first_id].present?
      @media = media.recent_after(params[:first_id])
    elsif params[:last_id].present?
      @media = media.past_before(params[:last_id]).take(4)
    else
      @media = media.take(4)
    end
  end

  private

    def user_params
     params.require(:user).permit(:name, :display_name,
                                  :description, :email,
                                  :password, :password_confirmation,
                                  :avatar, :cover)
    end

    # Confirms the correct user.
    def correct_user
      @user = User.find_by(name: params[:name])
      redirect_to(root_url) unless current_user?(@user)
    end
end
