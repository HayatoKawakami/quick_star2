class AddColumnBirthdayAndImageAndSexToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :birthday, :date, null: false
    add_column :users, :image, :string
    add_column :users, :sex, :integer
    # Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
