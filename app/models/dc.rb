class Dc < CouchRest::Model::Base

  property :district_code, String
  property :registered, Integer
  property :approved, Integer
  property :date_created, String
   
  timestamps!
  
  design do
    view :by__id
    view :by_district_code
    view :by_registered
    view :by_approved
    view :by_district_code_and_registered_and_approved
    
    view :by_date_created_range,
         :map => "function(doc) {
                  if (doc['type'] == 'Dc' && doc['date_created'] != null) {
                    if (doc['date_created'].trim().match(/^(\\d{2}|\\d{1})\\/[A-Z][a-z]{2}\\/\\d{4}/) ||
                        doc['date_created'].trim().match(/^(\\d{2}|\\d{1})\s[A-Z][a-z]{2},\s\\d{4}/)) {
                            var tokens = doc['date_created'].replace(/,/, '').replace(/\\//g, ' ').split(' ');
                            var months = {'Jan':'01','Feb':'02','Mar':'03','Apr':'04','May':'05','Jun':'06',
                              'Jul':'07','Aug':'08','Sep':'09','Oct':'10','Nov':'11','Dec':'12'};
                            var date = tokens[2] + '-' + months[tokens[1]] + '-' + tokens[0];
                            emit((new Date(date)), 1);
                    } else if(doc['date_created'].trim().length > 10){
                        var date = doc['date_created'].trim().substring(0, 10);
                        emit((new Date(date)), 1);
                    } else {
                      emit((new Date(doc['date_created'])), 1);
                    }
                  }
                }"


  end 
  
end
