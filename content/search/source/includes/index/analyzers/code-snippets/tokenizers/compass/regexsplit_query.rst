.. io-code-block::
   :copyable: true

   .. input::
      :language: json
      :linenos: 

      db.minutes.aggregate([
        {
          "$search": {
            "text": {
              "query": "9870",
              "path": "page_updated_by.phone"
            }
          }
        },
        {
          "$project": {
            "_id": 1,
            "page_updated_by.phone": 1
          }
        }
      ])

   .. output::
      :language: js
      :visible: false

      { _id: 3, page_updated_by: { phone: '(123).456.9870' }