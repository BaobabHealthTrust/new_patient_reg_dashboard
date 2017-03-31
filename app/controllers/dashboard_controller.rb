class DashboardController < ApplicationController
	def index
		
	end

	def get_data
	    
	   	file_name = Rails.root.join('app/assets/data/', "#{params[:time]}.json")
	    fileinput = File.read(file_name)
	    results = fileinput.slice(1, (fileinput.length-2)).gsub("=",":").gsub("\\u003e","").gsub("u003c","").delete! "\\"

	    results = JSON.parse(results)
	    render :text => results.to_json
	end

	def district_and_code
		results = {}
		CSV.foreach("#{Rails.root}/app/assets/data/districts_with_codes.csv", :headers => true) do |row|
			next if row[0].blank?
			results[row[1]] = [row[0]]
		end
		render :text => results.to_json
	end
end
