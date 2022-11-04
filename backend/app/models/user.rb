class User < ApplicationRecord
  has_many :items

  has_secure_password
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
  validates :password, presence: true
  validates :sex, presence: true
  validates :birthday, presence: true
  # validates :image, presence: true

  # 画像アップロードの準備
  mount_uploader :image, ImageUploader
end
