require 'rails_helper'

describe 'CostAPI' do
  before do
    @user = create(:user, email: 'hayato.drsp@gmail.com')
    @user_login_params = {
      email: 'hayato.drsp@gmail.com',
      password: '0000'
    }
    post '/api/v1/login', params: @user_login_params
    @cost = create(:cost, user_id: @user.id)
    create_list(:cost, 9, user_id: @user.id)
  end
  describe 'GET /costs' do
    before do
      get '/api/v1/costs'
    end
    it '固定費一覧情報を正常に取得できる' do
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['costs'].length).to eq 10
    end
  end

  describe 'GET /costs/:id' do
    before do
      @cost = create(:cost, name: '個別の固定費')
      get "/api/v1/costs/#{@cost.id}"
    end
    it '固定費情報を個別に取得できる' do
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['cost']['name']).to eq('個別の固定費')
    end
  end

  describe 'POST /costs' do
    before do
      @cost_create_params = {
        name: '作成した固定費',
        price: 10_000,
        user_id: @user.id
      }
    end
    it '固定費を正常に作成できる' do
      post '/api/v1/costs', params: @cost_create_params
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['cost']['name']).to eq('作成した固定費')
    end
  end

  describe 'PUT /costs/:id' do
    before do
      @cost_update_params = {
        name: '更新した固定費',
        price: 20_000,
        user_id: @user.id
      }
    end
    it '固定費を正常に更新できる' do
      put "/api/v1/costs/#{@cost.id}", params: @cost_update_params
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['cost']['name']).to eq('更新した固定費')
    end
  end

  describe 'DELETE /costs/:id' do
    it '固定費を正常に削除できる' do
      expect do
        delete "/api/v1/costs/#{@cost.id}"
        expect(response.status).to eq 200
      end.to change { Cost.count }.by(-1)
    end
  end

  describe 'GET /calc_all_costs' do
    before do
      create_list(:cost, 10)
    end
    example '固定費の合計額を正常に取得できる' do
      get '/api/v1/calc_all_costs'
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['total_costs_price']).to eq 10_000
    end
  end
end
