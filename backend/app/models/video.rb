class Video < ApplicationRecord
  belongs_to :item, optional: true

  validates :url, presence: true
  validates :item_id, presence: true
end
