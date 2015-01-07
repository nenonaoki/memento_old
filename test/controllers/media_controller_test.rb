require 'test_helper'

class MediaControllerTest < ActionController::TestCase
  def setup
    @medium = media(:one)
  end

  test "should get show" do
    get :show, id: @medium
    assert_response :success
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @medium
    assert_response :success
  end

end
