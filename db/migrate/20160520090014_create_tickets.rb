class CreateTickets < ActiveRecord::Migration
  def change
    create_table :tickets do |t|
      t.string :serial
      t.references :medium, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true
      t.boolean :checked_in, default: false
      t.datetime :checked_in_at

      t.timestamps null: false
    end
  end
end
