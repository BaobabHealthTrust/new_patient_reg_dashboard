class Circle < CouchRest::Model::Base
	
  property :circle, Integer, :default => 0
  property :description, String
  timestamps!

  design do
    view :by__id
    view :by_description
  end

end
