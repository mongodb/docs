To run the query in {+mongosh+}:

.. io-code-block::
   :copyable: true

   .. input:: /includes/fts/sort/date-tutorial-shell.js
      :language: js
      :linenos:

   .. output::
      :language: json
      :visible: false
      
      [
        {
          title: 'Summer Nights',
          released: ISODate("2015-01-28T00:00:00.000Z"),
          score: 0.348105788230896
        },
        {
          title: 'Summertime',
          released: ISODate("2014-08-01T00:00:00.000Z"),
          score: 0.5917375683784485
        },
        {
          title: 'Summer of Blood',
          released: ISODate("2014-04-17T00:00:00.000Z"),
          score: 0.9934720396995544
        },
        {
          title: 'Summer Games',
          released: ISODate("2012-02-08T00:00:00.000Z"),
          score: 0.15982933342456818
        },
        {
          title: 'Summer of Goliath',
          released: ISODate("2011-07-08T00:00:00.000Z"),
          score: 0.13038821518421173
        }
      ]

