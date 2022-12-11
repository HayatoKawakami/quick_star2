FactoryBot.define do
  factory :user do
    sequence(:name) { |n| "テストくん#{n}号" }
    sequence(:email) { |n| "test#{n}@gmail.com" }
    password { '0000' }
    password_confirmation { '0000' }
    sex { 1 }
    birthday { '1990-03-22' }
    image { 'icom.jpg' }
    income { 200_000 }
  end
end
