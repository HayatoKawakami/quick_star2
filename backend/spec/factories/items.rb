FactoryBot.define do
  factory :item do
    name { 'テストの木刀' }
    price { 100 }
    user
  end
end
