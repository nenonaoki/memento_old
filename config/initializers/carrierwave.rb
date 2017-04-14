# if Rails.env.test? or Rails.env.cucumber?
#   CarrierWave.configure do |config|
#     config.storage = :file
#     config.enable_processing = false
# end

CarrierWave.configure do |config|
  config.fog_provider = 'fog/aws'
  config.fog_credentials = {
    provider: 'AWS',
    aws_access_key_id: ENV['AWS_S3USER_ACCESS_KEY_ID'],
    aws_secret_access_key: ENV['AWS_S3USER_SECRET_ACCESS_KEY'],
    region: 'ap-northeast-1'
  }

  config.cache_storage = :fog

  case Rails.env
    when 'production'
      config.fog_directory = 'www.memento.com'
      config.asset_host = 'https://s3-ap-northeast-1.amazonaws.com/www.memento.com' #Specify root
    when 'development'
      config.fog_directory = 'dev.memento.com'
      config.asset_host = 'https://s3-ap-northeast-1.amazonaws.com/dev.memento.com'
    when 'test'
      config.fog_directory = 'test.memento.com'
      config.asset_host = 'https://s3-ap-northeast-1.amazonaws.com/test.memento.com'
  end
end

# Japanese filename
CarrierWave::SanitizedFile.sanitize_regexp = /[^[:word:]\.\-\+]/
