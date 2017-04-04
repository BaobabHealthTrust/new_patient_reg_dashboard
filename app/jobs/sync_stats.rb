class SyncStats
	include SuckerPunch::Job
  	workers 1
  	def perform
  		`bundle exec rake edrs:sync`
  		puts "Sync from HQ Done :)"
  		SyncStats.perform_in(600)
  	end
end