Changes in nested documents deeper than four levels down do not trigger 
change notifications.

If you have a data structure where you need to listen for changes five 
levels down or deeper, workarounds include:

- Refactor the schema to reduce nesting.
- Add something like "push-to-refresh" to enable users to manually refresh data.
