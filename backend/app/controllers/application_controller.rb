class ApplicationController < ActionController::API
  include SessionsHelper
  skip_before_action :verify_authenticity_token
end
