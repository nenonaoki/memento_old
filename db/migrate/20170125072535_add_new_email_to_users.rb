class AddNewEmailToUsers < ActiveRecord::Migration
  def change
    add_column :users, :new_email, :string
    add_column :users, :new_email_digest, :string
    add_column :users, :new_email_sent_at, :datetime
  end
end
