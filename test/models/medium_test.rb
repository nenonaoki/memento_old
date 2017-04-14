require 'test_helper'

class MediumTest < ActiveSupport::TestCase
  def setup
    @medium = Medium.new(title: "Media Title", description: "text text text",
                         source: "path/to/media", duration: 100000)
  end

  test "should be valid" do
    assert @medium.valid?
  end

  test "title should be present" do
    @medium.title = "   "
    assert_not @medium.valid?
  end

  test "title should not be too long" do
    @medium.title = "a" * 51
    assert_not @medium.valid?
  end

  test "duration should be present" do
    @medium.duration = "   "
    assert_not @medium.valid?
  end

  test "duration should be interger" do
    @medium.duration = 100000.5
    assert_not @medium.valid?
  end

  test "to_param should not be id but token" do
    @medium.save
    assert_not_equal @medium.to_param, @medium.id
    assert_equal @medium.to_param, @medium.token
  end
end
