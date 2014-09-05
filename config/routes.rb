Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'record#index'


  # Record related data
  get 'record' => 'record#index'
  get 'record/:id' => 'record#fetch'

  post 'record' => 'record#create'
  post 'record/:id' => 'record#modify'
  post 'record/:id/start' => 'record#start'
  post 'record/:id/stop' => 'record#stop'


  #Assignment
  get 'assignment' => 'assignment#index'
  get 'assignment/:id' => 'assignment#fetch'
  get 'assignment/:id/records' => 'assignment#fetch_records'

  post 'assignment' => 'assignment#create'
  post 'assignment/:id' => 'assignment#modify'


  #Folder
  get 'folder' => 'folder#index'
  get 'folder/:id' => 'folder#fetch'
  get 'folder/:id/assignments' => 'folder#fetch_assignments'

  post 'folder' => 'folder#create'
  post 'folder/:id' => 'folder#modify'


  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

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
