class Ticket < ActiveRecord::Base
  # Association
  belongs_to :user
  belongs_to :medium

  before_create :create_serial_code

  # Returns a random token. (Class method)
  def self.new_serial_code
    loop do
      temp_code = Array.new(16){ rand(10) }.join.to_s # 16 charactors by default
      break temp_code unless self.exists?(serial_code: temp_code)
    end
  end

  # Check in a ticket.
  def checkin(user_id)
    update_columns(user_id: user_id,
                   checked_in: true,
                   checked_in_at: Time.zone.now)
  end

  # Activate a ticket.
  def activate
    update_columns(activated: true,
                   activated_at: Time.zone.now)
  end

  private
    def create_serial_code
        self.serial_code = Ticket.new_serial_code
    end
end
