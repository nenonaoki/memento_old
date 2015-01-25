require 'test_helper'

class CartsControllerTest < ActionController::TestCase
  test "should get order" do
    get :order
    assert_response :success
  end

  test "should get confirm" do
    get :confirm
    assert_response :success
  end

  test "should get complete" do
    get :complete
    assert_response :success
  end

end
