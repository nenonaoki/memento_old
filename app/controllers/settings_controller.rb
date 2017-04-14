class SettingsController < ApplicationController
  before_action :get_user

  def show
  end

  def display_name
  end

  def description
  end

  def email
  end

  def password
  end

  def avatar
  end

  def cover
  end

  private
    # Confirms the correct user.
    def get_user
      @user = current_user
    end
end
