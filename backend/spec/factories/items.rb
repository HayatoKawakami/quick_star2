FactoryBot.define do
  factory :item do
    sequence(:name) { |n| "テストの木刀#{n}" }
    price { 100 }
    association :user
  end
end
