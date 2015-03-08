class Medium < ActiveRecord::Base
  # Carrierwave
  mount_uploader :poster, PosterUploader

  # Association
  belongs_to :currency
  has_many :users, through: :tickets
  has_many :tickets, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :tags, through: :taggings
  has_many :taggings, dependent: :destroy

  accepts_nested_attributes_for :tickets, :taggings

  # self.primary_key = :id

  before_create :create_code # Invoked when created

  # validates :id, presence: true#, length: { is: 16 }, uniqueness: true
  validates :title, presence: true
  validates :source, presence: true
  validates :description, length: { maximum: 255 }, allow_blank: true
  validates :price, presence: true
  validates :currency_id, presence: true

  # Add a tag on the medium.
  def source_with_token()
    # require 'digest'
    # http://www.wowza.com/forums/content.php?620-How-to-protect-streaming-using-SecureToken-in-Wowza-Streaming-Engine
    hash = Digest::SHA256.base64digest("Test/mp4:sample.mp4?#{Settings.secrets.wowza}").tr("+/", "-_") # SHA256 url_safe base64 encoding
    "http://10.0.1.7:1935/Test/mp4:sample.mp4/manifest.mpd?wowzatokenhash=#{hash}"
  end

  # Add a tag on the medium.
  def tag(tag_instance)
    taggings.create(tag_id: tag_instance.id)
  end

  # Remove a tag from the medium.
  def untag(tag_instance)
    taggings.find_by(tag_id: tag_instance.id).destroy
  end

  # Return true if the current medium has a given tag.
  def tag?(tag_instance)
    tags.include?(tag_instance)
  end

  # Update taggings based on tag ids in a list.
  def update_tags(tag_ids)
    tags.each do |tag_instance|
      untag(tag_instance)
    end

    tags.reload

    tag_ids.each do |tag_id|
      tag_instance = Tag.find(tag_id)
      tag(tag_instance) unless tag?(tag_instance)
    end
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
