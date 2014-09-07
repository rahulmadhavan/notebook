class AssignmentController < ApplicationController
  respond_to :json

  def static
    folder_id = params[:folder_id]
    redirect_to('/assignment.html?folder_id='+folder_id)
  end

  def index
    render json: Assignment.all
  end

  def create

    data_hash = {}
    data_hash[:name] = params[:name].strip if params[:name].present?
    data_hash[:folder_id] = params[:folder_id] if params[:folder_id].present?

    assignment = Assignment.create!(data_hash)

    render json: assignment
  end

  def modify

    assignment = Assignment.find(params[:id].to_i)

    data_hash = {}
    data_hash[:name] = params[:name].strip if params[:name].present?
    data_hash[:folder_id] = params[:folder_id] if params[:folder_id].present?
    assignment.update!(data_hash)

    render json: assignment
  end

  def fetch
    assignment = Assignment.find(params[:id].to_i)
    render json: assignment
  end

  def fetch_records
    assignment = Assignment.find(params[:id].to_i)
    render json: assignment.records
  end

  def delete
    Assignment.destroy(params[:id].to_i)
    render json: true
  end


end
