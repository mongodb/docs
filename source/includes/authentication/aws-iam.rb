require 'bundler/inline'
gemfile do
  source 'https://rubygems.org'
  gem 'mongo'
end

# start-aws
client = Mongo::Client.new(['<host>'],
                           auth_mech: :aws,
                           user: '<aws_access_key_id>',
                           password: '<aws_secret_access_key>')
# end-aws

# start-aws-connection-string
client = Mongo::Client.new(
  'mongodb://<aws_access_key_id>:<aws_secret_access_key>@host/?authMechanism=MONGODB-AWS')
# end-aws-connection-string

# start-aws-temp
client = Mongo::Client.new(['<host>'],
                           auth_mech: :aws,
                           user: '<aws_access_key_id>',
                           password: '<aws_secret_access_key>',
                           auth_mech_properties: {
                             aws_session_token: '<<aws_session_token>>',
                           })
# end-aws-temp

# start-aws-temp-connection-string
client = Mongo::Client.new(
  'mongodb://<aws_access_key_id>:<aws_secret_access_key>@host/?authMechanism=MONGODB-AWS&authMechanismProperties=AWS_SESSION_TOKEN:<<aws_session_token>>')
# end-aws-temp-connection-string

# start-aws-automatic-retrieval
client = Mongo::Client.new(['<hostname>'],
                           auth_mech: :aws)
)
# end-aws-automatic-retrieval

# start-aws-automatic-retrieval-connection-string
client = Mongo::Client.new(
  'mongodb://host/?authMechanism=MONGODB-AWS')
# end-aws-automatic-retrieval-connection-string