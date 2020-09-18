When you remove an entry from the whitelist, existing connections
from the removed address(es) may remain open for a variable amount of
time. How much time passes before |service| closes the connection
depends on several factors, including how the connection was
established, the particular behavior of the application or
`driver <https://docs.mongodb.com/ecosystem/drivers/>`_ using the
address, and the connection protocol (e.g.,
|tcp| or |udp|).
