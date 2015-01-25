class CreateMedia < ActiveRecord::Migration
  def change
    # create_table :media, id: false do |t|
    #   t.string :id, null: false
    #   t.string :title
    #   t.string :source
    #   t.text :description

    #   t.timestamps null: false
    # end
    create_table :media do |t|
      t.string :code, null: false
      t.string :title
      t.string :source
      t.text :description
      t.integer :price
      t.references :currency

      t.timestamps null: false
    end
    add_index :media, :code, unique: true
  end
end
