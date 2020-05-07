Rails.application.routes.draw do
  devise_for :users
  root 'pages#home'
  get  '/search', to: 'pages#search'
  get  '/component', to: 'pages#component'
  post '/save_component', to: 'pages#save_component'
end
