std::map<std::string, std::string> customHeaders;
customHeaders.emplace("CUSTOM_HEADER_NAME", "CUSTOM_HEADER_VALUE");

auto syncConfig = user.flexible_sync_configuration();
syncConfig.set_custom_http_headers(customHeaders);
