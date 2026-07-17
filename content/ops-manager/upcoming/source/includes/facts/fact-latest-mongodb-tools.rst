.. important::

   To connect to a queryable backup instance from your own
   workstation, use the latest versions of :dbtools:`MongoDB Database
   Tools </installation/installation/>`, which include
   :binary:`mongodump <bin.mongodump>` and :binary:`mongorestore
   <bin.mongorestore>`, and the latest version of {+mongosh+}.

   Older versions of :binary:`mongodump <bin.mongodump>` include an issue
   that can cause keys in collection options to be dumped in the wrong order.
   To learn more, see `TOOLS-3411 <https://jira.mongodb.org/browse/TOOLS-3411>`__.

   If you run |onprem| in :ref:`local mode <om-use-local-mode>`,
   install the version listed in the :ref:`Database Tools
   Compatibility table <ops-manager-dbtools-compatibility>` for your
   |onprem| release instead of the latest available version.
