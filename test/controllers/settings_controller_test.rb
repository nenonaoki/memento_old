require 'test_helper'

class SettingsControllerTest < ActionController::TestCase
  test "should get show" do
    get :show
    assert_response :success
  end

  test "should get name" do
    get :name
    assert_response :success
  end

  test "should get email" do
    get :email
    assert_response :success
  end

  test "should get passowrd" do
    get :passowrd
    assert_response :success
  end

  test "should get avatar" do
    get :avatar
    assert_response :success
  end

  test "should get cover" do
    get :cover
    assert_response :success
  end

end
