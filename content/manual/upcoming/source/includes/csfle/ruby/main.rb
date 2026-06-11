require_relative 'make_data_key'
require_relative 'insert_encrypted_document'

SEPARATOR = '=' * 60

puts SEPARATOR
puts 'Running make_data_key.rb...'
puts SEPARATOR
make_key

puts SEPARATOR
puts 'Running insert_encrypted_document.rb...'
puts SEPARATOR
insert

puts SEPARATOR
puts 'All scripts completed successfully!'
puts SEPARATOR
