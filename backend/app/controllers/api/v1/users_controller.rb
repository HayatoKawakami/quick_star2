require "#{Rails.root}/app/controllers/application_controller.rb"

module Api
  module V1
    class UsersController < ApplicationController
      wrap_parameters :user, include: %i[name email password password_confirmation sex image birthday]
      before_action :set_user, only: %i[show edit update destroy]

      def index
        users = User.all
        render json: { status: 200, users: users }
      end

      def show
        render json: { status: 200, user: @user }
      end

      def create
        user = User.new(user_params)
        if user.save!
          log_in(user)
          render json: { status: 200, user: user }
        else
          render json: { status: 404 }
        end
      end

      def update
        if @user.update!(user_params)
          render json: { status: 200, user: @user }
        else
          render json: { status: 404, user: @user.error }
        end
      end

      def destroy
        if @user.destroy
          reset_session
          render json: { status: 200, user: @user }
        else
          render json: { status: 404, user: @user.error }
        end
      end

      def take_home_pay
        # 額面収入
        income = current_user.income
        # 健康保険料と厚生年金保険料の自動計算
        health_welfare_calc(income)
        # 雇用保険料の計算
        employment_insurance = income * 0.005
        # 社会保険料　
        social_insurance = @health_insurance + @welfare_pension_insurance + employment_insurance
        # 社保控除後計(Company insurance deduction poster)　cidp
        cidp = income - social_insurance
        # 源泉所得税の自動計算
        income_tax = income_tax_calc(cidp)
        # 　手取り額　=　income　-　社会保険料-　源泉所得税　の順
        take_home_pay = income - social_insurance - income_tax
        render json: {
          income: income,
          health_insurance: @health_insurance,
          welfare_pension_insurance: @welfare_pension_insurance,
          employment_insurance: employment_insurance,
          social_insurance: social_insurance,
          income_tax: income_tax,
          take_home_pay: take_home_pay
        }
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
