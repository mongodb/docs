.. step:: Load and prepare the sample data.

   This tutorial uses a sample dataset that contains text from
   a variety of how-to articles. This dataset
   is available on the `Hugging Face dataset library 
   <https://huggingface.co/datasets/MongoDB/cosmopedia-wikihow-chunked>`__
   for easy access to the data from your application.

   Paste and run the following code in your notebook. This code 
   does the following:

   - Loads the dataset from the Hugging Face dataset library.
   - Keeps only the first 100 entries of the dataset.
   - Converts the dataset to a `pandas <https://pandas.pydata.org>`__ DataFrame
     so you can easily process the data.
   - Filters the data for non-null entries.

   .. code-block:: python

      from datasets import load_dataset
      import pandas as pd

      # Load the dataset without downloading it fully
      data = load_dataset("MongoDB/cosmopedia-wikihow-chunked", split="train", streaming=True)
      data_head = data.take(100)

      # Create the DataFrame
      df = pd.DataFrame(data_head)

      # Only keep entries where the text field is not null
      df = df[df["text"].notna()]

      # Preview contents of the data
      df.head()
