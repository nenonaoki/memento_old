class Medium < ActiveRecord::Base
  # Association
  has_many :users, through: :tickets
  has_many :tickets, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :tags, through: :taggings
  has_many :taggings

  # self.primary_key = :id

  before_create :create_code # Invoked when created

  # validates :id, presence: true#, length: { is: 16 }, uniqueness: true
  validates :title, presence: true
  validates :source, presence: true
  validates :description, length: { maximum: 255 }, allow_blank: true

  # Add a tag on the medium.
  def tag(tag_instance)
    taggings.create(tag_id: tag_instance.id)
  end

  # Remove a tag from the medium.
  def untag(tag_instance)
    taggings.find_by(tag_id: tag_instance.id).destroy
  end

  # Returns true if the current medium has a given tag.
  def tag?(tag_instance)
    tags.include?(tag_instance)
  end

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
