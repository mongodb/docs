In general, bearer authentication with an access token has higher
throughput and is more secure than credential headers. Use an access
token instead of credential headers when possible. The token lets you
run multiple requests without re-authenticating the user. It also lets
you send requests from a web browser that enforces :wikipedia:`CORS
<Cross-origin_resource_sharing>`.
