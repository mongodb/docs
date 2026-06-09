import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.ReplaceOptions;
import com.mongodb.client.AggregateIterable;
import org.bson.Document;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class CreateUpdateView {

    private static void updateMonthlyPhoneTransactions(MongoClient client, MongoCollection<Document> collection) {
        // Create the aggregation pipeline
        List<Document> pipeline = Arrays.asList(
            new Document("$match", new Document("purchaseMethod", "Phone")),
            new Document("$unwind", new Document("path", "$items")),
            new Document("$group", new Document("_id", new Document("$dateToString",
                new Document("format", "%Y-%m")
                    .append("date", "$saleDate")))
                .append("sales_quantity", new Document("$sum", "$items.quantity"))
                .append("sales_price", new Document("$sum", "$items.price"))
            ),
            new Document("$set", new Document("sales_price", new Document("$toDouble", "$sales_price"))),
            new Document("$merge", new Document("into", "monthlyPhoneTransactions")
                .append("whenMatched", "replace"))
        );

        // Run the aggregation
        AggregateIterable<Document> results = collection.aggregate(pipeline);
        results.toCollection();
    }

    public static void main(String[] args) {
        // Connect to MongoDB
        MongoClient client = MongoClients.create("<connection-string>");
        MongoDatabase database = client.getDatabase("sample_supplies");
        MongoCollection<Document> sales = database.getCollection("sales");
        MongoCollection<Document> purchaseOrders = database.getCollection("purchaseOrders");

        // Update immediately on startup
        updateMonthlyPhoneTransactions(client, sales);
        updateMonthlyPhoneTransactions(client, purchaseOrders);
        System.out.println("Initial update completed. Materialized view is ready.");

        // Example of a simple scheduler that updates monthly
        final int dayOfMonth = 1; // Update on the 1st of each month
        final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        // Create a scheduled executor for periodic updates
        ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

        // Schedule a task that checks if it's time to update
        Runnable updateTask = new Runnable() {
            @Override
            public void run() {
                Calendar calendar = Calendar.getInstance();
                Date now = calendar.getTime();

                if (calendar.get(Calendar.DAY_OF_MONTH) == dayOfMonth &&
                    calendar.get(Calendar.HOUR_OF_DAY) == 0 &&
                    calendar.get(Calendar.MINUTE) == 0) {

                    // It's midnight on the 1st of the month - update the view
                    updateMonthlyPhoneTransactions(client, sales);
                    updateMonthlyPhoneTransactions(client, purchaseOrders);
                    System.out.println("Scheduled update completed at " + dateFormat.format(now));

                    // Skip the next hour's checks to avoid multiple updates
                    try {
                        Thread.sleep(3600000); // 1 hour in milliseconds
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                }
            }
        };

        // Run the check every minute
        scheduler.scheduleAtFixedRate(updateTask, 0, 60, TimeUnit.SECONDS);

        // Keep the application running
        try {
            // Run forever until external termination
            Thread.currentThread().join();
        } catch (InterruptedException e) {
            scheduler.shutdown();
        }
    }
}
