FactoryBot.define do
  factory :image do
    image { Rack::Test::UploadedFile.new(File.join(Rails.root, '/uploads/item/image/3/item.jpg')) }
    item
  end
end
