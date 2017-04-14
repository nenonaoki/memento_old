class AccountsController < ApplicationController
  def show
    @user = current_user
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

  def update
    @user = current_user
    if @user.update_attributes(user_params)
      # Handle a successful update.
      flash[:success] = "Profile updated"
      redirect_to @user
    else
      render 'edit'
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
