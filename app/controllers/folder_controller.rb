class FolderController < ApplicationController
  respond_to :json

  def static
    #redirect_to('/notebook.html')
    render
  end

  def index
    render json: Folder.where(:deleted => false)
  end

  def create

    data_hash = {}
    data_hash[:name] = params[:name].strip if params[:name].present?
    data_hash[:subject] = params[:subject].strip if params[:subject].present?

    folder = Folder.create!(data_hash)

    render json: folder
  end

  def modify

    folder = Folder.find(params[:id].to_i)

    data_hash = {}
    data_hash[:name] = params[:name].strip if params[:name].present?
    data_hash[:subject] = params[:subject].strip if params[:subject].present?

    folder.update!(data_hash)

    render json: Folder.find(params[:id].to_i)
  end

  def fetch
    folder = Folder.find(params[:id].to_i)
    render json: folder
  end

  def fetch_assignments
    folder = Folder.find(params[:id].to_i)
    render json: folder.assignments
  end

  def delete
    folder = Folder.find(params[:id].to_i)
    folder.update!({:deleted => true})
    render json: true
  end


end
