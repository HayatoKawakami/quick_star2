module Api
  module V1
    class ItemsController < ApplicationController
      wrap_parameters :item, only: %i[name price user_id]
      before_action :set_item, only: %i[show update destroy]
      def index
        items = Item.all
        render json: items
      end

      def show
        render json: @item
      end

      def create
        @item = Item.new(item_params)
        if @item.save!
          render json: { status: :created, item: @item }
        else
          render json: { status: 500 }
        end
      end

      def update
        if @item.update(item_params)
          render json: @item
        else
          render json: @item.error
        end
      end

      def destroy
        if @item.destroy
          render json: @item
        else
          render json: @item.error
        end
      end

      private

      def set_item
        @item = Item.find(params[:id])
      end

      def item_params
        params.require(:item).permit(:name, :price, :user_id)
      end
    end
  end
end
