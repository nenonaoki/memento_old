class CommentsController < ApplicationController
  before_action :logged_in_user, only: [:create, :destroy]
  before_action :correct_user,   only: :destroy

  def create
    comment = current_user.comments.build(comment_params)
    if comment.save
      flash[:info] = "Comment posted!"
    end
    redirect_to medium_path(params[:comment][:medium_id])
  end

  def destroy
    medium = @comment.medium
    @comment.destroy
    flash[:success] = "Comment deleted"
    redirect_to request.referrer || medium
  end

  private
    # Strong parameters that prevent mass assignment
    def comment_params
      params.require(:comment).permit(:body, :medium_id)
    end

    def correct_user
      @comment = current_user.comments.find(params[:id])
      redirect_to root_url if @comment.nil?
    end

end
