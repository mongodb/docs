import pymongo
import time
import datetime
import schedule

def update_monthly_phone_transactions(client, collection):
    """Update the materialized view of monthly phone transactions."""
    # Create the aggregation pipeline
    pipeline = [
        {"$match": {"purchaseMethod": "Phone"}},
        {"$unwind": {"path": "$items"}},
        {"$group": {
            "_id": {
                "$dateToString": {
                    "format": "%Y-%m",
                    "date": "$saleDate"
                }
            },
            "sales_quantity": {"$sum": "$items.quantity"},
            "sales_price": {"$sum": "$items.price"}
        }},
        {"$set": {"sales_price": {"$toDouble": "$sales_price"}}},
        {"$merge": {
            "into": "monthlyPhoneTransactions",
            "whenMatched": "replace"
        }}
    ]
    
    # Run the aggregation
    collection.aggregate(pipeline)

def scheduled_update(client, sales, purchase_orders):
    """Run the monthly update task."""
    update_monthly_phone_transactions(client, sales)
    update_monthly_phone_transactions(client, purchase_orders)
    print(f"Scheduled update completed at {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

def main():
    # Connect to MongoDB
    client = pymongo.MongoClient("<connection-string>")
    sales = client.sample_supplies.sales
    purchase_orders = client.sample_supplies.purchaseOrders
    
    # Update immediately on startup
    update_monthly_phone_transactions(client, sales)
    update_monthly_phone_transactions(client, purchase_orders)
    print("Initial update completed. Materialized view is ready.")
    
    # Schedule update to run at midnight on the 1st of each month
    schedule.every().day.at("00:00").do(
        lambda: scheduled_update(client, sales, purchase_orders) if datetime.datetime.now().day == 1 else None
    )
    
    print("Scheduler is running. Press Ctrl+C to exit.")
    
    # Keep the process running and execute scheduled tasks
    try:
        while True:
            schedule.run_pending()
            time.sleep(60)  # Check every minute
    except KeyboardInterrupt:
        print("\nShutting down...")
    finally:
        client.close()

if __name__ == "__main__":
    main()
