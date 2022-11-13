class CreateVideos < ActiveRecord::Migration[6.1]
  def change
    create_table :videos do |t|
      t.string :url, null: false
      t.references :item, null: false, foreign_key: true

      t.timestamps
    end
  end
end
