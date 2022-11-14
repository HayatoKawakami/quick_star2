class Item < ApplicationRecord
  belongs_to :user
  has_many :images, dependent: :destroy
  has_many :videos, dependent: :destroy
  validates :name, presence: true
  validates :price, presence: true
end
