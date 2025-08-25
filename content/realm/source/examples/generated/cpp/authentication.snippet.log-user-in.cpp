auto user = app.login(realm::App::credentials::username_password(
                          userEmail, userPassword))
                .get();
