Rails.application.routes.draw do
  scope :api do
    scope :v1 do
      devise_for :users, format: 'json'
      get '/users', to: 'api/v1/users#index'
      get '/users/:id', to: 'api/v1/users#show'
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
