module Api
  module V1
    class ImagesController < ApplicationController
      def create
        image = Image.new(image_params)
        if image.save!
          render json: { status: 200, image: image }
        else
          render json: image.errors
        end
      end

      def destroy
        image = Image.find(params[:id])
        if image.destroy
          render json: image
        else
          render json: image.errors
        end
      end

      private

      def image_params
        params.permit(:image, :item_id)
      end
    end
  end
end
