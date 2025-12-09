package com.mongodb.examples.springdatabulkinsert;

import net.datafaker.Faker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.Random;
import java.util.List;

// start-products-class
@Document("products")
public class Product {

    private static final Logger LOG = LoggerFactory.getLogger(Product.class);

    @Id
    private String id;
    private String name;
    private int qty;
    private double price;
    private Date available;
    private Date  unavailable;
    private String skuId;

    public Product(String name, int qty, double price, Date available, Date unavailable, String skuId) {
        this.name = name;
        this.qty = qty;
        this.price = price;
        this.available = available;
        this.unavailable = unavailable;
        this.skuId = skuId;
    }

    public static List<Product> randomProducts(int  count) {

        Faker faker = new Faker();
        Random rand = new Random();

        List<Product> retProds = new ArrayList<>(count);
        for (int i = 0; i < count; ++i) {

            Product product = new Product(faker.animal().name(),
                    1 + rand.nextInt(998),
                    10.0 + rand.nextInt(9999),
                    new Date(), new Date(),
                    faker.idNumber().valid());

            retProds.add(product);
        }
        return retProds;
    }

    // Getters and setters
}
// end-products-class

//     public String getName() {
//         return name;
//     }

//     public void setName(String name) {
//         this.name = name;
//     }

//     public int getQty() {
//         return qty;
//     }

//     public void setQty(int qty) {
//         this.qty = qty;
//     }

//     public double getPrice() {
//         return price;
//     }

//     public void setPrice(double price) {
//         this.price = price;
//     }

//     public Date getAvailable() {
//         return available;
//     }

//     public void setAvailable(Date available) {
//         this.available = available;
//     }

//     public Date getUnavailable() {
//         return unavailable;
//     }

//     public void setUnavailable(Date unavailable) {
//         this.unavailable = unavailable;
//     }

//     public String getSkuId() {
//         return skuId;
//     }

//     public void setSkuId(String skuId) {
//         this.skuId = skuId;
//     }
// }
