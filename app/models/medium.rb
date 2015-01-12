class Medium < ActiveRecord::Base
  # Association
  has_many :comments, dependent: :destroy
  has_many :users, through: :comments
  has_and_belongs_to_many :tags

  # self.primary_key = :id

  before_create :create_code # Invoked when created

  # validates :id, presence: true#, length: { is: 16 }, uniqueness: true
  validates :title, presence: true
  validates :source, presence: true
  validates :description, length: { maximum: 255 }, allow_blank: true

  # Returns a random code. (Class method)
  def self.new_code
    loop do
      temp_code = SecureRandom.urlsafe_base64(nil, false) # 16 charactors by default
      break temp_code unless self.exists?(code: temp_code)
    end
  end

  private

    # Creates Primary key with random string
    def create_code
      self.code = Medium.new_code
    end

end
