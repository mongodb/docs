std::map<std::string, std::string> customHttpHeaders;
customHttpHeaders.emplace("CUSTOM_HEADER_NAME", "CUSTOM_HEADER_VALUE");

auto appConfig = realm::App::configuration();
appConfig.app_id = APP_ID;
appConfig.custom_http_headers = customHttpHeaders;
auto app = realm::App(appConfig);
