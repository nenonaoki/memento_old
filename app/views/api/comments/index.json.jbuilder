json.payload @comments do |comment|
  json.extract! comment, :id, :content
  json.createdAt time_ago_in_words(comment.created_at)
  json.user do
    json.(comment.user, :name)
    json.displayName comment.user.display_name
    json.avatar do
      json.extract! comment.user.avatar, :url
    end
    json.cover do
      json.extract! comment.user.cover, :url
    end
  end
end
json.count @comments_count
json.firstId @comments.first.id
json.lastId @comments.last.id
