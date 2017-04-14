require 'test_helper'

class CommentsInterfaceTest < ActionDispatch::IntegrationTest

  def setup
    @user = users(:michael)
    @medium = media(:medium_0)
  end

  test "comment interface" do
    # Check medium has comments
    assert_not_equal 0, @medium.comments.count

    log_in_as(@user)
    get root_path
    # assert_select 'div.pagination'
    # Invalid submission
    assert_no_difference 'Comment.count' do
      post comments_path, comment: { content: "", medium_id: @medium.id }
    end
    # assert_select 'div#error_explanation'
    # Valid submission
    content = "This comment really ties the room together"
    assert_difference 'Comment.count', 1 do
      post comments_path, comment: { content: content, medium_id: @medium.id }
    end
    assert_redirected_to root_url
    follow_redirect!
    assert_match content, response.body
    # Delete a post.
    assert_select 'a', text: 'delete'
    first_comment = @user.comments.first
    assert_difference 'Comment.count', -1 do
      delete comment_path(first_comment)
    end
    # Visit a different user.
    get user_path(users(:archer))
    assert_select 'a', text: 'delete', count: 0
  end

end
