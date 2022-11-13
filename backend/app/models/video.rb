class Video < ApplicationRecord
  belongs_to :item

  validates :url, presence: true
  validates :item_id, presence: true
end
