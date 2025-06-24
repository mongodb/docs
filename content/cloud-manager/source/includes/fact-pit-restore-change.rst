.. important:: Changed in |onprem| 3.6: Point-in-Time Restores

   Prior to 3.6, the :cloudmgr:`Backup Daemon </reference/glossary/#std-term-backup-daemon>` created the complete point-
   in-time restore on its host. With 3.6, you download a client-side
   tool along with your :manual:`snapshot </reference/glossary/#std-term-snapshot>`. This tool downloads and
   applies the :manual:`oplog </reference/glossary/#std-term-oplog>` to a snapshot on your client system. This
   reduces network and storage needs for your |onprem| deployment.