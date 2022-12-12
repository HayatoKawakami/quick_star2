module Api
  module V1
    class CostsController < ApplicationController
      before_action :set_cost, only: %i[show update destroy]
      def index
        costs = Cost.where(user_id: session[:user_id])
        render json: costs
      end

      def show
        render json: @cost
      end

      def create
        @cost = Cost.new(cost_params)
        if @cost.save!
          render json: { status: :created, cost: @cost }
        else
          render json: @cost.errors
        end
      end

      def update
        if @cost.update(cost_params)
          render json: @cost
        else
          render json: @cost.errors
        end
      end

      def destroy
        if @cost.destroy
          render json: @cost
        else
          render json: @cost.errors
        end
      end

      def calc_all_costs
        costs = Cost.where(user_id: session[:user_id])
        price = 0
        costs.each do |cost|
          price += cost.price
        end
        render json: price
      end

      private

      def cost_params
        params.require(:cost).permit(:name, :price, :user_id)
      end

      def set_cost
        @cost = Cost.find(params[:id])
      end
    end
  end
end
