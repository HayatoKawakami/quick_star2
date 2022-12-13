require 'rails_helper'

describe 'SessionAPI' do
  before do
    @user = create(:user, name: 'テストくん(ログイン版)', email: 'hayato.drsp@gmail.com')
    @user_login_params = {
      email: 'hayato.drsp@gmail.com',
      password: '0000'
    }
  end
  describe 'POST /login' do
    example '正常にログイン処理ができる' do
      post '/api/v1/login', params: @user_login_params
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['logged_in']).to eq true
    end
  end
  describe 'DELETE /logout' do
    example '正常にログアウト処理ができる' do
      post '/api/v1/login', params: @user_login_params
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['logged_in']).to eq true
      delete '/api/v1/logout'
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['logged_in']).to eq false
    end
  end
  describe 'GET /logged_in?' do
    before do
      post '/api/v1/login', params: @user_login_params
    end
    example 'ログイン中であれば、logged_in: true でリターンされ、ログイン中のユーザー情報一覧を正常に取得できる' do
      get '/api/v1/logged_in?'
      expect(response.status).to eq 200
      expect(JSON.parse(response.body)['logged_in']).to eq true
      expect(JSON.parse(response.body)['user']['name']).to eq('テストくん(ログイン版)')
    end
    example '未ログインであれば、logged_in: false でリターンされ、ログイン中のユーザー情報を求めても返ってこない' do
      delete '/api/v1/logout'
      get '/api/v1/logged_in?'
      expect(JSON.parse(response.body)['logged_in']).to eq false
      expect(JSON.parse(response.body)['message']).to eq('ログイン中のユーザーが存在しません')
    end
  end
end
