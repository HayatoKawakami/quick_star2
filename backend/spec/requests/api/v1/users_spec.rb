require 'rails_helper'

describe 'UserAPI' do
  describe 'GET /users' do
    before do
      create_list(:user, 4)
      get '/api/v1/users'
    end
    it '全ユーザーデータを正常に取得できる' do
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['users'].length).to eq(User.count)
    end
  end

  describe 'GET /users/1' do
    before do
      @user = create(:user)
      get "/api/v1/users/#{@user.id}"
    end
    it 'テストくんの情報を単体で取得できる' do
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['user']['name']).to eq(@user.name)
      expect(JSON.parse(response.body)['user']['email']).to eq(@user.email)
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
    end
    it 'ユーザー情報が正常に更新できる' do
    end
  end
end
