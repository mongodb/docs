.. tabs-drivers::

   tabs:
     - id: shell
       content: |

         .. code-block:: javascript

            {
               rated: 'G',
               $or: [
                 { runtime: { $lt: 90 } },
                 { title: { $regex: '^T' } }
               ]
            }

         which corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM movies WHERE rated = "G"
            AND ( runtime < 90 OR title LIKE "T%")

     - id: compass
       content: |

         .. code-block:: javascript

            {
               status: 'A',
               $or: [
                 { qty: { $lt: 30 } },
                 { item: { $regex: '^p' } }
               ]
            }

         which corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM inventory WHERE status = "A"
            AND ( qty < 30 OR item LIKE "p%")

     - id: c
       content: |

         .. code-block:: javascript

            {
               status: 'A',
               $or: [
                 { qty: { $lt: 30 } },
                 { item: { $regex: '^p' } }
               ]
            }

         which corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM inventory WHERE status = "A"
            AND ( qty < 30 OR item LIKE "p%")

     - id: python
       content: |

         .. code-block:: javascript

            {
               status: 'A',
               $or: [
                 { qty: { $lt: 30 } },
                 { item: { $regex: '^p' } }
               ]
            }

         which corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM inventory WHERE status = "A"
            AND ( qty < 30 OR item LIKE "p%")

     - id: motor
       content: |

         .. code-block:: javascript

            {
               status: 'A',
               $or: [
                 { qty: { $lt: 30 } },
                 { item: { $regex: '^p' } }
               ]
            }

         which corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM inventory WHERE status = "A"
            AND ( qty < 30 OR item LIKE "p%")

     - id: java-sync
       content: |

         .. code-block:: javascript

            {
               status: 'A',
               $or: [
                 { qty: { $lt: 30 } },
                 { item: { $regex: '^p' } }
               ]
            }

         which corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM inventory WHERE status = "A"
            AND ( qty < 30 OR item LIKE "p%")

     - id: java-async
       content: |

         .. code-block:: javascript

            {
               status: 'A',
               $or: [
                 { qty: { $lt: 30 } },
                 { item: { $regex: '^p' } }
               ]
            }

         which corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM inventory WHERE status = "A"
            AND ( qty < 30 OR item LIKE "p%")

     - id: kotlin-coroutine
       content: |

         .. code-block:: javascript

            {
               status: 'A',
               $or: [
                 { qty: { $lt: 30 } },
                 { item: { $regex: '^p' } }
               ]
            }

         which corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM inventory WHERE status = "A"
            AND ( qty < 30 OR item LIKE "p%")

     - id: nodejs
       content: |

         .. code-block:: javascript

            {
               status: 'A',
               $or: [
                 { qty: { $lt: 30 } },
                 { item: { $regex: '^p' } }
               ]
            }

         which corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM inventory WHERE status = "A"
            AND ( qty < 30 OR item LIKE "p%")

     - id: php
       content: |

         .. code-block:: javascript

            {
               status: 'A',
               $or: [
                 { qty: { $lt: 30 } },
                 { item: { $regex: '^p' } }
               ]
            }

         which corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM inventory WHERE status = "A"
            AND ( qty < 30 OR item LIKE "p%")

     - id: ruby
       content: |

         .. code-block:: javascript

            {
               status: 'A',
               $or: [
                 { qty: { $lt: 30 } },
                 { item: { $regex: '^p' } }
               ]
            }

         which corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM inventory WHERE status = "A"
            AND ( qty < 30 OR item LIKE "p%")

     - id: scala
       content: |

         .. code-block:: javascript

            {
               status: 'A',
               $or: [
                 { qty: { $lt: 30 } },
                 { item: { $regex: '^p' } }
               ]
            }

         which corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM inventory WHERE status = "A"
            AND ( qty < 30 OR item LIKE "p%")

     - id: csharp
       content: |

         .. code-block:: javascript

            {
               status: 'A',
               $or: [
                 { qty: { $lt: 30 } },
                 { item: { $regex: '^p' } }
               ]
            }

         which corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM inventory WHERE status = "A"
            AND ( qty < 30 OR item LIKE "p%")

     - id: go
       content: |

         .. code-block:: javascript

            {
               status: 'A',
               $or: [
                 { qty: { $lt: 30 } },
                 { item: { $regex: '^p' } }
               ]
            }

         which corresponds to the following SQL statement:

         .. code-block:: sql

            SELECT * FROM inventory WHERE status = "A"
            AND ( qty < 30 OR item LIKE "p%")
