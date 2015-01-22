class Group < ActiveRecord::Base
  has_many :users, through: :roles
  has_many :roles, dependent: :destroy

  validates :name, presence: true,
                   length: { maximum: 50 }
end
