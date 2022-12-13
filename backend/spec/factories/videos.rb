FactoryBot.define do
  factory :video do
    sequence(:url) {|n| "https://test-url#{n}" }
    association :item
  end
end
