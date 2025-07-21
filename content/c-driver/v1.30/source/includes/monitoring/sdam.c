#include <stdio.h>
#include <bson/bson.h>
#include <mongoc/mongoc.h>

typedef struct {
   int server_opening_events;
} stats_t;

static void
server_opening (const mongoc_apm_server_opening_t *event)
{
   stats_t *stats = (stats_t *) mongoc_apm_server_opening_get_context (event);
   stats->server_opening_events += 1;

   printf ("Server opening: %s\n", mongoc_apm_server_opening_get_host (event)->host_and_port);
}

int
main (void)
{
   mongoc_init ();

   stats_t stats = {0};

   mongoc_client_t *client = mongoc_client_new ("<connection string URI>");
   
   {
      mongoc_apm_callbacks_t *cbs = mongoc_apm_callbacks_new ();
      mongoc_apm_set_server_opening_cb (cbs, server_opening);
      mongoc_client_set_apm_callbacks (client, cbs, &stats);
      mongoc_apm_callbacks_destroy (cbs);
   }

   // Perform database operations

   mongoc_client_destroy (client);   

   printf ("Observed %d server opening events\n", stats.server_opening_events);

   mongoc_cleanup ();

   return EXIT_SUCCESS;
}
