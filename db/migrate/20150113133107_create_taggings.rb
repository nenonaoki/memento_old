class CreateTaggings < ActiveRecord::Migration
  def change
    create_table :taggings do |t|
      t.references :medium, index: true
      t.references :tag, index: true

      t.timestamps null: false
    end
    add_foreign_key :taggings, :media
    add_foreign_key :taggings, :tags
    add_index :taggings, [:medium_id, :tag_id], unique: true
  end
end
