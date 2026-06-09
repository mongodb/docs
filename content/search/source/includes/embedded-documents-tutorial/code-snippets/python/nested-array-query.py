import pymongo

# connect to your Atlas cluster
client = pymongo.MongoClient('<connection-string>')

# define pipeline
pipeline = [
  {
    '$search': {
      'index': 'embedded-documents-tutorial', 
      'embeddedDocument': {
        'path': 'teachers', 
        'operator': {
          'compound': {
            'must': [
              {
                'embeddedDocument': {
                  'path': 'teachers.classes', 
                  'operator': {
                    'compound': {
                      'must': [
                        {
                          'text': {
                            'path': 'teachers.classes.grade', 
                            'query': '12th'
                          }
                        }, {
                          'text': {
                            'path': 'teachers.classes.subject', 
                            'query': 'science'
                          }
                        }
                      ]
                    }
                  }
                }
              }
            ], 
            'should': [
              {
                'text': {
                  'path': 'teachers.last', 
                  'query': 'smith'
                }
              }
            ]
          }
        }
      }, 
      'highlight': {
        'path': 'teachers.classes.subject'
      }
    }
  }, {
    '$project': {
      '_id': 1, 
      'teachers': 1, 
      'score': {
        '$meta': 'searchScore'
      }, 
      'highlights': {
        '$meta': 'searchHighlights'
      }
    }
  }
]

# run pipeline
result = client['local_school_district']['schools'].aggregate(pipeline)

# print results
for i in result:
    print(i)
