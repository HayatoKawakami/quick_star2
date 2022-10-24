require "#{Rails.root}/app/controllers/application_controller.rb"

module Api
  module V1
    class UsersController < ApplicationController
      wrap_parameters :user, include: %i[name email password password_confirmation sex image birthday]
      before_action :set_user, only: %i[show edit update destroy]

      def index
        users = User.all
        render json: users
      end

      def show
        render json: @user
      end

      def create
        user = User.new(user_params)
        if user.save!
          log_in!
          render json: { status: :created, user: user }
        else
          render json: { status: 500 }
        end
      end

      def edit; end

      def update
        if @user.update!(user_params)
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
        params.permit(:id, :name, :email, :password, :password_confirmation, :sex, :birthday, :image)
      end

      def set_user
        @user = User.find(params[:id])
      end
    end
  end
end
