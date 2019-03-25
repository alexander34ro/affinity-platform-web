Rails.application.routes.draw do
  root 'pages#home'
  get  '/search', to: 'pages#search'
  get  '/component', to: 'pages#component'
end
