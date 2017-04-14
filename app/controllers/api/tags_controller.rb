class Api::TagsController < Api::ApplicationController
  # include MediaHelper # app/helpers/media_helper.rb

  # def index
  #   @media = Medium.all
  # end

  def show
    @tag = Tag.find_by(slug: params[:slug])
    media = @tag.media
    @media = media.page(params[:p])
    @media_page = params[:p].present? ? params[:p].to_f : 1
    @media_per = Medium.paginates_per
    @media_count = media.count
  end
end
