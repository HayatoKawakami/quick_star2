FactoryBot.define do
  factory :image do
    image { 'item.jpg' }
    association :item
  end
end
