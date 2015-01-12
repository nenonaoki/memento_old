class Tag < ActiveRecord::Base
  # Association
  has_and_belongs_to_many :media

  # self.primary_key = :id

  # validates :slug, presence: true
  validates :label, presence: true
  validates :description, length: { maximum: 255 }, allow_blank: true

end
