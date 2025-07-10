When you use Natural Language Charts, |charts| sends the following information
to MongoDB's backend and/or the third-party AI provider:

- The full text of your natural language prompt.
- The schema of the collection used to generate the chart,
  including collection names, field names, and field data types.
- Sample field values to improve the quality of chart recommendations.

The information sent will not be shared with any other third parties 
or stored by the AI provider. We do not share database connection 
strings or database credentials. By default, your original 
query text will be stored by MongoDB for up to one year to help us 
provide support to customers and improve the service. 
