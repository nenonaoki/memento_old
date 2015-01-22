class CreateRoles < ActiveRecord::Migration
  def change
    create_table :roles do |t|
      t.references :user, index: true
      t.references :group, index: true
      t.references :title, index: true

      t.timestamps null: false
    end
    add_foreign_key :roles, :users
    add_foreign_key :roles, :groups
    add_foreign_key :roles, :titles
  end
end
