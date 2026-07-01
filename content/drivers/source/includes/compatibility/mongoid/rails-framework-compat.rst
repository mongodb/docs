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
     -
     - Depends directly on Active Record.

   * - ``ActionMailer``
     - ✓
     - 

   * - ``ActionPack``
     - ✓
     - 

   * - ``ActionText``
     -
     - Depends directly on Active Record.

   * - ``ActionView``
     - ✓
     - 

   * - ``ActiveJob``
     - ✓
     - Serialize ``BSON::ObjectId`` values as strings and reconstitute
       them inside the job. To learn more, see `ActiveJob
       <https://www.mongodb.com/docs/mongoid/current/integrations-tools/rails-integration/#mongoid-rails-activejob>`__.

   * - ``ActiveModel``
     - ✓
     - The ``Mongoid::Document`` module includes
       ``ActiveModel::Model`` and leverages ``ActiveModel::Validations``
       for `Document Validation <https://www.mongodb.com/docs/mongoid/current/data-modeling/validation/>`__.

   * - ``ActiveRecord``
     - ✓
     - Mongoid is an alternative to Active Record. You can run both in
       the same application.

   * - ``ActiveStorage``
     -
     - Depends directly on Active Record.

   * - ``ActiveSupport``
     - ✓
     - The ``Mongoid`` module requires ``ActiveSupport``.
       ``Mongoid`` uses ``ActiveSupport::TimeWithZone`` for handling
       time values.
