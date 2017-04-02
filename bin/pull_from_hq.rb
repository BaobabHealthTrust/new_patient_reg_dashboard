@settings = SETTINGS
hq = @settings[:hq]
dashboard = @settings[:dashboard]
Statistic.count
source_to_target = %x[curl -k -H 'Content-Type: application/json' -X POST -d '#{{
              source: "#{hq[:protocol]}://#{hq[:host]}:#{hq[:port]}/#{hq[:primary]}",
              target: "#{dashboard[:protocol]}://#{dashboard[:host]}:#{dashboard[:port]}/#{dashboard[:primary]}",
              connection_timeout: 60000,
              retries_per_request: 20,
              http_connections: 30,
              continuous: true
                }.to_json}' "#{dashboard[:protocol]}://#{dashboard[:username]}:#{dashboard[:password]}@#{dashboard[:host]}:#{dashboard[:port]}/_replicate"]                 

puts "There are #{Statistic.count } people"

JSON.parse(source_to_target).each do |key, value|
    puts "#{key.to_s.capitalize} : #{value.to_s.capitalize}"
end