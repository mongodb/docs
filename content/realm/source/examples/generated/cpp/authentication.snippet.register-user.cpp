auto appConfig = realm::App::configuration();
appConfig.app_id = APP_ID;
auto app = realm::App(appConfig);

auto userEmail = "testUser" + random_string() + "@example.com";
auto userPassword = "password1234";

app.register_user(userEmail, userPassword).get();
