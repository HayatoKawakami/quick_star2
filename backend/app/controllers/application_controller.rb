module Api
  module V1
    class ApplicationController < ActionController::API
      include UsersHelper
      def log_in(user)
        session[:user_id] = user.id
      end
    end
  end
end
