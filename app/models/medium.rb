class Medium < ActiveRecord::Base

  self.primary_key = :id

  before_create :create_id # Invoked when created

  # validates :id, presence: true#, length: { is: 16 }, uniqueness: true
  validates :title, presence: true
  validates :source, presence: true
  validates :description, length: { maximum: 255 }, allow_blank: true

  private

    # Creates Primary key with random string
    def create_id
      self.id = loop do
        temp_id = SecureRandom.urlsafe_base64(nil, false) # 16 charactors by default
        break temp_id unless self.class.exists?(id: temp_id)
      end
    end

end
