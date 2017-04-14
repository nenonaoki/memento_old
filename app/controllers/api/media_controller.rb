class Api::MediaController < Api::ApplicationController
  # include MediaHelper # app/helpers/media_helper.rb

  def show
    @medium = Medium.find_by(token: params[:token])
    @tags = @medium.tags
    @ticket = current_user.present? ? @medium.tickets.find_by(user_id: current_user.id) : nil
  end

  def check_in
    @medium = Medium.find_by(token: params[:token])
    @ticket = @medium.tickets.find_by(serial: params[:serial])

    if @ticket && !@ticket.checked_in
      @ticket.check_in(current_user)
    else
      # Create an error message.
      @errors = {
        serial: [
          I18n.t('activerecord.errors.models.ticket.attributes.serial.invalid')
        ]
      }
      render status: :unprocessable_entity
    end
  end

  def viewer
    @medium = Medium.find_by(token: params[:token])

    start_time = (Time.now - 60).to_i
    expire_time = 3.hours.from_now.to_i

    policy = {
      Statement: [
        Resource: "https://dclnjqym1jz5j.cloudfront.net/sample/*",
        Condition: {
          DateLessThan: { "AWS:EpochTime" => expire_time },
          DateGreaterThan: { "AWS:EpochTime" => start_time }
        }
      ]
    }

    # Cookie can't be set on cloudfront.net because it's Publuc Suffix https://publicsuffix.org/
    signer = Aws::CloudFront::CookieSigner.new(
      key_pair_id: ENV['AWS_CLOUDFRONT_KEY_PAIR_ID'],
      private_key_path: ENV['AWS_CLOUDFRONT_PRIVATE_KEY_PATH'] # cf_private_key.pem
    )
    signer.signed_cookie('https://dclnjqym1jz5j.cloudfront.net/sample/*',
      policy: policy.to_json
    ).each do |key, value|
      cookies[key] = {
        value: value,
        domain: 'dclnjqym1jz5j.cloudfront.net',
        path: '/',
        secure: false
      }
    end
  end
end
