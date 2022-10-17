Rails.application.routes.draw do
  
  namespace :api do
    namespace :v1 do
      resources :users
      get 'sign_up', to: 'users#new'
      get 'login', to: 'sessions#new'
      post 'login', to: 'sessions#create'
      delete 'logout', to: 'sessions#destroy'
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
