When you remove an entry from the IP access list, existing connections
from the removed address(es) may remain open for a variable amount of
time. How much time passes before |service| closes the connection
depends on several factors, including:

- how the connection was established
- how the application or :driver:`driver </>` using the address behaves
- which protocol (like |tcp| or |udp|) the connection uses
