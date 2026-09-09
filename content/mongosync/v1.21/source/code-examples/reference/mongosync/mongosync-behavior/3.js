db.adminCommand(
  { 
    setAllowMigrations: “<db>.<collection>”,
    allowMigrations: false
  }
)
