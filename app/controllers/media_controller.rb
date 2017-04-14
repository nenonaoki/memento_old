class MediaController < ApplicationController
  # include MediaHelper # app/helpers/media_helper.rb

  def show
    @medium = Medium.find_by(token: params[:token])
    @tags = @medium.tags
    @comments = @medium.comments

    @json = JSON.parse(
      render_to_string(
        template: 'api/media/show.json.jbuilder',
          locals: { :@medium => @medium, :@status => 200 }
      )
    )
    respond_to do |format|
      format.html
    end
  end
end
