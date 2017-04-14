require 'test_helper'

class TicketTest < ActiveSupport::TestCase
  def setup
    @user = users(:michael)
    @medium = media(:medium_0)
    @ticket = @medium.tickets.build
  end

  test "should be valid" do
    assert @ticket.valid?
  end

  test "user_id can be nil" do
    @ticket.user_id = nil
    assert @ticket.valid?
    @ticket.user_id = @user.id
    assert @ticket.valid?
  end

  test "new serial should complies its format" do
    @ticket.save
    assert_equal @ticket.serial.length, 16
    assert_match /\A[0-9A-Z]{16}\z/i, @ticket.serial
  end
end
