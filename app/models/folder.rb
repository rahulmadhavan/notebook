class Folder < ActiveRecord::Base
  has_many :assignments, -> { where deleted: false }
end
