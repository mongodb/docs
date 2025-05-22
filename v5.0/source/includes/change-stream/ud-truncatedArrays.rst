.. _|idref|-ud-truncatedArrays:
 
An array of documents which record array truncations performed
with pipeline-based updates using one or more of the following
stages:

* :pipeline:`$addFields`
* :pipeline:`$set`
* :pipeline:`$replaceRoot`
* :pipeline:`$replaceWith`

If the entire array is replaced, the truncations will be
reported under :ref:`updateDescription.updatedFields 
<|idref|-ud-updatedFields>`.

