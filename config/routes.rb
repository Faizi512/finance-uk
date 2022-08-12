Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get 'pages/index'
  get '/apply-social' => 'pages#apply_social'
  get '/apply-google' => 'pages#apply_google'
  get '/opt-out' => 'pages#opt_out'
  get '/unsubscribe' => 'pages#unsubscribe'
  get '/privacy' => 'pages#privacy'
  get '/terms-and-conditions' => 'pages#terms_and_conditions'
  get '/cookie-policy' => 'pages#cookie_policy'
  root "pages#index"
end
