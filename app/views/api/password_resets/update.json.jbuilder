# json.ignore_nil!
unless @errors.blank?
  json.errors do
    json.password @errors[:password]
    json.passwordConfirmation @errors[:password_confirmation]
  end
end
