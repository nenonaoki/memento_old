class AddActivatedToTicket < ActiveRecord::Migration
  def change
    add_column :tickets, :activated, :boolean, default: false
    add_column :tickets, :activated_at, :datetime
  end
end
