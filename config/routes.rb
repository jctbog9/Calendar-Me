Rails.application.routes.draw do
  root 'events#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :events

  namespace :api do
    namespace :v1 do
    resources :events, only: [:index, :create]
    end
  end
end
