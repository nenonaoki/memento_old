# json.ignore_nil!
unless @errors.blank?
  json.errors do
    json.email @errors[:new_email]
  end
end
