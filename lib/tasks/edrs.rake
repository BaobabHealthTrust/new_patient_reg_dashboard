namespace :edrs do
  desc "Creating default user"
  task sync: :environment do
    require Rails.root.join('bin','./pull_from_hq.rb')
  end
end