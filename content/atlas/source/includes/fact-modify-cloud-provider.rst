You can modify the cloud provider and region when you scale up a
{+Free-cluster+}, or when you modify a {+Flex-cluster+} or larger
{+cluster+}.

Changing to a different provider could change the connection string to
your new {+cluster+} if your old {+cluster+} was deployed on |gcp| or
|azure| before October 2020. Consider scheduling time to :ref:`update
your applications with the new connection string
<atlas-faq-migrate-providers>` to resume connectivity to the
{+cluster+}. |service| migrates data to the new {+cluster+}.
