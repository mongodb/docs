.. procedure::
   :style: normal
      
   .. step:: (Conditional) Define the functions to generate |bson| embeddings.

      If you haven't already loaded the ``get_embedding``,
      ``generate_bson_vector``, and ``create_docs_with_bson_vector_embeddings``
      functions in your notebook, see :ref:`define-embedding-functions`
      to load these functions in your notebook.

   .. step:: Load the sample data.

      Paste and run the following code in your notebook:

      .. code-block:: python

         # Sample data
         sentences = [
          "Titanic: The story of the 1912 sinking of the largest luxury liner ever built",
          "The Lion King: Lion cub and future king Simba searches for his identity",
          "Avatar: A marine is dispatched to the moon Pandora on a unique mission",
          "Inception: A skilled thief is given a chance at redemption if he can successfully implant an idea into a person's subconscious.",
          "The Godfather: The aging patriarch of a powerful crime family transfers control of his empire to his reluctant son.",
          "Forrest Gump: A man with a low IQ recounts several decades of extraordinary events in his life.",
          "Jurassic Park: Scientists clone dinosaurs to populate an island theme park, which soon goes awry.",
          "The Matrix: A hacker discovers the true nature of reality and his role in the war against its controllers.",
          "Star Wars: A young farm boy is swept into the struggle between the Rebel Alliance and the Galactic Empire.",
          "The Shawshank Redemption: A banker is sentenced to life in Shawshank State Penitentiary for the murders of his wife and her lover.",
          "Indiana Jones and the Last Crusade: An archaeologist pursues the Holy Grail while confronting adversaries from the past.",
          "The Dark Knight: Batman faces a new menace, the Joker, who plunges Gotham into anarchy.",
          "Back to the Future: A teenager accidentally travels back in time and must ensure his parents fall in love.",
          "The Silence of the Lambs: A young FBI agent seeks the help of an incarcerated cannibalistic killer to catch another serial killer.",
          "E.T. the Extra-Terrestrial: A young boy befriends an alien stranded on Earth and helps him return home.",
          "Saving Private Ryan: During WWII, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
          "Gladiator: A once-powerful Roman general seeks vengeance against the corrupt emperor who betrayed his family.",
          "Rocky: A small-time boxer gets a once-in-a-lifetime chance to fight the world heavyweight champion.",
          "Pirates of the Caribbean: Jack Sparrow races to recover the heart of Davy Jones to escape eternal servitude.",
          "Schindler's List: The true story of a man who saved hundreds of Jews during the Holocaust by employing them in his factory."
        ]

   .. step:: Generate the embeddings for your data.
            
      Use the following code to generate embeddings from new data.

      Specifically, this code uses the ``get_embedding`` function 
      that you defined and the :driver:`PyMongo Driver </pymongo/>` to
      generate embeddings from an array of sample texts. 
         
      .. io-code-block:: 
         :copyable: true
         
         .. input:: 
            :language: python

            import pymongo
            from sentence_transformers.quantization import quantize_embeddings

            float32_embeddings = get_embedding(sentences, precision="float32")
            int8_embeddings = get_embedding(sentences, precision="int8")
            int1_embeddings = get_embedding(sentences, precision="ubinary")

            # Print stored embeddings
            print("Generated embeddings stored in different variables:")
            for i, text in enumerate(sentences):
                print(f"\nText: {text}")
                print(f"Float32 Embedding: {float32_embeddings[i][:3]}... (truncated)")
                print(f"Int8 Embedding: {int8_embeddings[i][:3]}... (truncated)")
                print(f"Ubinary Embedding: {int1_embeddings[i][:3]}... (truncated)")

         .. output:: 
            :language: shell
            :visible: false

            Generated embeddings stored in different variables:

            Text: Titanic: The story of the 1912 sinking of the largest luxury liner ever built
            Float32 Embedding: [-0.01089042  0.05926645 -0.00291325]... (truncated)
            Int8 Embedding: [-15 127  56]... (truncated)
            Ubinary Embedding: [ 77  30 209]... (truncated)

            Text: The Lion King: Lion cub and future king Simba searches for his identity
            Float32 Embedding: [-0.05607051 -0.01360618  0.00523855]... (truncated)
            Int8 Embedding: [-128 -109  110]... (truncated)
            Ubinary Embedding: [ 37  18 151]... (truncated)

            Text: Avatar: A marine is dispatched to the moon Pandora on a unique mission
            Float32 Embedding: [-0.0275258   0.01144342 -0.02360895]... (truncated)
            Int8 Embedding: [-57 -28 -79]... (truncated)
            Ubinary Embedding: [ 76  16 144]... (truncated)

            Text: Inception: A skilled thief is given a chance at redemption if he can successfully implant an idea into a person's subconscious.
            Float32 Embedding: [-0.01759741  0.03254957 -0.02090798]... (truncated)
            Int8 Embedding: [-32  40 -61]... (truncated)
            Ubinary Embedding: [ 77  27 176]... (truncated)

            Text: The Godfather: The aging patriarch of a powerful crime family transfers control of his empire to his reluctant son.
            Float32 Embedding: [ 0.00503172  0.04311579 -0.00074904]... (truncated)
            Int8 Embedding: [23 74 70]... (truncated)
            Ubinary Embedding: [215  26 145]... (truncated)

            Text: Forrest Gump: A man with a low IQ recounts several decades of extraordinary events in his life.
            Float32 Embedding: [0.02349479 0.05669326 0.00458773]... (truncated)
            Int8 Embedding: [ 69 118 105]... (truncated)
            Ubinary Embedding: [237 154 159]... (truncated)

            Text: Jurassic Park: Scientists clone dinosaurs to populate an island theme park, which soon goes awry.
            Float32 Embedding: [-0.03294644  0.02671233 -0.01864981]... (truncated)
            Int8 Embedding: [-70  21 -47]... (truncated)
            Ubinary Embedding: [ 77  90 146]... (truncated)

            Text: The Matrix: A hacker discovers the true nature of reality and his role in the war against its controllers.
            Float32 Embedding: [-0.02489671  0.02847196 -0.00290637]... (truncated)
            Int8 Embedding: [-50  27  56]... (truncated)
            Ubinary Embedding: [ 95 154 129]... (truncated)

            Text: Star Wars: A young farm boy is swept into the struggle between the Rebel Alliance and the Galactic Empire.
            Float32 Embedding: [-0.01235448  0.01524397 -0.01063425]... (truncated)
            Int8 Embedding: [-19 -15   5]... (truncated)
            Ubinary Embedding: [ 68  26 210]... (truncated)

            Text: The Shawshank Redemption: A banker is sentenced to life in Shawshank State Penitentiary for the murders of his wife and her lover.
            Float32 Embedding: [ 0.04665203  0.01392298 -0.01743002]... (truncated)
            Int8 Embedding: [127 -20 -39]... (truncated)
            Ubinary Embedding: [207  88 208]... (truncated)

            Text: Indiana Jones and the Last Crusade: An archaeologist pursues the Holy Grail while confronting adversaries from the past.
            Float32 Embedding: [0.00929601 0.04206405 0.00701248]... (truncated)
            Int8 Embedding: [ 34  71 121]... (truncated)
            Ubinary Embedding: [228  90 130]... (truncated)

            Text: The Dark Knight: Batman faces a new menace, the Joker, who plunges Gotham into anarchy.
            Float32 Embedding: [-0.01451324 -0.00897367  0.0077793 ]... (truncated)
            Int8 Embedding: [-24 -94 127]... (truncated)
            Ubinary Embedding: [ 57 150  32]... (truncated)

            Text: Back to the Future: A teenager accidentally travels back in time and must ensure his parents fall in love.
            Float32 Embedding: [-0.01458643  0.03639758 -0.02587282]... (truncated)
            Int8 Embedding: [-25  52 -94]... (truncated)
            Ubinary Embedding: [ 78 218 216]... (truncated)

            Text: The Silence of the Lambs: A young FBI agent seeks the help of an incarcerated cannibalistic killer to catch another serial killer.
            Float32 Embedding: [-0.00205381 -0.00039482 -0.01630799]... (truncated)
            Int8 Embedding: [  6 -66 -31]... (truncated)
            Ubinary Embedding: [  9  82 154]... (truncated)

            Text: E.T. the Extra-Terrestrial: A young boy befriends an alien stranded on Earth and helps him return home.
            Float32 Embedding: [ 0.01105334  0.00776658 -0.03092942]... (truncated)
            Int8 Embedding: [  38  -40 -128]... (truncated)
            Ubinary Embedding: [205  24 146]... (truncated)

            Text: Saving Private Ryan: During WWII, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.
            Float32 Embedding: [ 0.00266668 -0.01926583 -0.00727963]... (truncated)
            Int8 Embedding: [  17 -128   27]... (truncated)
            Ubinary Embedding: [148  82 194]... (truncated)

            Text: Gladiator: A once-powerful Roman general seeks vengeance against the corrupt emperor who betrayed his family.
            Float32 Embedding: [-0.00031873 -0.01352339 -0.02882693]... (truncated)
            Int8 Embedding: [  10 -109 -114]... (truncated)
            Ubinary Embedding: [ 12  26 144]... (truncated)

            Text: Rocky: A small-time boxer gets a once-in-a-lifetime chance to fight the world heavyweight champion.
            Float32 Embedding: [ 0.00957429  0.01855557 -0.02353773]... (truncated)
            Int8 Embedding: [ 34  -5 -79]... (truncated)
            Ubinary Embedding: [212  18 144]... (truncated)

            Text: Pirates of the Caribbean: Jack Sparrow races to recover the heart of Davy Jones to escape eternal servitude.
            Float32 Embedding: [-0.01787405  0.03672816 -0.00972007]... (truncated)
            Int8 Embedding: [-33  53  11]... (truncated)
            Ubinary Embedding: [ 68 154 145]... (truncated)

            Text: Schindler's List: The true story of a man who saved hundreds of Jews during the Holocaust by employing them in his factory.
            Float32 Embedding: [-0.03515214 -0.00503571  0.00183181]... (truncated)
            Int8 Embedding: [-76 -81  87]... (truncated)
            Ubinary Embedding: [ 35 222 152]... (truncated)

   .. step:: Generate the |bson| vectors from your embeddings. 

      Use the following code to convert the generated vector embeddings to
      |bson| vectors. The code uses the :driver:`PyMongo driver <pymongo/>`. 

      Specifically, this code converts the generated embeddings to
      ``float32``, ``int8``, and bit-packed ``int1`` types and then
      quantizes the ``float32``, ``int8``, and ``int1`` vectors.

      .. io-code-block:: 
         :copyable: true
         
         .. input:: 
            :language: python
    
            from bson.binary import Binary, BinaryVectorDtype

            bson_float32_embeddings = []
            bson_int8_embeddings = []
            bson_int1_embeddings = []

            # Convert each embedding to BSON
            for (f32_emb, int8_emb, int1_emb) in zip(float32_embeddings, int8_embeddings, int1_embeddings):
                bson_float32_embeddings.append(generate_bson_vector(f32_emb, BinaryVectorDtype.FLOAT32))
                bson_int8_embeddings.append(generate_bson_vector(int8_emb, BinaryVectorDtype.INT8))
                bson_int1_embeddings.append(generate_bson_vector(int1_emb, BinaryVectorDtype.PACKED_BIT))

            # Print the embeddings
            for idx, text in enumerate(sentences):
                print(f"\nText: {text}")
                print(f"Float32 BSON: {bson_float32_embeddings[idx]}")
                print(f"Int8 BSON: {bson_int8_embeddings[idx]}")
                print(f"Int1 BSON: {bson_int1_embeddings[idx]}")

         .. output:: 
            :language: shell
            :visible: false

            Text: Titanic: The story of the 1912 sinking of the largest luxury liner ever built
            Float32 BSON: b'\'\x00\xbam2\xbc`\xc1r=7\xec>\xbb\xe6\xf3\x...'
            Int8 BSON: b'\x03\x00\xf1\x7f8\xdf\xfeC\x1e>\xef\xd6\xf5\x9...'
            Int1 BSON: b'\x10\x00M\x1e\xd1\xd2\x05\xaeq\xdf\x9a\x1d\xbc...'

            Text: The Lion King: Lion cub and future king Simba searches for his identity
            Float32 BSON: b'\'\x001\xaae\xbdr\xec^\xbc"\xa8\xab;\x91\xd...'
            Int8 BSON: b'\x03\x00\x80\x93n\x06\x80\xca\xd3.\xa2\xe3\xd1...'
            Int1 BSON: b'\x10\x00%\x12\x97\xa6\x8f\xdf\x89\x9d2\xcb\x99...'

            Text: Avatar: A marine is dispatched to the moon Pandora on a unique mission
            Float32 BSON: b'\'\x00\xcc}\xe1\xbc-};<\x8eg\xc1\xbc\xcb\xd...'
            Int8 BSON: b'\x03\x00\xc7\xe4\xb1\xdf/\xe2\xd2\x90\xf7\x02|...'
            Int1 BSON: b'\x10\x00L\x10\x90\xb6\x0f\x8a\x91\xaf\x92|\xf9...'

            Text: Inception: A skilled thief is given a chance at redemption if he can successfully implant an idea into a person's subconscious.
            Float32 BSON: b'\'\x00o(\x90\xbc\xb3R\x05=8G\xab\xbc\xfb\xc...'
            Int8 BSON: b'\x03\x00\xe0(\xc3\x10*\xda\xfe\x19\xbf&<\xd1\x...'
            Int1 BSON: b'\x10\x00M\x1b\xb0\x86\rn\x93\xaf:w\x9f}\x92\xd...'

            Text: The Godfather: The aging patriarch of a powerful crime family transfers control of his empire to his reluctant son.
            Float32 BSON: b'\'\x00\x1d\xe1\xa4;0\x9a0=C[D\xba\xb5\xf2\x...'
            Int8 BSON: b'\x03\x00\x17JF2\xb9\xddZ8\xa1\x0c\xc6\x80\xd8$...'
            Int1 BSON: b'\x10\x00\xd7\x1a\x91\x87\x0e\xc9\x91\x8b\xba\x...'

            Text: Forrest Gump: A man with a low IQ recounts several decades of extraordinary events in his life.
            Float32 BSON: b'\'\x00#x\xc0<27h=\xb5T\x96;:\xc4\x9c\xbd\x1...'
            Int8 BSON: b'\x03\x00Evi\x80\x13\xd6\x1cCW\x80\x01\x9e\xe58...'
            Int1 BSON: b'\x10\x00\xed\x9a\x9f\x97\x1f.\x12\xf9\xba];\x7...'

            Text: Jurassic Park: Scientists clone dinosaurs to populate an island theme park, which soon goes awry.
            Float32 BSON: b'\'\x00\xd9\xf2\x06\xbd\xd2\xd3\xda<\x7f\xc7...'
            Int8 BSON: b'\x03\x00\xba\x15\xd1-\x0c\x03\xe6\xea\rQ\x1f\x...'
            Int1 BSON: b'\x10\x00MZ\x92\xb7#\xaa\x99=\x9a\x99\x9c|<\xf8...'

            Text: The Matrix: A hacker discovers the true nature of reality and his role in the war against its controllers.
            Float32 BSON: b'\'\x00/\xf4\xcb\xbc\t>\xe9<\xc9x>\xbb\xcc\x...'
            Int8 BSON: b'\x03\x00\xce\x1b815\xcf1\xc6s\xe5\n\xe4\x192G\...'
            Int1 BSON: b'\x10\x00_\x9a\x81\xa6\x0f\x0f\x93o2\xd8\xfe|\x...'

            Text: Star Wars: A young farm boy is swept into the struggle between the Rebel Alliance and the Galactic Empire.
            Float32 BSON: b'\'\x00sjJ\xbc\xd6\xc1y<I;.\xbc\xb1\x80\t\xb...'
            Int8 BSON: b'\x03\x00\xed\xf1\x05\xe2\xc7\xfa\xd4\xab5\xeb\...'
            Int1 BSON: b'\x10\x00D\x1a\xd2\x86\x0ey\x92\x8f\xaa\x89\x1c...'

            Text: The Shawshank Redemption: A banker is sentenced to life in Shawshank State Penitentiary for the murders of his wife and her lover.
            Float32 BSON: b'\'\x004\x16?=9\x1dd<g\xc9\x8e\xbc\xdf\x81\x...'
            Int8 BSON: b'\x03\x00\x7f\xec\xd9\xdc)\xd6)\x05\x18\x7f\xa6...'
            Int1 BSON: b"\x10\x00\xcfX\xd0\xb7\x0e\xcf\xd9\r\xf0U\xb4]6..."

            Text: Indiana Jones and the Last Crusade: An archaeologist pursues the Holy Grail while confronting adversaries from the past.
            Float32 BSON: b'\'\x00HN\x18<ZK,=\xf9\xc8\xe5;\x9e\xed\xa0\...'
            Int8 BSON: b'\x03\x00"Gy\x01\xeb\xec\xfc\x80\xe4a\x7f\x88\x...'
            Int1 BSON: b'\x10\x00\xe4Z\x82\xb6\xad\xec\x10-\x9a\x99;?j\...'

            Text: The Dark Knight: Batman faces a new menace, the Joker, who plunges Gotham into anarchy.
            Float32 BSON: b'\'\x00\xef\xc8m\xbcJ\x06\x13\xbcv\xe9\xfe;...'
            Int8 BSON: b'\x03\x00\xe8\xa2\x7fIE\xba\x9f\xfaT2\xf1\xc1\...'
            Int1 BSON: b'\x10\x009\x96 \xb7\x8e\xc9\x81\xaf\xaa\x9f\xa...'

            Text: Back to the Future: A teenager accidentally travels back in time and must ensure his parents fall in love.
            Float32 BSON: b'\'\x00\xee\xfbn\xbc\xa0\x15\x15=<\xf3\xd3x...'
            Int8 BSON: b'\x03\x00\xe74\xa2\xe5\x15\x165\xb9dM8C\xd7E\x...'
            Int1 BSON: b'\x10\x00N\xda\xd8\xb6\x03N\x98\xbd\xdaY\x1b| ...'

            Text: The Silence of the Lambs: A young FBI agent seeks the help of an incarcerated cannibalistic killer to catch another serial killer.
            Float32 BSON: b'\'\x002\x99\x06\xbb\x82\x00\xcf\xb9X\x98\x...'
            Int8 BSON: b'\x03\x00\x06\xbe\xe1.\x7f\x80\x04C\xd7e\x80\x...'
            Int1 BSON: b'\x10\x00\tR\x9a\xd6\x0c\xb1\x9a\xbc\x90\xf5\x...'

            Text: E.T. the Extra-Terrestrial: A young boy befriends an alien stranded on Earth and helps him return home.
            Float32 BSON: b'\'\x00\x14\x195<\xd4~\xfe;\xb3_\xfd\xbc \xe...'
            Int8 BSON: b'\x03\x00&\xd8\x80\x92\x01\x7f\xbfF\xd4\x10\xf0...'
            Int1 BSON: b'\x10\x00\xcd\x18\x92\x92\x8dJ\x92\xbd\x9a\xd3\...'

            Text: Saving Private Ryan: During WWII, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.
            Float32 BSON: b'\'\x00\x8a\xc3.;_\xd3\x9d\xbc\xf2\x89\xee\x...'
            Int8 BSON: b'\x03\x00\x11\x80\x1b5\xe9\x19\x80\x8f\xb1N\xda...'
            Int1 BSON: b"\x10\x00\x94R\xc2\xd2\x0f\xfa\x90\xbc\xd8\xd6\...'

            Text: Gladiator: A once-powerful Roman general seeks vengeance against the corrupt emperor who betrayed his family.
            Float32 BSON: b'\'\x00\xe6\x1a\xa7\xb94\x91]\xbcs&\xec\xbc\...'
            Int8 BSON: b'\x03\x00\n\x93\x8e,n\xce\xe8\x9b@\x00\xf9\x7f\...'
            Int1 BSON: b'\x10\x00\x0c\x1a\x90\x97\x0f\x19\x80/\xba\x98\...'

            Text: Rocky: A small-time boxer gets a once-in-a-lifetime chance to fight the world heavyweight champion.
            Float32 BSON: b'\'\x00\x7f\xdd\x1c<\xd9\x01\x98<1\xd2\xc0\xb...'
            Int8 BSON: b'\x03\x00"\xfb\xb1\x7f\xd3\xd6\x04\xbe\x80\xf9L\...'
            Int1 BSON: b'\x10\x00\xd4\x12\x90\xa6\x8by\x99\x8d\xa2\xbd\x...'

            Text: Pirates of the Caribbean: Jack Sparrow races to recover the heart of Davy Jones to escape eternal servitude.
            Float32 BSON: b'\'\x00\x98l\x92\xbcDp\x16=\xf0@\x1f\xbc\xd0\...'
            Int8 BSON: b'\x03\x00\xdf5\x0b\xe3\xbf\xe5\xa5\xad\x7f\x02\x...'
            Int1 BSON: b'\x10\x00D\x9a\x91\x96\x07\xfa\x93\x8d\xb2D\x92]...'

            Text: Schindler's List: The true story of a man who saved hundreds of Jews during the Holocaust by employing them in his factory.
            Float32 BSON: b'\'\x00\xb0\xfb\x0f\xbd\x9b\x02\xa5\xbbZ\x19\...'
            Int8 BSON: b'\x03\x00\xb4\xafW\xd9\xd7\xc3\x7f~QM\x86\x83\xf...'
            Int1 BSON: b'\x10\x00#\xde\x98\x96\x0e\xcc\x12\xf6\xbb\xdd2}...'

   .. step:: Create documents with the |bson| vector embeddings.

      Use the following code to create documents with the |bson| vector
      embeddings. The code uses the
      ``create_docs_with_bson_vector_embeddings`` function to create the
      documents. 

      .. code-block:: python 

         # Create BSON documents
         docs = create_docs_with_bson_vector_embeddings(bson_float32_embeddings, bson_int8_embeddings, bson_int1_embeddings, sentences)

   .. step:: Connect to your |service| {+cluster+} to upload the data.

      Paste the following code in your notebook, replace the
      ``<connection-string>`` with your |service| {+cluster+}'s |srv|
      :manual:`connection string </reference/connection-string/#find-your-mongodb-atlas-connection-string>`, 
      and run the code.

      .. note::
         
         .. include:: /includes/fact-connection-string-format-drivers.rst

      .. io-code-block:: 
         :copyable: true 

         .. input::
            :language: python

            import pymongo

            # Connect to your Atlas cluster
            mongo_client = pymongo.MongoClient("<connection-string>")
            db = mongo_client["sample_db"]
            collection = db["embeddings"]

            # Ingest data into Atlas
            collection.insert_many(docs)

         .. output:: 

            InsertManyResult([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], acknowledged=True)

      You can verify your vector embeddings by viewing them :ref:`in the
      {+atlas-ui+} <atlas-ui-view-collections>` inside the
      ``sample_db.embeddings`` namespace in your {+cluster+}. 
