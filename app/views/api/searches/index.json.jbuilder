json.tags do
  json.payload @tags do |tag|
    json.(tag, :id, :slug, :label, :description)
  end
end
json.media do
  json.payload @media do |medium|
    json.(medium, :id, :token, :title, :video)
    json.description truncate(medium[:description], length: 100)
    json.image do
      json.url medium[:image].present? ? "/uploads/medium/#{medium[:token]}/image/#{medium[:image]}" : nil
    end
  end
  json.page @media_page
  json.per @media_per
  json.count @media_count
end
