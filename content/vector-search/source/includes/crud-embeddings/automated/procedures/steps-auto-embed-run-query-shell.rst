.. procedure:: 
   :style: normal 

   .. step:: Connect to the Atlas cluster using {+mongosh+}. 

      To learn more, see :ref:`connect-mongo-shell`.

   .. step:: Switch to the database that contains the collection for which you want to run the query. 

      .. code-block:: javascript 

         use <database-name>

      .. example:: 

         For example, to switch to the ``sample_mflix`` database,
         run the following command in your terminal:

         .. code-block:: javascript 

            use sample_mflix

   .. step:: Run the ``db.collection.aggregate()`` method with the ``$vectorSearch`` stage.

      The :method:`db.collection.aggregate()` method has the
      following syntax:

      .. literalinclude:: /includes/crud-embeddings/automated/code-snippets/shell/basic-query-syntax.sh
         :language: javascript 
         :linenos:

      .. example:: 

         For example, to run a query against the ``fullplot``
         field in the ``movies`` collection for a semantic search
         for movies semantically similar to ``young heroes caught
         in epic struggles between light and darkness``, copy,
         paste, and run the following query.

         .. io-code-block:: 
            :copyable: true 

            .. input:: /includes/crud-embeddings/automated/code-snippets/shell/basic-query-example.sh
               :language: javascript
               :linenos:

            .. output:: 
               :language: javascript
               :linenos:
               :visible: false

               [
                  {
                      title: 'Day Watch',
                      fullplot: 'Anton belongs to the Forces of the Light as well as his powerful girlfriend and apprentice, but his son is a powerful teenager from the Darkness and Anton protects him. When the balance between Light and Darkness is affected by the death of some evil vampires, Anton is framed and accused of the murders, and he chases an ancient chalk that has the power of changing the destiny of its owner.',
                      score: 0.5449697971343994
                  },
                  {
                      title: 'Dungeons & Dragons',
                      fullplot: "The Empire of Izmer has long been a divided land. The Mages - an elite group of magic-users - rule whilst the lowly commoners are powerless. Izmer's young Empress, Savina, wants equality and prosperity for all, but the evil Mage Profion is plotting to depose her and establish his own rule. The Empress possesses a scepter which controls Izmer's Golden Dragons. To challenge her rule, Profion must have the scepter, and tricks the Council of Mages into believing Savina is unfit to hold it. Knowing that Profion will bring death and destruction to Izmer, Savina must find the legendary Rod of Savrille, a mythical rod that has the power to control Red Dragons, a species even mightier than the Gold. Enter two thieves, Ridley and Snails, who unwittingly become instrumental in Savina's search for the Rod. Joined by a feisty Dwarf named Elwood, and helped by the Empress's expert tracker, the Elf Norda, the young heroes go in search of the Rod of Savrille. From the deadly maze of the Thieves Guild at Antius to an Elven Village, secret grotto and abandoned castles, Ridley and his band must outwit Profion's chief henchman Damodar at every turn while, back in Izmer, Profion prepares to do battle with the Empress. All depends on the Rod, but the outcome of the race to reach it first is far from certain, and Izmar's very survival hangs in the balance.",
                      score: 0.5414832830429077
                  },
                  {
                      title: 'Brave Story',
                      fullplot: 'A young boy attempts to change his destiny by entering a magic gateway to another world; but on his quest to find the Tower of Fortune and be granted any wish, he must conjure up all his bravery to battle demons, his friends, and ultimately himself.',
                      score: 0.5404887795448303
                  },
                  {
                      title: 'Justin and the Knights of Valour',
                      fullplot: 'Justin lives in a kingdom where bureaucrats rule and knights have been ousted. His dream is to be become one of the Knights of Valour, like his grandfather was, but his father Reginald, the chief counsel to the Queen, wants his son to follow in his footsteps and become a lawyer. After an inspiring visit to his beloved Grandmother and bidding farewell to his supposed lady-love Lara, Justin leaves home and embarks on a quest to become a knight. Along the way he meets the beautiful, feisty Talia, a quirky wizard called Melquiades, and the handsome Sir Clorex and is mentored by three monks; Blucher, Legantir and Braulio, who teach and test him in the ancient ways of the Knights of Valour. Whilst an unlikely candidate for knighthood, Justin must rise to the challenge quickly when banished former knight Sir Heraclio and his army, lead by Sota, return and threaten to destroy the Kingdom.',
                      score: 0.5374966859817505
                  },
                  {
                      title: 'Forest Warrior',
                      fullplot: 'John McKenna is a spiritual being who is able to transform into bear, wolf or eagle. He lives in the forests of Tanglewood and has dedicated his life to protect them. One day a gang of evil lumberjacks led by Travis Thorne arrive Tanglewood to chop the forest down. McKenna cannot let this happen, and together with his new friends - Lords of the Tanglewood, a band of children who love to play in the forest - he battles against Thorne and his evil gang.',
                      score: 0.5331881642341614
                  },
                  {
                      title: 'Forest Warrior',
                      fullplot: 'John McKenna is a spiritual being who is able to transform into bear, wolf or eagle. He lives in the forests of Tanglewood and has dedicated his life to protect them. One day a gang of evil lumberjacks led by Travis Thorne arrive Tanglewood to chop the forest down. McKenna cannot let this happen, and together with his new friends - Lords of the Tanglewood, a band of children who love to play in the forest - he battles against Thorne and his evil gang.',
                      score: 0.5331881642341614
                  },
                  {
                      title: 'Catatan (Harian) si Boy',
                      fullplot: "A circle of friends risking their Friendship, Trust, Love and Hope in search of a legend. A young and privileged teenager with a golden heart, beset with challenges and tribulations we face today with the goal to open many young people's mind with inspirations and hopes that drive them in achieving their dreams. To get out of their comfort zone and finish what they started.",
                      score: 0.5322973728179932
                  },
                  {
                      title: 'Bionicle: Mask of Light',
                      fullplot: "In a land of living machines, two young ones are chosen to seek the legendary Mask of Light to reveal the savior of all the lands from the dark forces of the Makuta. During the course of their adventure, they will call on the heroes of their people, the great Toa. These Toa, masters of nature's forces such as Fire, Wind, Earth & Water, try to protect the chosen ones as they seek their destiny.",
                      score: 0.5315042734146118
                  },
                  {
                      title: 'Fear No Evil',
                      fullplot: 'High school student turns out to be personification of Lucifer. Two arch angels in human form (as women) take him on.',
                      score: 0.5295513868331909
                  },
                  {
                      title: 'Tales of Vesperia: The First Strike',
                      fullplot: 'In a mythical kingdom, the mighty Imperial Knights harness a magical substance known as Aer to power their weapons and protect humanity from the monsters of the forest. But something strange is afoot. The Aer is somehow changing, causing the wilderness to waste away and stirring the woodland beasts to attack with greater frequency. As danger creeps steadily closer to civilization, two young recruits - Flynn, the rigid son of a fallen hero, and the rebellious and brash Yuri - must ride with their fellow Imperial Knights to distant ruins in hopes of uncovering the truth behind the transforming Aer. Some will not survive the thrilling journey. Some will be betrayed. If Flynn and Yuri cannot overcome their differences and learn to fight together, all will be lost for the people of the realm.',
                      score: 0.5276793241500854
                  }
               ]
