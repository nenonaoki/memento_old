class Tag < ActiveRecord::Base
  # Association
  has_many :media, through: :taggings
  has_many :taggings

  # self.primary_key = :id

  validates :slug, presence: true, uniqueness: true
  validates :label, presence: true, uniqueness: true
  validates :description, length: { maximum: 255 }, allow_blank: true

end
