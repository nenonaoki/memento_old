class Medium < ActiveRecord::Base
  @@paginates_per = 5

  # http://qiita.com/ainame/items/eb9dcf7862630c44d5e9

  has_many :tickets, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :medium_tags
  has_many :tags, through: :medium_tags

  before_create :create_token

  default_scope -> { order(created_at: :desc) } # Proc or lambda
  scope :recent_after, -> last_id { where(Medium.arel_table[:id].gt last_id) }
  scope :past_before, -> first_id { where(Medium.arel_table[:id].lt first_id) }

  validates :title, presence: true, length: { maximum: 50 }
  # validates :duration, presence: true, numericality: { only_integer: true }

  paginates_per @@paginates_per

  # Returns a random token.
  def self.new_token
    tmp_token = SecureRandom.urlsafe_base64(6)
    self.find_by(token: tmp_token).blank? ? tmp_token : self.new_token
  end

  # Returns a paginates_per value.
  def self.paginates_per
    @@paginates_per
  end

  # Override defalt param http://xoyip.hatenablog.com/entry/2014/05/20/200000
  def to_param
    return token
  end

  private

    # Creates and assigns the activation token and digest.
    def create_token
      self.token = self.class.new_token
    end
end
