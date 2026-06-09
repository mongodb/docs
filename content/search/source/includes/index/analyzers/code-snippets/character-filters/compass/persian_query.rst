.. io-code-block:: 
   :copyable: true 

   .. input:: 
      :language: json 
      :linenos: 

      db.minutes.aggregate([
        {
          "$search": {
            "text": {
              "query": "صحبت",
              "path": "text.fa_IR"
            }
          }
        },
        {
          "$project": {
            "_id": 1,
            "text.fa_IR": 1,
            "page_updated_by.last_name": 1
          }
        }
      ])

   .. output::
      :language: js
      :visible: false

      [
        {
          _id: 2,
          page_updated_by: { last_name: 'OHRBACH' },
          text: { fa_IR: 'ابتدا رئیس بخش فروش صحبت کرد' }
        }
      ]
