module Api
  module V1
    class ApplicationController < ActionController::API
      include UsersHelper
      include SessionsHelper
    end
  end
end
