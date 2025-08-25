String appID = YOUR_APP_ID; // replace this with your App ID
App app = new App(new AppConfiguration.Builder(appID)
        .appName("My App")
        .requestTimeout(30, TimeUnit.SECONDS)
        .build());
