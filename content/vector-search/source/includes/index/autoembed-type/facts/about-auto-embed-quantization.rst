Automated Embedding supports a variety of quantization methods. By default,
it uses ``scalar`` quantization. 

``float`` Quantization
~~~~~~~~~~~~~~~~~~~~~~

``float`` quantization stores the vector embeddings as 32-bit float values. 
This option provides the highest accuracy, but also the highest storage and 
RAM costs. By default, Automated Embedding uses 
``dotProduct`` as the similarity function for this quantization type.

.. _avs-scalar-quantization:

``scalar`` Quantization 
~~~~~~~~~~~~~~~~~~~~~~~

The ``scalar`` quantization type in Automated Embedding builds 
index with **scalar/int8 (1 byte) vectors**, which are provided by the 
embedding model. For Automated Embedding, this quantization 
reduces the vector embedding's storage and RAM cost to about one 
fourth compared the ``float`` quantization. By default, Automated Embedding uses 
``dotProduct`` as the similarity function for this quantization type.
This is the default quantization type for Automated Embedding.

.. _mdb-vs-binary-quantization:

``binary`` Quantization
~~~~~~~~~~~~~~~~~~~~~~~

Binary quantization in Automated Embedding builds index with binary (1 
bit) vector values, but also stores full-precision vectors. The 
full-precision vectors are provided by the embedding model and 
{+avs+} quantizes them to binary during index creation. 

{+avs+} rescoring involves re-ranking a subset of the top binary vector search 
results using their full-precision counterparts to ensure accurate search 
results from compressed vectors. This reduces the RAM cost to one 
twenty-fourth (``1/24``) compared to ``float`` quantization type. By 
default, Automated Embedding uses ``euclidean`` as the :ref:`similarity function 
<avs-similarity-functions>`.

.. _avs-binary-no-rescore-quantization:

``binaryNoRescore`` Quantization
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``binaryNoRescore`` quantization type in Automated Embedding builds 
index with binary (1 bit) vector values, which are provided by the 
embedding model. Compared to ``binary`` (binary quantization with rescoring), 
this option ensures faster query and lowers storage costs, but provides 
lower accuracy. By default, Automated Embedding uses ``euclidean`` as the :ref:`similarity 
function <avs-similarity-functions>`.
