class ChangeDataUrlToSites < ActiveRecord::Migration[6.1]
  def change
    change_column :sites, :url, :text
  end
end
