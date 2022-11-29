module SessionsHelper
  def log_in(user)
    session[:user_id] = user.id
  end

  def logged_in?
    if current_user
      render json: { logged_in: true, user: @current_user }
    else
      render json: { logged_in: false, messages: 'ユーザーが存在しません' }
    end
  end
end
