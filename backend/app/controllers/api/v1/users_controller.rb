require "#{Rails.root}/app/controllers/application_controller.rb"

module Api
  module V1
    class UsersController < ApplicationController
      before_action :set_user, only: %i[show edit update destroy]

      def show
        render json: @user
      end

      def new
        user = User.new
        render json: user
      end

      def create
        user = User.new(user_params)
        if user.save
          render json: user
        else
          render json: user.errors
        end
      end

      def edit
        render json: @user
      end

      def update
        @user = User.update(user_params)
        if @user.save
          render json: @user
        else
          render json: @user.errors
        end
      end

      def destroy
        if @user.destroy
          render json: @user
        else
          render json: @user.errors
        end
      end

      private

      def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation, :image, :birthday, :sex)
      end

      def set_user
        @user = User.find(params[:id])
      end
    end
  end
end
