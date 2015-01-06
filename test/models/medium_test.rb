require 'test_helper'

class MediumTest < ActiveSupport::TestCase

  def setup
    @medium = Medium.new(title: "Example Video",
                         source: "http://example.com/path/to/medium.file",
                         description: "Lorem ipsum dolor sit amet")
  end

  test "should be valid" do
    assert @medium.valid?
  end

  test "title should be present" do
    @medium.title = ""
    assert_not @medium.valid?
  end

  test "source should be present" do
    @medium.source = ""
    assert_not @medium.valid?
  end

  test "description should be at most 255 charactors" do
    @medium.description = ""
    assert @medium.valid?
    @medium.description = "a" * 256
    assert_not @medium.valid?
  end

end
