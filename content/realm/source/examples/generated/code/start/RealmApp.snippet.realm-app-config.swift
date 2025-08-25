let configuration = AppConfiguration(
   baseURL: "https://services.cloud.mongodb.com", // You can customize base URL
   transport: nil, // Custom RLMNetworkTransportProtocol
   defaultRequestTimeoutMS: 30000
)

let app = App(id: "my-app-services-app-id", configuration: configuration)
