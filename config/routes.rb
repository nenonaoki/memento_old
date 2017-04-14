Rails.application.routes.draw do

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'pages#home'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # get 'about' => 'pages#about'
  # get 'terms' => 'pages#terms'
  # get 'privacy' => 'pages#privacy'
  get 'signup' => 'users#new'
  get 'login' => 'sessions#new'
  post 'login' => 'sessions#create'
  delete 'logout' => 'sessions#destroy'
  get 'search' => 'searches#index'

  # get 'media/:token' => 'media#show', as: :medium

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  resource :account, only: [:show]
  resource :setting, only: [:show] do
    member do
      get :display_name
      get :description
      get :email
      get :password
      get :avatar
      get :cover
    end
  end
  resources :users, param: :name, except: [:index]
  resources :account_activations, only: [:edit]
  resources :password_resets, only: [:new, :edit]
  resources :new_emails, only: [:edit]
  resources :comments, only: [:create, :destroy]
  resources :media, param: :token, only: [:show] do
    member do
      post :check_in
    end
  end
  resources :tags, param: :slug, only: [:show]

  namespace :api, { format: 'json' } do
    post 'login'   => 'sessions#create'
    delete 'logout'  => 'sessions#destroy'
    get 'search' => 'searches#index'
    resources :users, param: :name, except: [:index] do
      member do
        # get :timeline
        get :history
      end
    end
    resources :password_resets, only: [:create, :update]
    resources :new_emails, only: [:create, :update]
    resources :comments, only: [:create, :destroy]
    resources :media, param: :token, only: [:show] do
      member do
        post :check_in
      end
      resources :comments, only: [:index, :create, :destroy]
    end
    resources :tags, param: :slug, only: [:show]
  end

  get 'api/media/:token/viewer' => 'api/media#viewer', defaults: { format: 'xml' }

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
