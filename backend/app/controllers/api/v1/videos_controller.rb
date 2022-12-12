module Api
  module V1
    class VideosController < ApplicationController
      def index
        videos = Video.all
        render json: videos
      end

      def create
        video = Video.new(video_params)
        if video.save!
          render json: { status: :created, video: video }
        else
          render json: video.errors
        end
      end

      def destroy
        video = Video.find(params[:id])
        if video.destroy
          render json: video
        else
          render json: video.errors
        end
      end

      private

      def video_params
        params.require(:video).permit(:url, :item_id)
      end
    end
  end
end
