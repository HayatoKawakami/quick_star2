module Api
  module V1
    class SessionsController < ApplicationController
      wrap_parameters :user
      def login
        @user = User.find_by(email: session_params[:email].downcase)
        if @user && @user.authenticate(session_params[:password])
          log_in(@user)
          render json: { status: 200, logged_in: true, user: @user }
        else
          render json: { status: 401, errors: ['メールアドレス、またはパスワードが間違っています'] }
        end
      end

      def logout
        reset_session
        render json: { status: 200, logged_in: false }
      end

      private

      def session_params
        params.permit(:email, :password)
      end
    end
  end
end
