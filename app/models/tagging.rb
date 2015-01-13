class Tagging < ActiveRecord::Base
  # Association
  belongs_to :tag
  belongs_to :medium

  validates :tag_id, presence: true
  validates :medium_id, presence: true
end
