class User < ActiveRecord::Base
  attr_accessor :remember_token, :activation_token, :reset_token, :new_email_token

  has_secure_password
  has_many :tickets, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :media, through: :tickets

  mount_uploader :avatar, UserAvatarUploader
  mount_uploader :cover, UserCoverUploader

  before_save :downcase_email
  before_create :create_activation_digest
  before_destroy :delete_images

  VALID_NAME_REGEX = /\A[\w\d_]+\z/i
  validates :name, presence: true, length: { maximum: 15 },
            format: { with: VALID_NAME_REGEX },
            uniqueness: { case_sensitive: false }

  validates :display_name, presence: true, length: { maximum: 20 }

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
            format: { with: VALID_EMAIL_REGEX },
            uniqueness: { case_sensitive: false }

  validates :new_email, presence: false, length: { maximum: 255 },
            format: { with: VALID_EMAIL_REGEX },
            uniqueness: false, allow_blank: true

  # https://railsguides.jp/active_record_validations.html#allow-nil
  validates :password, presence: true, length: { minimum: 6 }, allow_nil: true # don't skip empty password

  # Override defalt param http://xoyip.hatenablog.com/entry/2014/05/20/200000
  def to_param
    return name
  end

  # Returns the hash digest of the given string.
  def self.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  # Returns a random token.
  def self.new_token
    SecureRandom.urlsafe_base64
  end

  # Remembers a user in the database for use in persistent sessions.
  def remember
    self.remember_token = User.new_token
    update_attribute(:remember_digest, User.digest(remember_token))
  end

  # Returns true if the given token matches the digest.
  def authenticated?(attribute, token)
    digest = self.send("#{attribute}_digest")
    return false if digest.nil?
    BCrypt::Password.new(digest).is_password?(token)
  end

  # Forgets a user.
  def forget
    update_attribute(:remember_digest, nil)
  end

  # Activates an account.
  def activate
    update_columns(activated: true, activated_at: Time.zone.now)
    # update_attribute(:activated,    true)
    # update_attribute(:activated_at, Time.zone.now)
  end

  # Sends activation email.
  def send_activation_email
    UserMailer.account_activation(self).deliver_now
  end

  # Sets the password reset attributes.
  def create_reset_digest
    self.reset_token = User.new_token
    update_columns(reset_digest:  User.digest(reset_token),
                   reset_sent_at: Time.zone.now)
    # update_attribute(:reset_digest,  User.digest(reset_token))
    # update_attribute(:reset_sent_at, Time.zone.now)
  end

  # Sends password reset email.
  def send_password_reset_email
    UserMailer.password_reset(self).deliver_now
  end

  # Returns true if a password reset has expired.
  def password_reset_expired?
    reset_sent_at < 2.hours.ago
  end

  # Sets the password reset attributes.
  def create_new_email_digest
    self.new_email_token = User.new_token
    update_columns(new_email_digest:  User.digest(new_email_token),
                   new_email_sent_at: Time.zone.now)
  end

  # Sends password reset email.
  def send_new_email_confirm_email
    UserMailer.new_email(self).deliver_now
  end

  # Returns true if a password reset has expired.
  def new_email_expired?
    new_email_sent_at < 2.hours.ago
  end

  # Defines a proto-feed.
  # See "Following users" for the full implementation.
  def feed
    Comment.where("user_id = ?", id)
  end

  private

    # Converts email to all lower-case.
    def downcase_email
      self.email.downcase!
      self.new_email.downcase! if self.new_email
    end

    # Creates and assigns the activation token and digest.
    def create_activation_digest
      self.activation_token = User.new_token
      self.activation_digest = User.digest(activation_token)
    end

    # Delete uploaded images for model
    def delete_images
      self.remove_avatar!
      self.remove_cover!
    end
end
