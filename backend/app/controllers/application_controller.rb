class ApplicationController < ActionController::API
  before_action :configure_sign_up_params, if: :devise_controller?

  private

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up,
                                      keys: %i[name email password password_confirmation sex image birthday])
  end
end
