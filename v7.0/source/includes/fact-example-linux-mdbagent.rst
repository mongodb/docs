.. example::

     For Linux operating systems, use the following commands to set
     ownership and permissions:

     .. code-block:: sh

        sudo cp -a mms-ssl-unified.pem /etc/mongodb-mms/
        sudo chown mongod:mongod /etc/mongodb-mms/mms-ssl-unified.pem
        sudo chmod 600 /etc/mongodb-mms/mms-ssl-unified.pem
        