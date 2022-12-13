module Api
  module V1
    class VideosController < ApplicationController
      def index
        videos = Video.all
        render json: { status: 200, videos: videos }
      end

      def create
        video = Video.new(video_params)
        if video.save!
          render json: { status: 200, video: video }
        else
          render json: { status: 404, video: video.errors}
        end
      end

      def destroy
        video = Video.find(params[:id])
        if video.destroy
          render json: { status: 200, video: video}
        else
          render json: { status: 404, video: video.errors}
        end
      end

      private

      def video_params
        params.permit(:url, :item_id)
      end
    end
  end
end
