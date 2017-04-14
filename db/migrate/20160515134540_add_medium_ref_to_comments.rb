class AddMediumRefToComments < ActiveRecord::Migration
  def change
    add_reference :comments, :medium, index: true, foreign_key: true
  end
end
