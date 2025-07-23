.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large
   :widths: 20 20 60

   * - Rails Framework
     - {+odm+} Support
     - Notes

   * - ``ActionCable``
     - ✓
     -  There is no MongoDB adapter for ``ActionCable``, but you can
        use any existing adapter, such as the `Redis Adapter
        <{+active-record-docs+}/action_cable_overview.html#redis-adapter>`__,
        alongside {+odm+} models.

   * - ``ActionMailbox``
     - *Unsupported*
     - Depends directly on Active Record.

   * - ``ActionMailer``
     - ✓
     - 

   * - ``ActionPack``
     - ✓
     - 

   * - ``ActionText``
     - *Unsupported*
     - Depends directly on Active Record.

   * - ``ActionView``
     - ✓
     - 

   * - ``ActiveJob``
     - ✓
     - Serialization of BSON and {+odm+} objects works best if you
       explicitly send ``BSON::ObjectId`` values as strings, and
       reconstitute them in the job. For example:
  
       .. code-block:: ruby
       
          record = Model.find(...)
          MyJob.perform_later(record._id.to_s)
   
          class MyJob < ApplicationJob
            def perform(id_as_string)
              record = Model.find(id_as_string)
              # ...
            end
          end

   * - ``ActiveModel``
     - ✓ 
     - The ``Mongoid::Document`` module includes
       ``ActiveModel::Model`` and leverages ``ActiveModel::Validations``
       for :ref:`mongoid-modeling-validation`.

   * - ``ActiveStorage``
     - *Unsupported*
     - Depends directly on Active Record.

   * - ``ActiveSupport``
     - ✓
     - The ``Mongoid`` module requires ``ActiveSupport``.
       ``Mongoid`` uses ``ActiveSupport::TimeWithZone`` for handling
       time values.
