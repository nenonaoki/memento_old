class AddPosterToMedia < ActiveRecord::Migration
  def change
    add_column :media, :poster, :string
  end
end
