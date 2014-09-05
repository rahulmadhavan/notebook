class Assignment < ActiveRecord::Base
  belongs_to :folder
  has_many :records
end
