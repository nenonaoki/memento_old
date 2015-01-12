class Comment < ActiveRecord::Base
  # Association
  belongs_to :user
  belongs_to :medium

  default_scope -> { order(created_at: :desc) }

  validates :user_id, presence: true
  validates :medium_id, presence: true
  validates :body, length: { maximum: 100 }, presence: true

end
