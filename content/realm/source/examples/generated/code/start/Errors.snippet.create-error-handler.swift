let app = App(id: YOUR_APP_SERVICES_APP_ID)
app.syncManager.errorHandler = { error, session in
    // handle error
}
