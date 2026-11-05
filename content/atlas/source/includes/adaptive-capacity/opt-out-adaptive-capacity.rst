We recommend that you enable adaptive capacity to maintain the
availability of your {+cluster+} during capacity shortages.
|service| enables adaptive capacity by default. You can opt out of
using adaptive capacity for an individual {+cluster+}. When you opt
out, |service| keeps your {+cluster+} on its original instance type,
and a capacity shortage might prevent you from scaling the {+cluster+}.

To opt out of |service| adaptive capacity changes, see
:ref:`adaptive-capacity-setting`.