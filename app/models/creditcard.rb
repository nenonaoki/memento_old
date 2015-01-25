class Creditcard
  include ActiveModel::Model
  attr_accessor :name, :number, :exp_month, :exp_year, :cvc
 
  validates :name, presence: true
  validates :number, presence: true
  validates :exp_month, presence: true, length: { is: 2 }
  validates :exp_year, presence: true, length: { is: 4 }
  validates :cvc, presence: true, length: { in: 3..4 }

  # def initialize(attributes={})
  #   super
  #   @omg ||= true
  # end
end
