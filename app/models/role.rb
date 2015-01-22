class Role < ActiveRecord::Base
  belongs_to :user
  belongs_to :group
  belongs_to :title

  validates :user_id,  presence: true
  validates :group_id, presence: true
  validates :title_id, presence: true
end
