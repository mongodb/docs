{+avs+} supports automatic quantization of your float vector
embeddings (both 32-bit and 64-bit). 

Quantization is the process of shrinking full-fidelity vectors into
fewer bits. It reduces the amount of main memory required to store each
vector in a {+avs+} index by indexing the reduced representation
vectors instead. This allows for storage of more vectors or vectors with
higher dimensions. Therefore, quantization reduces resource 
consumption and improves speed. We recommend quantization for
applications with a large number of vectors, such as over 100,000.  

.. _avs-scalar-quantization:

Scalar Quantization 
~~~~~~~~~~~~~~~~~~~

:term:`Scalar quantization <scalar quantization>` involves first
identifying the minimum and maximum values for each dimension of the
indexed vectors to establish a range of values for a dimension. Then,
the range is divided into equally sized intervals or bins. Finally, each
float value is mapped to a bin to convert the continuous float values
into discrete integers. In {+avs+}, this quantization reduces the vector
embedding's RAM cost to about one fourth (``1/3.75``) of the
pre-quantization cost.  

.. _avs-binary-quantization:

Binary Quantization 
~~~~~~~~~~~~~~~~~~~

Binary quantization involves assuming a
midpoint of ``0`` for each dimension, which is typically appropriate for
embeddings normalized to length ``1`` such as  OpenAI's 
``text-embedding-3-large``. Then, each value in the vector is
compared to the midpoint and assigned a binary value of ``1`` if it's
greater than the midpoint and a binary value of ``0`` if it's less than
or equal to the midpoint. In {+avs+}, this quantization reduces the
vector embedding's RAM cost to one twenty-fourth (``1/24``) of the
pre-quantization cost. The reason it's not ``1/32`` is because the data
structure containing the |hnsw| graph itself, separate from the vector
values, isn't compressed.

When you run a query, {+avs+} converts the float value in the query
vector into a binary vector using the same midpoint for efficient
comparison between the query vector and indexed binary vectors. It then
rescores by reevaluating the identified candidates in the binary
comparison using the original float values associated with those results
from the binary index to further refine the results. The full fidelity
vectors are stored in their own data structure on disk, and are only 
referenced during rescoring when you configure binary quantization or
when you perform exact search against either binary or scalar quantized
vectors.  

.. note:: 

   Binary quantization is currently not supported for nested vector indexes. Use 
   ``scalar`` quantization instead or don't specify any quantization type.