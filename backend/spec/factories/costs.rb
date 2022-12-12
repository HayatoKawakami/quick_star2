FactoryBot.define do
  factory :cost do
    name { '家賃' }
    price { 55_000 }
    association :user
  end
end
