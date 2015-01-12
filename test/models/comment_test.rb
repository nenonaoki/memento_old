require 'test_helper'

class CommentTest < ActiveSupport::TestCase
  # TODO: Need Unit Test for Comment model
  def setup
    @user = users(:michael)
    @medium = media(:one)
    @comment = @user.comments.build(body: "Lorem ipsum",
                                    user_id: @user.id,
                                    medium_id: @medium.id)
  end

  test "should be valid" do
    assert @comment.valid?
  end

  test "user id should be present" do
    @comment.user_id = nil
    assert_not @comment.valid?
  end

  test "medium id should be present" do
    @comment.medium_id = nil
    assert_not @comment.valid?
  end

  test "body should be present" do
    @comment.body = "   "
    assert_not @comment.valid?
  end

  test "content body be at most 100 characters" do
    @comment.body = "a" * 101
    assert_not @comment.valid?
  end

  test "order should be most recent first" do
    assert_equal Comment.first, comments(:most_recent)
  end

end
