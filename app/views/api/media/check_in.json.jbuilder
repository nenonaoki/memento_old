# json.ignore_nil!
if @errors.blank?
  json.payload do
    json.checked_in true
  end
else
  json.errors do
    json.serial @errors[:serial]
  end
end
