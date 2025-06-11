.. code-block:: csharp
   :copyable: false

   using MongoDB.Bson;
   using MongoDB.Driver;
   using System;
   
   public class TicketManagement
   {
       private readonly IMongoDatabase db;
   
       public TicketManagement(IMongoDatabase database)
       {
           db = database;
           Initialize();
       }
   
       private decimal g_max_person_id;
       private decimal g_min_person_id;
   
       private void Initialize()
       {
           var personCollection = db.GetCollection<BsonDocument>("person");
           var result = personCollection.Aggregate()
               .Group(new BsonDocument
               {
                   { "_id", BsonNull.Value },
                   { "minId", new BsonDocument("$min", "$id") },
                   { "maxId", new BsonDocument("$max", "$id") }
               })
               .FirstOrDefault();
   
           g_min_person_id = result["minId"].AsDecimal;
           g_max_person_id = result["maxId"].AsDecimal;
       }
   
   public void sellTickets(decimal person_id, decimal event_id, int quantity = 1)
   {
       var notEnoughSeats = new Exception("Not enough seats");
   
       var p_person_id = person_id;
       var p_event_id = event_id;
       var p_quantity = quantity;
   
       int r_seat_level;
       string r_seat_section;
       string r_seat_row;
   
       var event_rec = get_event_details(p_event_id);
   
       try
       {
           var seatQuery = db.GetCollection<BsonDocument>("sportingEventTicket")
               .Aggregate()
               .Match(new BsonDocument { { "sportingEventId", p_event_id }, { "ticketholderId", BsonNull.Value } })
               .Group(new BsonDocument { { "_id", new BsonDocument { { "seatLevel", "$seatLevel" }, { "seatSection", "$seatSection" }, { "seatRow", "$seatRow" } } }, { "count", new BsonDocument("$sum", 1) } })
               .Match(new BsonDocument("count", new BsonDocument("$gte", p_quantity)))
               .Limit(1)
               .Project(new BsonDocument { { "seatLevel", "$_id.seatLevel" }, { "seatSection", "$_id.seatSection" }, { "seatRow", "$_id.seatRow" } })
               .FirstOrDefault();
   
           if (seatQuery == null)
           {
               throw notEnoughSeats;
           }
   
           r_seat_level = seatQuery["seatLevel"].AsInt32;
           r_seat_section = seatQuery["seatSection"].AsString;
           r_seat_row = seatQuery["seatRow"].AsString;
       }
       catch
       {
           throw notEnoughSeats;
       }
   
       var adjacentSeatsCursor = db.GetCollection<BsonDocument>("sportingEventTicket")
           .Find(new BsonDocument { { "sportingEventId", p_event_id }, { "seatLevel", r_seat_level }, { "seatSection", r_seat_section }, { "seatRow", r_seat_row } })
           .Sort(new BsonDocument { { "seatLevel", 1 }, { "seatSection", 1 }, { "seatRow", 1 } })
           .ToCursor();
   
       using (var session = db.Client.StartSession())
       {
           session.StartTransaction();
   
           try
           {
               for (int i = 0; i < p_quantity; i++)
               {
                   if (!adjacentSeatsCursor.MoveNext())
                   {
                       throw notEnoughSeats;
                   }
   
                   var cur_ticket = adjacentSeatsCursor.Current;
   
                   var updateFilter = Builders<BsonDocument>.Filter.Eq("_id", cur_ticket["_id"]);
                   var update = Builders<BsonDocument>.Update.Set("ticketholderId", p_person_id);
                   db.GetCollection<BsonDocument>("sportingEventTicket").UpdateOne(updateFilter, update);
   
                   var purchaseHistDoc = new BsonDocument
                   {
                       { "sportingEventTicketId", cur_ticket["id"] },
                       { "purchasedById", p_person_id },
                       { "transactionDateTime", DateTime.Now },
                       { "purchasePrice", cur_ticket["ticketPrice"] }
                   };
                   db.GetCollection<BsonDocument>("ticketPurchaseHist").InsertOne(purchaseHistDoc);
               }
   
               session.CommitTransaction();
           }
           catch
           {
               session.AbortTransaction();
               throw;
           }
       }
   }
   
   public void generateTicketActivity(decimal transaction_delay, int max_transactions = 1000)
   {
       int txn_count = 0;
   
       while (txn_count < max_transactions)
       {
           sellRandomTickets();
           txn_count += 1;
           System.Threading.Thread.Sleep((int)(transaction_delay * 1000));
       }
   }
   
   public void generateTransferActivity(int transaction_delay = 5, int max_transactions = 100)
   {
       int txn_count = 0;
       decimal min_tik_id, max_tik_id, tik_id;
       decimal new_ticketholder;
       bool xfer_all;
       bool chg_price;
       decimal? new_price;
   
       while (txn_count < max_transactions)
       {
           var minMaxResult = db.GetCollection<BsonDocument>("ticketPurchaseHist")
               .Aggregate()
               .Group(new BsonDocument 
               { 
                   { "_id", BsonNull.Value }, 
                   { "min_tik_id", new BsonDocument("$min", "$sporting_event_ticket_id") }, 
                   { "max_tik_id", new BsonDocument("$max", "$sporting_event_ticket_id") } 
               })
               .FirstOrDefault();
   
           if (minMaxResult == null)
           {
               Console.WriteLine("No tickets available to transfer.");
               return;
           }
   
           min_tik_id = minMaxResult["min_tik_id"].AsDecimal;
           max_tik_id = minMaxResult["max_tik_id"].AsDecimal;
   
           var tikResult = db.GetCollection<BsonDocument>("ticketPurchaseHist")
               .Find(Builders<BsonDocument>.Filter.Lte("sporting_event_ticket_id", new BsonDecimal128(new Random().NextDouble() * (double)(max_tik_id - min_tik_id) + (double)min_tik_id)))
               .Sort(Builders<BsonDocument>.Sort.Descending("sporting_event_ticket_id"))
               .FirstOrDefault();
   
           if (tikResult == null)
           {
               Console.WriteLine("No tickets available to transfer.");
               return;
           }
   
           tik_id = tikResult["sporting_event_ticket_id"].AsDecimal;
   
           new_ticketholder = (decimal)(new Random().NextDouble() * (double)(g_max_person_id - g_min_person_id) + (double)g_min_person_id);
   
           xfer_all = new Random().Next(1, 6) < 5;
   
           new_price = null;
   
           chg_price = new Random().Next(1, 4) == 1;
           if (chg_price)
           {
               var ticketResult = db.GetCollection<BsonDocument>("sportingEventTicket")
                   .Find(Builders<BsonDocument>.Filter.Eq("id", tik_id))
                   .FirstOrDefault();
   
               if (ticketResult != null)
               {
                   new_price = ticketResult["ticket_price"].AsDecimal * (decimal)(new Random().NextDouble() * 0.4 + 0.8);
               }
           }
   
           transferTicket(tik_id, new_ticketholder, xfer_all, new_price);
   
           txn_count++;
           System.Threading.Thread.Sleep(transaction_delay * 1000);
       }
   }
   
   public List<BsonDocument> get_open_events()
   {
       var event_tab = new List<BsonDocument>();
   
       var open_events = db.GetCollection<BsonDocument>("sportingEvent")
                           .Find(Builders<BsonDocument>.Filter.Eq("soldOut", 0))
                           .Sort(Builders<BsonDocument>.Sort.Ascending("startDateTime"))
                           .ToList();
   
       foreach (var oe_rec in open_events)
       {
           event_tab.Add(oe_rec);
       }
   
       return event_tab;
   }
   
   public eventRecType get_event_details(decimal event_id)
   {
       var eventRec = new eventRecType();
       var p_event_id = event_id;
   
       var pipeline = new[]
       {
           new BsonDocument("$match", new BsonDocument("id", p_event_id)),
           new BsonDocument("$lookup", new BsonDocument
           {
               { "from", "sportTeam" },
               { "localField", "homeTeamId" },
               { "foreignField", "id" },
               { "as", "homeTeam" }
           }),
           new BsonDocument("$lookup", new BsonDocument
           {
               { "from", "sportTeam" },
               { "localField", "awayTeamId" },
               { "foreignField", "id" },
               { "as", "awayTeam" }
           }),
           new BsonDocument("$lookup", new BsonDocument
           {
               { "from", "sportLocation" },
               { "localField", "locationId" },
               { "foreignField", "id" },
               { "as", "location" }
           }),
           new BsonDocument("$unwind", "$homeTeam"),
           new BsonDocument("$unwind", "$awayTeam"),
           new BsonDocument("$unwind", "$location"),
           new BsonDocument("$project", new BsonDocument
           {
               { "sport_name", "$sportTypeName" },
               { "home_team_name", "$homeTeam.name" },
               { "away_team_name", "$awayTeam.name" },
               { "home_field", "$location.name" },
               { "date_time", "$startDateTime" }
           })
       };
   
       var result = db.GetCollection<BsonDocument>("sportingEvent").Aggregate<BsonDocument>(pipeline).FirstOrDefault();
   
       if (result != null)
       {
           eventRec.sport_name = result["sport_name"].AsString;
           eventRec.home_team_name = result["home_team_name"].AsString;
           eventRec.away_team_name = result["away_team_name"].AsString;
           eventRec.home_field = result["home_field"].AsString;
           eventRec.date_time = result["date_time"].ToUniversalTime();
       }
   
       return eventRec;
   }
   
   void sellRandomTickets()
   {
       var eventTab = getOpenEvents();
       var rowCt = eventTab.Count;
       var eventIdx = (int)Math.Truncate(new Random().NextDouble() * (rowCt - 1)) + 1;
       var eventId = eventTab[eventIdx].id;
       var ticketHolder = (int)Math.Truncate(new Random().NextDouble() * (g_max_person_id - g_min_person_id) + g_min_person_id);
       var quantity = (int)Math.Truncate(new Random().NextDouble() * 5) + 1;
       sellTickets(ticketHolder, eventId, quantity);
   }
   
   void transferTicket(decimal ticket_id, decimal new_ticketholder_id, bool transfer_all = false, decimal? price = null)
   {
       var p_ticket_id = ticket_id;
       var p_new_ticketholder_id = new_ticketholder_id;
       var p_price = price;
       var xferall = transfer_all ? 1 : 0;
       decimal old_ticketholder_id;
       DateTime last_txn_date;
   
       var txfr_cur = db.GetCollection<BsonDocument>("ticketPurchaseHist")
           .Find(Builders<BsonDocument>.Filter.And(
               Builders<BsonDocument>.Filter.Eq("purchased_by_id", old_ticketholder_id),
               Builders<BsonDocument>.Filter.Eq("transaction_date_time", last_txn_date)
           )).ToList();
   
       var result = db.GetCollection<BsonDocument>("ticketPurchaseHist").Aggregate()
           .Match(Builders<BsonDocument>.Filter.And(
               Builders<BsonDocument>.Filter.Eq("sporting_event_ticket_id", p_ticket_id),
               Builders<BsonDocument>.Filter.Eq("purchased_by_id", old_ticketholder_id),
               Builders<BsonDocument>.Filter.Or(
                   Builders<BsonDocument>.Filter.Eq("sporting_event_ticket_id", p_ticket_id),
                   Builders<BsonDocument>.Filter.Eq("xferall", 1)
               )
           ))
           .Group(new BsonDocument
           {
               { "_id", "$ticketholder_id" },
               { "transaction_date_time", new BsonDocument("$max", "$transaction_date_time") }
           })
           .FirstOrDefault();
   
       if (result != null)
       {
           last_txn_date = result["transaction_date_time"].ToUniversalTime();
           old_ticketholder_id = result["_id"].AsDecimal;
   
           foreach (var xrec in txfr_cur)
           {
               db.GetCollection<BsonDocument>("sportingEventTicket").UpdateOne(
                   Builders<BsonDocument>.Filter.Eq("id", xrec["sporting_event_ticket_id"]),
                   Builders<BsonDocument>.Update.Set("ticketholder_id", p_new_ticketholder_id)
               );
   
               db.GetCollection<BsonDocument>("ticketPurchaseHist").InsertOne(new BsonDocument
               {
                   { "sporting_event_ticket_id", xrec["sporting_event_ticket_id"] },
                   { "purchased_by_id", p_new_ticketholder_id },
                   { "transferred_from_id", old_ticketholder_id },
                   { "transaction_date_time", DateTime.UtcNow },
                   { "purchase_price", p_price ?? xrec["purchase_price"].AsDecimal }
               });
           }
       }
       else
       {
           throw new Exception("No tickets available to transfer.");
       }
   }
   }