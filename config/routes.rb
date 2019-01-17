Rails.application.routes.draw do
  root 'events#index'
  devise_for :users

  resources :events

  namespace :api do
    namespace :v1 do
      post 'events/search', to: 'events#search'
      resources :events, only: [:index, :create]
      resources :signups, only: [:index, :show, :destroy, :create]
      resources :all_signups, only: [:index, :create, :delete]
      resources :teams, only: [:index, :create, :delete]
      resources :current_team, only: [:index]
      resources :admin, only: [:index, :create]
      resources :edit_user, only: [:index, :create]
    end
  end

  get '/my-events', to: 'events#index'
  get '/edit-profile', to: 'events#index'
  get '/users/sign_up', to: 'events#index'

end
