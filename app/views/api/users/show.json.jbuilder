json.payload do
  json.(@user, :id, :name, :description, :avatar, :cover)
  json.displayName @user.display_name
  # json.avatar do
  #   json.extract! @user.avatar, :url
  # end
  # json.cover do
  #   json.extract! @user.cover, :url
  # end
end
