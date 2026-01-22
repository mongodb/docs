Rails.application.routes.draw do
  resources :restaurants
  get "browse" => "restaurants#browse"

  # Defines the root path route ("/")
  root "restaurants#index"
end