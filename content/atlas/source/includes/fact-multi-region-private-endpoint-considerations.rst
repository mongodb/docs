For multi-region {+clusters+}, you must create a 
private endpoint for each region with a node. 

If you're performing maintenance on a multi-region {+cluster+}, do not
alter or remove private endpoints until maintenance is complete to
avoid {+cluster+} downtime.

If you're moving from a multi-region to a single-region {+cluster+}, 
you can remove old private endpoints only after verifying that your {+cluster+}
is fully functional in the new single-region setup and you've directed all traffic
through the new single-region private endpoint.
