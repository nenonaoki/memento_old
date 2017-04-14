# json.ignore_nil!
unless @errors.blank?
  json.errors do
    json.password @errors[:password]
  end
end
