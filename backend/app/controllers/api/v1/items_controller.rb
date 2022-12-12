module Api
  module V1
    class ItemsController < ApplicationController
      wrap_parameters :item, only: %i[name price user_id start]
      before_action :set_item, only: %i[show update destroy]
      def index
        items = Item.all
        render json: { status: 200, items: items }
      end

      def show
        render json: { status: 200, item: @item }
      end

      def create
        @item = Item.new(item_params)
        if @item.save!
          render json: { status: 200, item: @item }
        else
          render json: { status: 404 }
        end
      end

      def update
        if @item.update(item_params)
          render json: { status: 200, item: @item }
        else
          render json: { status: 404, item: @item.error }
        end
      end

      def destroy
        if @item.destroy
          render json: { status: 200, item: @item }
        else
          render json: { status: 404, item: @item.error }
        end
      end

      private

      def set_item
        @item = Item.find(params[:id])
      end

      def item_params
        params.permit(:name, :price, :user_id, :start)
      end
    end
  end
end
