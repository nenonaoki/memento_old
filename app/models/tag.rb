class Tag < ActiveRecord::Base

  self.primary_key = :id

  validates :id, presence: true
  validates :label, presence: true
  validates :description, length: { maximum: 255 }, allow_blank: true

end
