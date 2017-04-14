class Ticket < ActiveRecord::Base
  belongs_to :medium
  belongs_to :user

  before_create :create_serial

  validates :medium_id, presence: true

  # Return a serial number.
  def self.new_serial
    letters = [('0'..'9'), ('A'..'Z')].map { |i| i.to_a }.flatten
    tmp_serial = (0...16).map { letters[rand(letters.length)] }.join
    self.find_by(serial: tmp_serial).blank? ? tmp_serial : self.new_serial
  end

  def check_in(user)
    if user
      update_columns(user_id: user.id,
                     checked_in:  true,
                     checked_in_at: Time.zone.now)
    else
      raise ArgumentError, "User has to be passed to the first argument"
    end
  end

  private
    def create_serial
      self.serial = self.class.new_serial
    end
end
