require 'rails_helper'

describe 'UserAPI' do
  before  do
    @user = create(:user, name: 'テストくん', email: 'test@gmail.com')
  end
  describe 'GET /users' do
    before do
      create_list(:user, 4)
      get '/api/v1/users'
    end
    example '全ユーザーデータを正常に取得できる' do
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['users'].length).to eq 5
    end
  end

  describe 'GET /users/1' do
    before do
      get "/api/v1/users/#{@user.id}"
    end
    it 'ユーザーデータを正常に取得できる' do
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['user']['name']).to eq('テストくん')
      expect(JSON.parse(response.body)['user']['email']).to eq('test@gmail.com')
    end
  end

  describe 'POST /users' do
    before do
      @user_create_params = {
        name: 'テストくん',
        email: 'hayato.drsp@gmail.com',
        password: '0000',
        password_confirmation: '0000',
        sex: 1,
        birthday: '1990-03-22',
        income: 200_000,
        image: 'icon.jpg'
      }
    end
    it 'ユーザーが正常に作成される' do
      expect do
        post '/api/v1/users', params: @user_create_params
        expect(response.status).to eq 200
      end.to change { User.count }.by(1)
    end
  end

  describe 'PUT /users/:id' do
    before do
      @user_update_params = {
        name: 'テストくん改良版',
        email: 'test-update@gmail.com',
        income: 500_000
      }
    end

    it 'ユーザー情報が正常に更新できる' do
      put "/api/v1/users/#{@user.id}", params: @user_update_params
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['user']['name']).to eq('テストくん改良版')
    end

    it '額面収入が正常に更新できる' do
      put "/api/v1/users/#{@user.id}", params: @user_update_params
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['user']['income']).to eq(500_000)
    end
  end

  describe 'DELETE /users/:id' do
    it 'ユーザーが正常に削除される' do
      expect do
        delete "/api/v1/users/#{@user.id}"
        expect(response.status).to eq 200
      end.to change { User.count }.by(-1)
    end
  end

  describe 'GET /take_home_pay' do
    before do
      @user = create(:user, email: 'hayato.drsp@gmail.com')
      @user_login_params = {
        email: 'hayato.drsp@gmail.com',
        password: '0000'
      }
      post '/api/v1/login', params: @user_login_params
      get '/api/v1/take_home_pay'
    end
    example '手取り収入の計算結果が正常に取得できる' do
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['take_home_pay']).to eq 167_190
    end
  end
end
