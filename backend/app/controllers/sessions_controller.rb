module Api
  module V1
    class SessionsController < ApplicationController
      def new; end

      def login
        @user = User.find_by(email: session_params[:email].downcase)
        if @user && authencicate(session_params[:password])
          log_in(@user)
          render json: { logged_in: true, user: @user }
        else
          render json: { status: 401, errors: ['認証に失敗しました'] }
        end
      end

      def logout
        reset_session
        render json: { status: 200, logged_out: true }
      end

      def logged_in?
        if @current_user
          render json: { logged_in: true, user: current_user }
        else
          render json: { logged_in: false, messages: 'ユーザーが存在しません' }
        end
      end

      private

      def session_params
        params.require(:user).permit(:email, :password)
      end
    end
  end
end
