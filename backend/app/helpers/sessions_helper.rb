module SessionsHelper
  def log_in(user)
    session[:user_id] = user.id
  end

  def logged_in?
    if current_user
      render json: { status: 200, logged_in: true, user: @current_user }
    else
      render json: { status: 404, logged_in: false, message: 'ログイン中のユーザーが存在しません' }
    end
  end
end
