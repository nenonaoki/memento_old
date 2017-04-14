# json.ignore_nil!
if @errors.blank?
  json.payload do
    json.(@user, :id, :name, :description, :email, :avatar, :cover)
    json.displayName @user.display_name
    # json.avatar do
    #   json.extract! @user.avatar, :url
    # end
    # json.cover do
    #   json.extract! @user.cover, :url
    # end
  end
else
  json.errors do
    json.general @errors[:general]
  end
end
