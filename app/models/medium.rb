class Medium < ActiveRecord::Base

  before_create :create_medium_id # Invoked when created

  validates :medium_id, presence: true, length: 11
  validates :title, presence: true
  validates :source, presence: true
  validates :description, length: { maximum: 255 }, allow_blank: true

  private

    # Creates and assigns the activation token and digest.
    def create_medium_id
      tmp_id = SecureRandom.urlsafe_base64(11)
      self.class.where(medium_id: tmp_id).blank? ? tmp_id : create_medium_id
    end

end
