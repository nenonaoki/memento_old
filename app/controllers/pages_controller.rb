class PagesController < ApplicationController
  def home
    if logged_in?
      @comment = current_user.comments.build
      @feed_items = current_user.feed
    end
  end

  def about
  end

  def terms
  end

  def privacy
  end
end
