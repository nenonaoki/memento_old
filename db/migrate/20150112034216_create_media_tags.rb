class CreateMediaTags < ActiveRecord::Migration
  def change
    create_table :media_tags do |t|
      t.references :medium, index: true
      t.references :tag, index: true
      # t.string :medium_id, index: true
      # t.string :tag_id, index: true
    end
    add_foreign_key :media_tags, :media
    add_foreign_key :media_tags, :tags
  end
end
