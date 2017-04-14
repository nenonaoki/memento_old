class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :display_name
      t.string :email
      t.string :password_digest
      t.text :description, default: ''
      t.string :avatar
      t.string :cover

      t.timestamps null: false
    end
    add_index :users, :name, unique: true
    add_index :users, :email, unique: true
  end
end
