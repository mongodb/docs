If you use an ``errorAndLog`` validation action on a collection, MongoDB 
cannot downgrade until you drop the collection, or if you change the validation 
action for the collection to one supported in older versions. To change the validation
action on a collection, use the :dbcommand:`collMod` command. 