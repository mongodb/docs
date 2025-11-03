.. important:: Persistence Contexts

   To enable {+orm+} to interact with the database, you must run
   operations inside a persistence context by using a Hibernate
   ``Session`` or a Jakarta Persistence ``EntityManager``. |additional-information|

   Before running the examples in this guide, ensure that you add persistence
   context and transaction management code to your application that resembles
   the following code:

   .. tabs::

      .. tab:: Session
         :tabid: session

         .. code-block:: java

            var sf = HibernateUtil.getSessionFactory();
            Session session = sf.openSession();
            Transaction tx = session.beginTransaction();

            // ... Perform CRUD operations here

            tx.commit();
            session.close();
            sf.close();

         To use a session, you must create a ``HibernateUtil.java`` file that
         configures a ``SessionFactory``. To learn more, see the :ref:`hibernate-configure-application`
         step of the Get Started tutorial.

      .. tab:: EntityManager
         :tabid: entitymanager

         .. code-block:: java

            // Replace <persistence unit> with the name of your persistence unit in the persistence.xml file
            EntityManagerFactory emf = Persistence.createEntityManagerFactory("<persistence unit>");
            EntityManager entityManager = entityManagerFactory.createEntityManager();
            entityManager.getTransaction().begin();

            // ... Perform CRUD operations here

           entityManager.getTransaction().commit();
           entityManager.close();
           emf.close;

         To use an ``EntityManager``, you must create a ``persistence.xml`` file that declares a persistence
         unit. To learn more, see the `Tutorial using JPA-standard APIs <https://docs.hibernate.org/orm/6.6/quickstart/html_single/#tutorial_jpa>`__
         in the {+orm+} documentation.