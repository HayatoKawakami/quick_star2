module Api
  module V1
    class SitesController < ApplicationController
      before_action :set_site, only: %i[update destroy]
      def index
        sites = Site.all
        render json: { status: 200, sites: sites }
      end

      def create
        site = Site.new(site_params)
        if site.save!
          render json: { status: 200, site: site }
        else
          render json: { status: 404, site: site.errors }
        end
      end

      def update
        if @site.update!(site_params)
          render json: { status: 200, site: @site }
        else
          render json: { status: 404, site: @site.errors }
        end
      end

      def destroy
        if @site.destroy!
          render json: { status: 200, site: @site }
        else
          render json: { status: 404, site: @site.errors }
        end
      end

      private

      def site_params
        params.permit(:site_name, :url, :item_id)
      end

      def set_site
        @site = Site.find(params[:id])
      end
    end
  end
end
