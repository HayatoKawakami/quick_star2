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
      @user = create(:user)
      @user_update_params = {
        name: 'テストくん改良版',
        email: 'test-update@gmail.com',
        income: 500_000
      }
    end

    it 'ユーザー名が正常に更新できる' do
      put "/api/v1/users/#{@user.id}", params: @user_update_params
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['user']['name']).to eq('テストくん改良版')
    end

    it 'メールアドレスが正常に更新できる' do
      put "/api/v1/users/#{@user.id}", params: @user_update_params
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['user']['email']).to eq('test-update@gmail.com')
    end

    it 'メールアドレスではない情報が入力された場合' do
      @user.email = 'test-updategamilcom'
      expect(@user).to be_invalid
    end

    it '額面収入が正常に更新できる' do
      put "/api/v1/users/#{@user.id}", params: @user_update_params
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['user']['income']).to eq(500_000)
    end
  end

  describe 'DELETE /api/v1/users/:id' do
    before do
      @user = create(:user)
    end
    it '正常にユーザーが削除される' do
      expect do
        delete "/api/v1/users/#{@user.id}"
        expect(response.status).to eq 200
      end.to change { User.count }.by(-1)
    end
  end
end
