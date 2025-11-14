package org.example;

import org.hibernate.Transaction;
import org.hibernate.Session;

import java.util.ArrayList;
import java.util.List;

public class Main {
        public static void main(String[] args) {

            var sf = HibernateUtil.getSessionFactory();
            Session session = sf.openSession();
            Transaction tx = session.beginTransaction();

            // Add CRUD operations here

            tx.commit();
            session.close();
            sf.close();
        }

}