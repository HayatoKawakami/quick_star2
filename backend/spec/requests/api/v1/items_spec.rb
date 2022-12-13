require 'rails_helper'

describe 'ItemAPI' do
  before do
    @user = create(:user)
    @item = create(:item, user_id: @user.id)
  end
  describe 'GET /items' do
    before do
      create_list(:item, 4, user_id: @user.id)
      get '/api/v1/items'
    end
    it '全アイテム一覧情報を正常に取得できる' do
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['items'].length).to eq 5
    end
  end

  describe 'GET /items/:id' do
    before do
      get "/api/v1/items/#{@item.id}"
    end
    it 'アイテム情報を個別に取得できる' do
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['item']['name']).to eq(@item.name)
    end
  end

  describe 'POST /items' do
    before do
      @item_create_params = {
        name: 'テストの盾',
        price: 5000,
        user_id: @user.id
      }
    end
    it '新しい欲しいものを正常に作成できる' do
      expect do
        post '/api/v1/items', params: @item_create_params
        expect(response.status).to eq 200
      end.to change { Item.count }.by(1)
    end
  end

  describe 'PUT /items/:id' do
    before do
      @item_update_params = {
        name: 'テストの棍棒',
        price: 3000
      }
    end
    it '欲しいものの名前と値段を正常に更新できる' do
      put "/api/v1/items/#{@item.id}", params: @item_update_params
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['item']['name']).to eq('テストの棍棒')
      expect(JSON.parse(response.body)['item']['price']).to eq(3000)
    end
  end

  describe 'DELETE /items/:id' do
    it '欲しいものを正常に削除できる' do
      expect do
        delete "/api/v1/items/#{@item.id}"
        expect(response.status).to eq 200
      end.to change { Item.count }.by(-1)
    end
  end
end

describe 'ImageAPI' do
  before do
    @user = create(:user)
    @item = create(:item, user_id: @user.id)
  end
  describe 'POST /images' do
    before do
      @image_create_params = {
        image: 'item.jpg',
        item_id: @item.id
      }
    end
    example '画像情報が正常に保存される' do
      post '/api/v1/images/', params: @image_create_params
      expect(JSON.parse(response.body)['image']['image']).to eq('item.jpg')
    end
  end
end

describe 'VideoAPI' do
  before do
    @user = create(:user)
    @item = create(:item, user_id: @user.id)
    @video = create(:video, item_id: @item.id)
  end
  describe 'GET /videos' do
    before do
      create_list(:video, 9)
    end
    example '参考動画の一覧が正常に取得できる' do
      get '/api/v1/videos'
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['videos'].length).to eq 10
    end
  end
  describe 'POST /videos' do
    before do
      @video_create_params = {
        url: 'http://create-url',
        item_id: @item.id
      }
    end
    example '参考動画を正常に作成できる' do
      expect do
        post '/api/v1/videos', params: @video_create_params
        expect(response.status).to eq 200
      end.to change { Video.count }.by(1)
    end
  end

  describe 'PUT /videos/:id' do
    example '参考動画を正常に削除できる' do
      expect do
        delete "/api/v1/videos/#{@video.id}"
        expect(response.status).to eq 200
      end.to change { Video.count }.by(-1)
    end
  end
end

describe 'SiteAPI' do
  before do
    @user = create(:user)
    @item = create(:item, user_id: @user.id)
    @site = create(:site, item_id: @item.id)
  end
  describe 'GET /api/v1/sites' do
    before do
      create_list(:site, 9)
    end
    example '購入サイト一覧情報が正常に取得できる' do
      get '/api/v1/sites'
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['sites'].length).to eq 10
    end
  end
  describe 'POST /sites' do
    before do
      @site_create_params = {
        site_name: 'rakuten',
        url: 'http://create-url',
        item_id: @item.id
      }
    end
    example '購入サイト情報を正常に作成できる' do
      expect do
        post '/api/v1/sites', params: @site_create_params
        expect(response.status).to eq 200
        expect(JSON.parse(response.body)['site']['url']).to eq('http://create-url')
        expect(JSON.parse(response.body)['site']['site_name']).to eq('rakuten')
      end.to change { Site.count }.by(1)
    end
  end
  describe 'PUT /sites/:id' do
    before do
      @site_update_params = {
        url: 'http://update-url'
      }
    end
    example '購入サイト情報を正常に更新できる' do
      put "/api/v1/sites/#{@site.id}", params: @site_update_params
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['site']['url']).to eq('http://update-url')
    end
  end
  describe 'DELETE /sites/:id' do
    example '購入サイト情報を正常に削除できる' do
      expect do
        delete "/api/v1/sites/#{@site.id}"
        expect(response.status).to eq 200
      end.to change { Site.count }.by(-1)
    end
  end
end
