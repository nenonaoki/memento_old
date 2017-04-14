# json.ignore_nil!
unless @errors.blank?
  json.errors do
    json.email @errors[:email]
  end
end
