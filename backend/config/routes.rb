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

      resources :items, only: %i[index show create update destroy]
      resources :costs, only: %i[index show create update destroy]
      resources :images, only: %i[index create destroy]
      resources :videos, only: %i[index create destroy]
      resources :sites, only: %i[index create update destroy]
    end
  end
end
