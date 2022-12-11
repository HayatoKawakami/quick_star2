RSpec.describe Cost, type: :model do
  describe '一覧表示機能' do
    before do
      # ユーザー「テストくん」を作成しておく
      user_a = FactoryBot.create(:user)
      # 作成者がテストくんである固定費を作成しておく
      FactoryBot.create(:cost, user: user_a)
    end
    context 'テストくんがログインしている時' do
      it 'テストくんが作成した固定費が表示される' do
        # 「家賃」という名称が画面に表示されているかを確認
        expect(page).to have_content '家賃'
      end
    end
  end
end
