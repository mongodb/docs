.. admonition:: Changed in |onprem| 3.6: Point-in-Time Restores
   :class: important

   Prior to 3.6, the Backup Daemon created the complete point-in-time
   restore on its host. With 3.6, you download a client-side tool along
   with your snapshot. This tool downloads and applies the oplog to a
   snapshot on your client system. This reduces network and storage
   needs for your |onprem| deployment.