require 'test_helper'

class SiteLayoutTest < ActionDispatch::IntegrationTest

  def setup
    @user = users(:michael)
  end

  test "layout links" do
    get root_path
    # assert_template '{something}'
    # assert_select {something}
    log_in_as(@user)
    # assert_template '{something}'
    # assert_select {something}
  end

end
