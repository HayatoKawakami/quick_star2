Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users
      get 'profile', to: 'users#show'
      get '/profile/edit', to: 'users#edit'
      get 'sign_up', to: 'users#new'

      post 'login', to: 'sessions#login'
      delete 'logout', to: 'sessions#logout'
      get 'logged_in', to: 'sessions#logged_in?'
    end
  end
end
