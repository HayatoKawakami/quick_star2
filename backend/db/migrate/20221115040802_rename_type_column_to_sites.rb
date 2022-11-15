class RenameTypeColumnToSites < ActiveRecord::Migration[6.1]
  def change
    rename_column :sites, :type, :site_name
    # Ex:- rename_column("admin_users", "pasword","hashed_pasword")
  end
end
