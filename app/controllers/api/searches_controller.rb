class Api::SearchesController < Api::ApplicationController
  def index
    @tag_q = Tag.ransack(slug_or_label_cont: params[:q])
    @medium_q = Medium.ransack(title_or_description_or_tags_slug_or_tags_label_cont: params[:q])
    @tags = @tag_q.result(distinct: true)
    media = @medium_q.result(distinct: true).includes(:tags)
    @media = media.page(params[:p])
    @media_page = params[:p].present? ? params[:p].to_f : 1
    @media_per = Medium.paginates_per
    @media_count = media.count
  end
end
