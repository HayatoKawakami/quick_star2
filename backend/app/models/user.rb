class User < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true
  validates :sex, presence: true
  validates :birthday, presence: true
  validates :image, presence: true

  has_secure_password
  # 画像アップロードの準備
  mount_uploader :image, ImageUploader
end
