now = Date.today
User.create!(
  name: '河上勇人',
  email: 'hayato.drsp@gmail.com',
  password: '0000',
  password_confirmation: '0000',
  sex: 1,
  birthday: Date.new(1990, 3, 22),
  image: File.open('./public/seed/kawakami.jpg'),
  income: 280_000
)

User.create!(
  name: 'なかやまきんにくん',
  email: 'sankakukin@gmail.com',
  password: '0000',
  password_confirmation: '0000',
  sex: 1,
  birthday: Date.new(1990, 1, 2),
  image: File.open('./public/seed/kinnikun.jpg'),
  income: 350_000
)

Item.create!(
  name: 'アーロンチェア',
  price: 88_000,
  user_id: 1
)

Image.create!(
  item_id: 1,
  image: File.open('./public/seed/chair.jpg')
)

Video.create!(
  item_id: 1,
  url: 'https://www.youtube.com/watch?v=wzIymhdZT2w'
)

Site.create!(
  item_id: 1,
  site_name: 'amazon',
  url: 'https://amzn.asia/d/6tPyZpD'
)

Item.create!(
  name: 'HHKBキーボード',
  price: 36_000,
  user_id: 1
)

Image.create!(
  item_id: 2,
  image: File.open('./public/seed/hhkb.jpeg')
)

Video.create!(
  item_id: 2,
  url: 'https://www.youtube.com/watch?v=kzX-jl7dzBw'
)

Site.create!(
  item_id: 2,
  site_name: 'amazon',
  url: 'https://item.rakuten.co.jp/pfudirect/pd-kb820bs/'
)

Site.create!(
  item_id: 2,
  site_name: 'rakuten',
  url: 'https://item.rakuten.co.jp/pfudirect/pd-kb820bs/'
)

Item.create!(
  name: 'メルセデスべンツSクラス',
  price: 12_000_000,
  user_id: 1
)

Image.create!(
  item_id: 3,
  image: File.open('./public/seed/mersedes.jpg')
)

Video.create!(
  item_id: 3,
  url: 'https://www.youtube.com/watch?v=hQ8_vBEwA78'
)

Site.create!(
  item_id: 3,
  site_name: 'amazon',
  url: 'https://amzn.asia/d/6tPyZpD'
)

Item.create!(
  name: 'MX master 3 for Mac',
  price: 12_000,
  user_id: 1
)

Image.create!(
  item_id: 4,
  image: File.open('./public/seed/mx-master.jpeg')
)

Video.create!(
  item_id: 4,
  url: 'https://www.youtube.com/watch?v=mgvL6ZVl4cs'
)

Site.create!(
  item_id: 4,
  site_name: 'amazon',
  url: 'https://amzn.asia/d/6tPyZpD'
)

Item.create!(
  name: 'MacBook Pro 2021 14インチ 516GB',
  price: 260_000,
  user_id: 1
)

Image.create!(
  item_id: 5,
  image: File.open('./public/seed/macbook-pro14.jpeg')
)

Video.create!(
  item_id: 5,
  url: 'https://www.youtube.com/watch?v=7i_spnFxGoo&t=480s'
)

Site.create!(
  item_id: 5,
  site_name: 'amazon',
  url: 'https://amzn.asia/d/6tPyZpD'
)

Item.create!(
  name: 'プロテインDXセット',
  price: 25_000,
  user_id: 2
)

Image.create!(
  item_id: 6,
  image: File.open('./public/seed/protein-dx.jpg')
)

Cost.create!(
  name: '家賃',
  price: 55_000,
  user_id: 1
)

Cost.create!(
  name: '食費',
  price: 45_000,
  user_id: 1
)

Cost.create!(
  name: '電気代',
  price: 8000,
  user_id: 1
)

Cost.create!(
  name: 'ガス代',
  price: 5000,
  user_id: 1
)

Cost.create!(
  name: '水道代',
  price: 3000,
  user_id: 1
)

Cost.create!(
  name: '携帯代',
  price: 8000,
  user_id: 1
)

Cost.create!(
  name: '交通費',
  price: 14_000,
  user_id: 1
)

Cost.create!(
  name: 'ネット代',
  price: 4000,
  user_id: 1
)
