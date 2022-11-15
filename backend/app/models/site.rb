class Site < ApplicationRecord
  belongs_to :item

  validates :site_name, presence: true
  validates :url, presence: true
  validates :item_id, presence: true
end
