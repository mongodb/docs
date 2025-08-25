auto user = app.login(realm::App::credentials::anonymous()).get();
CHECK(user.is_logged_in());
