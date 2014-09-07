class RecordController < ApplicationController
  respond_to :json

  def static
    assignment_id = params[:assignment_id]
    redirect_to('/record.html?assignment_id='+assignment_id)
  end

  def index
    render json: Record.limit(10)
  end

  def create

    data_hash = {}
    data_hash[:date] = Date.strptime(params[:date].strip,'%m/%d/%Y') if params[:date].present?
    data_hash[:start] = Time.now
    data_hash[:who] = params[:who].strip if params[:who].present?
    data_hash[:interruptions] = params[:interruptions].strip if params[:interruptions].present?
    data_hash[:question] = params[:question].strip if params[:question].present?
    data_hash[:comments] = params[:comments].strip if params[:comments].present?
    data_hash[:assignment_id] = params[:assignment_id] if params[:assignment_id].present?
    data_hash[:commit] = params[:commit] if params[:commit].present?

    record = Record.create!(data_hash)

    render json: record
  end

  def modify

    record = Record.find(params[:id].to_i)
    data_hash = {}
    data_hash[:date] = Date.strptime(params[:date].strip,'%m/%d/%Y') if params[:date].present?
    data_hash[:who] = params[:who].strip if params[:who].present?
    data_hash[:interruptions] = params[:interruptions].strip if params[:interruptions].present?
    data_hash[:question] = params[:question].strip if params[:question].present?
    data_hash[:comments] = params[:comments].strip if params[:comments].present?
    data_hash[:assignment_id] = params[:assignment_id] if params[:assignment_id].present?
    data_hash[:commit] = params[:commit] unless params[:commit].nil?
    record.update_attributes!(data_hash)

    render json: Record.find(params[:id].to_i)
  end

  def fetch
    record = Record.find(params[:id].to_i)
    render json: record
  end

  def start
    record = Record.find(params[:id].to_i)
    updated_record = record.update!({:start => Time.now})
    render json: Record.find(params[:id].to_i)
  end

  def stop
    record = Record.find(params[:id].to_i)
    record.update!({:stop => Time.now})
    render json: Record.find(params[:id].to_i)
  end

  def delete
    Record.destroy(params[:id].to_i)
    render json: true
  end

end
