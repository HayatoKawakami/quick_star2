module UsersHelper
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def health_welfare_insurance(health, welfare_pension)
    @health_insurance = health
    @welfare_pension_insurance = welfare_pension
  end
end
