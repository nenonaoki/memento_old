json.payload do
  json.(@medium, :id, :token, :title, :description, :image, :video)
  json.tags @tags do |tag|
    json.(tag, :id, :slug, :label, :description)
  end
  json.checked_in @ticket.present? ? @ticket.checked_in : false
  json.activated @ticket.present? ? @ticket.activated : false
end
