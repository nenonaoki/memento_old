class CreateTickets < ActiveRecord::Migration
  def change
    create_table :tickets do |t|
      t.string :serial_code, null: false
      t.references :user, index: true
      t.references :medium, index: true
      t.boolean :checked_in, default: false
      t.datetime :checked_in_at
      t.boolean :activated, default: false
      t.datetime :activated_at

      t.timestamps null: false
    end
    add_foreign_key :tickets, :users
    add_foreign_key :tickets, :media
  end
end
