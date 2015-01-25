class AddWebpayIdToUsers < ActiveRecord::Migration
  def change
    add_column :users, :webpay_id, :string
  end
end
