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

  private
    def create_serial_code
        self.serial_code = Ticket.new_serial_code
    end
end
