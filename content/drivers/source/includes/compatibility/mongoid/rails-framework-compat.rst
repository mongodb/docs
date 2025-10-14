Mongoid is compatible with many of the frameworks that constitute Ruby on Rails.
In this section, you can learn about which frameworks you can use with Mongoid.

Mongoid attempts to offer API compatibility with `Active Record
<https://guides.rubyonrails.org/active_record_basics.html>`__, but libraries
that depend directly on Active Record might not work as expected if you
use Mongoid as a direct replacement.

.. note::

   You can use Mongoid alongside Active Record within the same
   application.

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :class: compatibility-large
   :widths: 20 20 60

   * - Rails Framework
     - Mongoid Support
     - Notes

   * - ``ActionCable``
     - ✓
     -  There is no MongoDB adapter for ``ActionCable``, but you can
        use any existing adapter, such as the `Redis Adapter
        <https://guides.rubyonrails.org/action_cable_overview.html#redis-adapter>`__,
        alongside Mongoid models.

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
     - Serialization of BSON and Mongoid objects works best if you
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
       for `Document Validation <https://www.mongodb.com/docs/mongoid/current/data-modeling/validation/>`__.

   * - ``ActiveStorage``
     - *Unsupported*
     - Depends directly on Active Record.

   * - ``ActiveSupport``
     - ✓
     - The ``Mongoid`` module requires ``ActiveSupport``.
       ``Mongoid`` uses ``ActiveSupport::TimeWithZone`` for handling
       time values.
