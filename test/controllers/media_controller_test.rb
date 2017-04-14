require 'test_helper'

class MediaControllerTest < ActionController::TestCase
  def setup
    @medium = media(:medium_0)
  end

  test "should get show" do
    get :show, token: @medium.token
    assert_response :success
  end

end
