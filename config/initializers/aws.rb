# Configure AWS credentials
# http://docs.aws.amazon.com/sdk-for-ruby/v2/developer-guide/setup-config.html
# Root credentials
Aws.config.update({
  credentials: Aws::Credentials.new(ENV['AWS_ACCESS_KEY_ID'], ENV['AWS_SECRET_ACCESS_KEY'])
})
