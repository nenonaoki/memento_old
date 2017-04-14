class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :medium

  default_scope -> { order(created_at: :desc) } # Proc or lambda
  scope :recent_after, -> last_id { where(Comment.arel_table[:id].gt last_id) }
  scope :past_before, -> first_id { where(Comment.arel_table[:id].lt first_id) }

  validates :user_id, presence: true
  validates :medium_id, presence: true
  validates :content, presence: true, length: { minimum: 1, maximum: 140 }
end
