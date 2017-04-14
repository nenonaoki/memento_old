class Tag < ActiveRecord::Base
  has_many :medium_tags
  has_many :media, through: :medium_tags

  # Override defalt param http://xoyip.hatenablog.com/entry/2014/05/20/200000
  def to_param
    return slug
  end
end
