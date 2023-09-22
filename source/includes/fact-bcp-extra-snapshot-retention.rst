When a {+bcp+} is enabled for your project, you can also configure 
extra snapshot retention to retain snapshots beyond the {+bcp+} 
protection period. Your snapshots remain fully protected and users 
can't delete them during the {+bcp+} period. During the extra snapshot 
retention period, snapshots are unprotected again and any user with the 
appropriate role can delete them. When the extra snapshot retention 
period ends, |service| deletes the snapshots automatically. Any changes 
apply to all existing and future snapshots for that frequency unit. The 
extra snapshot retention time remains the same even if the {+bcp+} 
changes.
