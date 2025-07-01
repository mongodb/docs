.. procedure:: 
   :style: normal

   .. step:: Connect to your {+cluster+} in {+mongosh+}.

      Open {+mongosh+} in a terminal window and connect to your 
      {+cluster+}. For detailed instructions on connecting, see 
      :ref:`connect-mongo-shell`.

   .. step:: Switch to the ``sample_training`` database.

      Run the following command at {+mongosh+} prompt:

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: sh

            use sample_training 

         .. output:: 
            :language: sh 

            switched to db sample_training

   .. step:: Run the following :pipeline:`$unionWith` with an |fts| :pipeline:`$search` query.

      .. include:: /includes/fts/extracts/search-with-unionwith-query-desc.rst

      .. tabs:: 

         .. tab:: Basic Example 
            :tabid: basic

            .. include:: /includes/fts/extracts/search-with-unionwith-basic-query-desc.rst

            .. io-code-block::
               :copyable: true 

               .. input:: 
                  :language: json

                  db.companies.aggregate([
                  {
                    "$search": {
                      "text": {
                        "query": "Mobile", 
                        "path": "name"
                      }
                    }
                  }, {
                    "$project": {
                      "score": {
                        "$meta": "searchScore"
                      },
                      "_id": 0,
                      "number_of_employees": 1,
                      "founded_year": 1,
                      "name": 1
                    }
                  }, {
                    "$set": {
                      "source": "companies"
                    }
                  }, {
                    "$limit": 3
                  }, {
                    "$unionWith": {
                      "coll": "inspections", 
                      "pipeline": [
                        {
                          "$search": {
                            "text": {
                              "query": "Mobile", 
                              "path": "business_name"
                            }
                          }
                        }, {
                          "$set": {
                            "source": "inspections"
                          }
                        }, {
                          "$project": {
                            "score": {
                              "$meta": "searchScore"
                            }, 
                            "source": 1,
                            "_id": 0,
                            "business_name": 1,
                            "address": 1
                          }
                        },  {
                          "$limit": 3
                        }, {
                          "$sort": {
                            "score": -1
                          }
                        }
                      ]
                    }
                  }
                  ])

               .. output::
                  :language: json

                  [
                    {
                      name: 'XLR8 Mobile',
                      number_of_employees: 21,
                      founded_year: 2006,
                      score: 2.0815043449401855,
                      source: 'companies'
                    },
                    {
                      name: 'Pulse Mobile',
                      number_of_employees: null,
                      founded_year: null,
                      score: 2.0815043449401855,
                      source: 'companies'
                    },
                    {
                      name: 'T-Mobile',
                      number_of_employees: null,
                      founded_year: null,
                      score: 2.0815043449401855,
                      source: 'companies'
                    },
                    {
                      business_name: 'T. MOBILE',
                      address: { city: 'BROOKLYN', zip: 11209, street: '86TH ST', number: 440 },
                      score: 2.900916337966919,
                      source: 'inspections'
                    },
                    {
                      business_name: 'BOOST MOBILE',
                      address: { city: 'BRONX', zip: 10458, street: 'E FORDHAM RD', number: 261 },
                      score: 2.900916337966919,
                      source: 'inspections'
                    },
                    {
                      business_name: 'SPRING MOBILE',
                      address: {
                        city: 'SOUTH RICHMOND HILL',
                        zip: 11419,
                        street: 'LIBERTY AVE',
                        number: 12207
                      },
                      score: 2.900916337966919,
                      source: 'inspections'
                    }
                  ]

         .. tab:: Facet Example 
            :tabid: facet 

            .. include:: /includes/fts/extracts/search-with-unionwith-facet-query-desc.rst

            .. io-code-block::
               :copyable: true 

               .. input:: 
                  :language: json

                  db.companies.aggregate([
                  {
                    "$search": {
                      "text": {
                        "query": "mobile", 
                        "path": "name", 
                        "score": {
                          "boost": {
                            "value": 1.6
                          }
                        }
                      }
                    }
                  }, {
                    "$project": {
                      "score": {
                        "$meta": "searchScore"
                      },
                      "_id": 0,
                      "number_of_employees": 1,
                      "founded_year": 1,
                      "name": 1
                    }
                  }, {
                    "$addFields": {
                      "source": "companies", 
                      "source_count": "$$SEARCH_META.count.lowerBound"
                    }
                  }, {
                    "$limit": 3
                  }, {
                    "$unionWith": {
                      "coll": "inspections", 
                      "pipeline": [
                        {
                          "$search": {
                            "text": {
                              "query": "mobile", 
                              "path": "business_name"
                            }
                          }
                        }, {
                          "$project": {
                            "score": {
                              "$meta": "searchScore"
                            }, 
                            "business_name": 1, 
                            "address": 1,
                            "_id": 0
                          }
                        }, {
                          "$limit": 3
                        }, {
                          "$set": {
                            "source": "inspections", 
                            "source_count": "$$SEARCH_META.count.lowerBound"
                          }
                        }, {
                          "$sort": {
                            "score": -1
                          }
                        }
                      ]
                    }
                  }, {
                    "$facet": {
                      "allDocs": [], 
                      "totalCount": [
                        {
                          "$group": {
                            "_id": "$source", 
                            "firstCount": {
                              "$first": "$source_count"
                            }
                          }
                        }, {
                          "$project": {
                            "totalCount": {
                              "$sum": "$firstCount"
                            }
                          }
                        }
                      ]
                    }
                  }               
                  ])

               .. output::
                  :language: json

                  [
                    {
                      allDocs: [
                        {
                          name: 'XLR8 Mobile',
                          number_of_employees: 21,
                          founded_year: 2006,
                          score: 3.33040714263916,
                          source: 'companies',
                          source_count: Long("52")
                        },
                        {
                          name: 'Pulse Mobile',
                          number_of_employees: null,
                          founded_year: null,
                          score: 3.33040714263916,
                          source: 'companies',
                          source_count: Long("52")
                        },
                        {
                          name: 'T-Mobile',
                          number_of_employees: null,
                          founded_year: null,
                          score: 3.33040714263916,
                          source: 'companies',
                          source_count: Long("52")
                        },
                        {
                          business_name: 'T. MOBILE',
                          address: {
                            city: 'BROOKLYN',
                            zip: 11209,
                            street: '86TH ST',
                            number: 440
                          },
                          score: 2.900916337966919,
                          source: 'inspections',
                          source_count: Long("456")
                        },
                        {
                          business_name: 'BOOST MOBILE',
                          address: {
                            city: 'BRONX',
                            zip: 10458,
                            street: 'E FORDHAM RD',
                            number: 261
                          },
                          score: 2.900916337966919,
                          source: 'inspections',
                          source_count: Long("456")
                        },
                        {
                          business_name: 'SPRING MOBILE',
                          address: {
                            city: 'SOUTH RICHMOND HILL',
                            zip: 11419,
                            street: 'LIBERTY AVE',
                            number: 12207
                          },
                          score: 2.900916337966919,
                          source: 'inspections',
                          source_count: Long("456")
                        }
                      ],
                      totalCount: [
                        { _id: 'companies', totalCount: Long("52") },
                        { _id: 'inspections', totalCount: Long("456") }
                      ]
                    }
                  ]
