class TagsController < ApplicationController
  def show
    @tag = Tag.find_by(slug: params[:slug])
    media = @tag.media
    @media = media.page(params[:p])
    @media_page = params[:p] || 1
    @media_per = Medium.paginates_per
    @media_count = media.count

    @json = JSON.parse(
      render_to_string(
        template: 'api/tags/show.json.jbuilder',
          locals: {
            :@tag => @tag,
            :@media => @media,
            :@media_page => @media_page,
            :@media_per => @media_per,
            :@media_count => @media_count,
            :@status => 200
          }
      )
    )
    respond_to do |format|
      format.html
    end
  end
end
