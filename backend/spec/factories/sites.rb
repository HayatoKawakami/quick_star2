FactoryBot.define do
  factory :site do
    site_name { 'amazon' }
    sequence(:url) {|n| "https://test-url#{n}" }
    association :item
  end
end
