begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end

desc "A task to put all the pieces together before deploying"
task :deploy do
  %x{haml index.haml index.html}
  %x{jison javascripts/lang/navigation.jison -o javascripts/lang/navigation.js}
end
