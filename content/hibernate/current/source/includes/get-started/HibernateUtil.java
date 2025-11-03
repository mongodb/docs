package org.example;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public final class HibernateUtil {
  private static final SessionFactory SESSION_FACTORY =
          new Configuration().configure("hibernate.cfg.xml").buildSessionFactory();

  private HibernateUtil() {}

  public static SessionFactory getSessionFactory() { return SESSION_FACTORY; }
}