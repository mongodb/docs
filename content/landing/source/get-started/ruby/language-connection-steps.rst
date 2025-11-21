.. procedure::

   .. step:: Load sample data

      .. include:: /get-started/includes/load-sample-data.rst

   .. step:: Initialize your application

      Before you begin developing, ensure that you have `Ruby
      <https://www.ruby-lang.org/en/downloads/>`__ version 2.5 or
      later installed.

      Run the following commands in your shell to create your project
      directory and your application file.

      .. tabs::
         
         .. tab:: macOS
            :tabId: macos

            .. code-block:: shell

               mkdir ruby-get-started
               cd ruby-get-started
               touch get_started.rb

         .. tab:: Windows
            :tabId: windows

            .. code-block:: shell

               mkdir ruby-get-started
               cd ruby-get-started
               type NUL > get_started.rb

      Add the following code to the ``get_started.rb`` file to add the
      {+ruby-driver+} with the `Bundler <https://bundler.io/>`__ dependency
      management tool:

      .. code-block:: ruby

         require 'bundler/inline'

         gemfile do
           source 'https://rubygems.org'
           gem 'mongo'
         end

   .. step:: Create your application

      Copy and paste the following code into the ``get_started.rb``
      file. This code connects to your cluster and queries the sample
      data: 

      .. literalinclude:: /shared/drivers-get-started/ruby/get-started-connect.rb
         :language: ruby
         :dedent:
         :start-after: start-query
         :end-before: end-query
      
   .. step:: Add your connection string

      .. include:: /get-started/includes/connection-string-note.rst

   .. step:: Run your application

      In your project directory, run the following command to start the application:

      .. code-block:: shell

         ruby quickstart.rb

      The application output contains details about the retrieved
      movie document:

      .. code-block:: shell

         {"_id"=>BSON::ObjectId('...'), "plot"=>"A young man is accidentally sent
         30 years into the past in a time-traveling DeLorean invented by his friend,
         Dr. Emmett Brown, and must make sure his high-school-age parents unite
         in order to save his own existence.", ...
         "title"=>"Back to the Future", ...