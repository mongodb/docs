val restaurants = listOf(
    Restaurant("Sun Bakery Trattoria", Restaurant.Contact("386-555-0189", "SunBakeryTrattoria@example.org", listOf(-74.0056649, 40.7452371)), 4, listOf("Pizza", "Pasta", "Italian", "Coffee", "Sandwiches")),
    Restaurant("Blue Bagels Grill", Restaurant.Contact("786-555-0102", "BlueBagelsGrill@example.com", listOf(-73.92506, 40.8275556)), 3, listOf("Bagels", "Cookies", "Sandwiches")),
    Restaurant("XYZ Bagels Restaurant", Restaurant.Contact("435-555-0190", "XYZBagelsRestaurant@example.net", listOf(-74.0707363, 40.59321569999999)), 4, listOf("Bagels", "Sandwiches", "Coffee")),
    Restaurant("Hot Bakery Cafe", Restaurant.Contact("264-555-0171", "HotBakeryCafe@example.net", listOf(-73.96485799999999, 40.761899)), 4, listOf("Bakery", "Cafe", "Coffee", "Dessert")),
    Restaurant("Green Feast Pizzeria", Restaurant.Contact("840-555-0102", "GreenFeastPizzeria@example.com", listOf(-74.1220973, 40.6129407)), 2, listOf("Pizza", "Italian")),
    Restaurant("ZZZ Pasta Buffet", Restaurant.Contact("769-555-0152", "ZZZPastaBuffet@example.com", listOf(-73.9446421, 40.7253944)), 0, listOf("Pasta", "Italian", "Buffet", "Cafeteria")),
    Restaurant("XYZ Coffee Bar", Restaurant.Contact("644-555-0193", "XYZCoffeeBar@example.net", listOf(-74.0166091, 40.6284767)), 5, listOf("Coffee", "Cafe", "Bakery", "Chocolates")),
    Restaurant("456 Steak Restaurant", Restaurant.Contact("990-555-0165", "456SteakRestaurant@example.com", listOf(-73.9365108, 40.8497077)), 0, listOf("Steak", "Seafood")),
    Restaurant("456 Cookies Shop", Restaurant.Contact("604-555-0149", "456CookiesShop@example.org", listOf(-73.8850023, 40.7494272)), 4, listOf("Bakery", "Cookies", "Cake", "Coffee")),
    Restaurant("XYZ Steak Buffet", Restaurant.Contact("229-555-0197", "XYZSteakBuffet@example.org", listOf(-73.9799932, 40.7660886)), 3, listOf("Steak", "Salad", "Chinese"))
)
collection.insertMany(restaurants)
