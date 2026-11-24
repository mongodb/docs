.. list-table::
   :widths: 15 15 5 65
   :header-rows: 1

   * - Parameter
     - Type
     - Required
     - Description
     
   * - ``inputs``
     - Array of Objects or Array of Arrays
       (``List[dict]`` or
       ``List[List[Union[str, PIL.Image.Image, voyageai.video_utils.Video]]]``)
     - Yes
     - List of multimodal inputs to vectorize.

       Each input is a sequence of text, images, and video, which can be
       represented in one of the following ways:

       - A dictionary that contains a single key ``"content"``,
         whose value represents a sequence of text, images, and video. The
         dictionary schema is identical to that of an input in the
         ``inputs`` parameter of the REST API.

       - A list containing text strings, image objects, or video
         objects (``List[Union[str, PIL.Image.Image, voyageai.video_utils.Video]]``),
         where each image is an instance of the Pillow Image class. 
         For example: ``["This is a banana.",
         PIL.Image.open("banana.jpg"), voyageai.video_utils.Video.from_path("banana.mp4",
         model="voyage-multimodal-3.5")]``.

         Only ``voyage-multimodal-3.5`` supports video inputs. When you
         create a ``Video`` object with ``Video.from_path()``, you must
         pass the model name.

       The following constraints apply to the ``inputs`` list:

       - The list must not contain more than 1,000 inputs.
       - Each image must not contain more than 16 million pixels or be
         larger than 20 MB in size.
       - Each video must not be larger than 20 MB in size.
       - With every 560 pixels of an image or every 1120 pixels of a
         video being counted as a token, each input in the list must not
         exceed 32,000 tokens, and the total number of tokens across all
         inputs must not exceed 320,000.

   * - ``model``
     - String
     - Yes
     - Name of the model. Accepted values are ``voyage-multimodal-3.5``
       (recommended) and ``voyage-multimodal-3``.

   * - ``input_type``
     - String
     - No
     - .. include:: /includes/tables/shared/input-type-description.rst

   * - ``truncation``
     - Boolean
     - No
     - .. include:: /includes/tables/shared/truncation-description.rst

       If the truncation happens in the middle of an image, the
       entire image is discarded.