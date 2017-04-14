class Api::CommentsController < Api::ApplicationController
  before_action :logged_in_user, only: [:create, :destroy]
  before_action :correct_user,   only: :destroy

  def index
    @medium = Medium.find_by(token: params[:medium_token])
    comments = @medium.comments
    @comments_count = comments.count

    if params[:first_id].present?
      @comments = comments.recent_after(params[:first_id])
    elsif params[:last_id].present?
      @comments = comments.past_before(params[:last_id]).take(10)
    else
      @comments = comments.take(10)
    end

  end

  def create
    @comment = current_user.comments.build(comment_params)
    unless @comment.save
      @status = 400
      render status: :bad_request
    end
  end

  def destroy
    @comment.destroy
  end

  private

    def comment_params
      params.require(:comment).permit(:content, :medium_id)
    end

    def correct_user
     @comment = current_user.comments.find_by(id: params[:id])
     render status: :bad_request if @comment.nil?
   end
end
