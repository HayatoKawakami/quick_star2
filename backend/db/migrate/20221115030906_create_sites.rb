class CreateSites < ActiveRecord::Migration[6.1]
  def change
    create_table :sites do |t|
      t.string :type, null: false
      t.string :url, null: false
      t.references :item, null: false, foreign_key: true

      t.timestamps
    end
  end
end
