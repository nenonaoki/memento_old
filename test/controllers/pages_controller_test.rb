require 'test_helper'

class PagesControllerTest < ActionController::TestCase

  def setup
    # @base_title = "Memento"
  end

  test "should get home" do
    get :home
    assert_response :success
    assert_select "title", full_title("")
  end

  test "should get about" do
    get :about
    assert_response :success
    assert_select "title", full_title("About")
  end

  test "should get terms" do
    get :terms
    assert_response :success
    assert_select "title", full_title("Terms of Use")
  end

  test "should get privacy" do
    get :privacy
    assert_response :success
    assert_select "title", full_title("Privacy Policy")
  end

end
