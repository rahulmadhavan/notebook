namespace :notebook do

  desc 'To generate pdp report for assignments'
  task generate_report: :environment do
    assignment = Assignment.find(ENV["assignment"])
    puts assignment.generate_report
  end

  desc 'To test how rake works'
  task test_task: :environment do
  end

end
