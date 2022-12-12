require 'rails_helper'

describe 'ItemAPI' do
  describe 'GET /items' do
    before do
      @user = create(:user)
      create_list(:item, 4, user_id: @user.id)
      get '/api/v1/items'
    end
    it '全アイテム一覧情報を正常に取得できる' do
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['items'].length).to eq 4
    end
  end

  describe 'GET /items/:id' do
    before do
      @item = create(:item)
      get "/api/v1/items/#{@item.id}"
    end
    it 'アイテム情報を個別に取得できる' do
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['item']['name']).to eq(@item.name)
    end
  end

  describe 'POST /items' do
    before do
      @user = create(:user)
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
      @user = create(:user)
      @item = create(:item, user_id: @user.id)
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
    before do
      @user = create(:user)
      @item = create(:item, user_id: @user.id)
    end
    it '欲しいものを正常に削除できる' do
      expect do
        delete "/api/v1/items/#{@item.id}"
        expect(response.status).to eq 200
      end.to change { Item.count }.by(-1)
    end
  end
end
