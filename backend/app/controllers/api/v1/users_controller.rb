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
          log_in(user)
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
          reset_session
          render json: @user
        else
          render json: @user.errors
        end
      end

      def take_home_pay
        user = User.find(session[:user_id])
        income = user.income
        # 　take_home_pay　=　income　-　健康保険料　-　厚生年金保険料　-　雇用保険料　-　源泉所得税　の順
        take_home_pay = income - (income * 0.0981 / 2) - (income * 0.183 / 2) - (income * 0.005) - 6750
        render json: { status: 200, income: income, take_home_pay: take_home_pay }
      end

      private

      def user_params
        params.permit(:id, :name, :email, :password, :password_confirmation, :sex, :birthday, :image, :income)
      end

      def set_user
        @user = User.find(params[:id])
      end
    end
  end
end
