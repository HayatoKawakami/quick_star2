require 'rails_helper'

describe 'CostAPI' do
  describe 'GET /costs' do
    before do
      @user = create(:user)
      @cost = create(:cost, user_id: @user.id)
      get '/api/v1/costs'
    end
    it '固定費一覧情報を正常に取得できる' do
      expect(response.status).to eq 200
    end
  end
end
