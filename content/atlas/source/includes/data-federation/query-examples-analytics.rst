Find users who have purchased ``Commodity`` with a limit of 
``10000``. Limit the number of documents returned to ``3``: 

.. io-code-block::
   :copyable: true
      
   .. input:: 
      :language:  json
      :linenos:

      db.accounts.find({"limit": {$eq: 10000}, "products": "Commodity"}).limit(3)

   .. output:: 
      :language: json
      :linenos:

      {
	      "_id" : ObjectId("5ca4bbc7a2dd94ee5816238d"),
	      "account_id" : 557378,
	      "limit" : 10000,
	      "products" : [
		      "InvestmentStock",
		      "Commodity",
		      "Brokerage",
		      "CurrencyService"
	      ]
      }
      {
	      "_id" : ObjectId("5ca4bbc7a2dd94ee58162390"),
	      "account_id" : 278603,
	      "limit" : 10000,
	      "products" : [
		      "Commodity",
		      "InvestmentStock"
	      ]
      }
      {
	      "_id" : ObjectId("5ca4bbc7a2dd94ee5816239b"),
	      "account_id" : 870466,
	      "limit" : 10000,
	      "products" : [
		      "Derivatives",
		      "Brokerage",
		      "Commodity",
		      "InvestmentStock"
	      ]
      }
   
Find customers whose birthdate is before ``1990-01-01`` and limit the number of documents returned to ``5``: 

.. io-code-block::
   :copyable: true
      
   .. input:: 
      :language:  json
      :linenos:

      db.customers.find({"birthdate": {$lt: ISODate("1990-01-01T22:15:34.000+00:00")}}, {"name": 1, "birthdate": 1, "email": 1}).limit(5)

   .. output:: 
      :language: json
      :linenos:

      {
	      "_id" : ObjectId("5ca4bbcea2dd94ee58162a6a"),
	      "name" : "Katherine David",
	      "birthdate" : ISODate("1988-06-20T22:15:34Z"),
	      "email" : "timothy78@hotmail.com"
      }
      {
	      "_id" : ObjectId("5ca4bbcea2dd94ee58162a6c"),
	      "name" : "Brad Cardenas",
	      "birthdate" : ISODate("1977-05-06T21:57:35Z"),
	      "email" : "dustin37@yahoo.com"
      }
      {
	      "_id" : ObjectId("5ca4bbcea2dd94ee58162a74"),
	      "name" : "Dr. Angela Brown",
	      "birthdate" : ISODate("1977-06-19T20:35:52Z"),
	      "email" : "michaelespinoza@gmail.com"
      }
      {
	      "_id" : ObjectId("5ca4bbcea2dd94ee58162a76"),
	      "name" : "Lauren Clark",
	      "birthdate" : ISODate("1980-10-28T16:25:59Z"),
	      "email" : "briannafrost@yahoo.com"
      }
      {
	      "_id" : ObjectId("5ca4bbcea2dd94ee58162a77"),
	      "name" : "Jacqueline Haynes",
	      "birthdate" : ISODate("1982-09-01T07:12:57Z"),
	      "email" : "virginia36@hotmail.com"
      }

Find transaction details for user whose account ID is ``557378`` 
and use the :pipeline:`$sort` stage to sort on the 
``transactions.symbol`` field:

.. io-code-block::
   :copyable: true
      
   .. input:: 
      :language:  json
      :linenos:

      db.accounts.aggregate([ { $match: {"account_id": 557378}},{$sort: {"transactions.symbol": -1}} ])

   .. output:: 
      :language: json
      :linenos:

      { 
        "_id" : ObjectId("5ca4bbc7a2dd94ee5816238d"), 
        "account_id" : 557378, 
        "limit" : 10000, 
        "products" : [ "InvestmentStock", "Commodity", "Brokerage", "CurrencyService" ] 
      }
