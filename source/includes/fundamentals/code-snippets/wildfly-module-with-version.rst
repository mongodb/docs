.. code-block:: xml
   :caption: module.xml

   <module xmlns="urn:jboss:module:1.9" name="org.mongodb">
      <resources>
         <resource-root path="bson-{+full-version+}.jar"/>
         <resource-root path="bson-record-codec-{+full-version+}.jar"/>
         <resource-root path="mongodb-driver-core-{+full-version+}.jar"/>
         <resource-root path="mongodb-driver-sync-{+full-version+}.jar"/>
      </resources>
      <dependencies>
         <module name="javax.api"/>
         <module name="javax.transaction.api"/>
         <module name="javax.servlet.api" optional="true"/>
      </dependencies>
   </module>