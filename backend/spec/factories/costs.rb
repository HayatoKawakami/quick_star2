FactoryBot.define do
  factory :cost do
    sequence(:name) { |n| "固定費#{n}" }
    price { 1000 }
    association :user
  end
end
