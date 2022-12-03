class AddColumnStartToItems < ActiveRecord::Migration[6.1]
  def change
    add_column :items, :start, :boolean, default: false
  end
end
