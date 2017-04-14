json.payload @media do |medium|
  json.(medium, :id, :token, :title, :description)
  json.image do
    json.url medium[:image].present? ? "/uploads/medium/#{medium[:token]}/image/#{medium[:image]}" : nil
  end
end
json.count @media_count
json.first_id @media.any? ? @media.first.id : nil
json.last_id @media.any? ? @media.last.id : nil
