FactoryBot.define do
  factory :user do
    name { "MyString" }
    email { "MyString" }
    password_digest { "MyString" }
    sex { 1 }
    birthday { "2022-10-10" }
    image { "MyString" }
  end
end
