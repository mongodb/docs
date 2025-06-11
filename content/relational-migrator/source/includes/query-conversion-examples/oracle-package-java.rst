.. code-block:: java
   :copyable: false

   public class TicketManagement {
       private MongoDatabase db;
       private Decimal128 g_max_person_id;
       private Decimal128 g_min_person_id;
   
       public TicketManagement(MongoDatabase db) {
           this.db = db;
           initialize();
       }
   
       private void initialize() {
           MongoCollection<Document> personCollection = db.getCollection("person");
           Document minMaxPersonId = personCollection.aggregate(Arrays.asList(
                   Aggregates.group(null, Accumulators.min("minId", "$id"), Accumulators.max("maxId", "$id"))
           )).first();
           if (minMaxPersonId != null) {
               g_min_person_id = minMaxPersonId.get("minId", Decimal128.class);
               g_max_person_id = minMaxPersonId.get("maxId", Decimal128.class);
           }
       }
   
   public void sellTickets(Number person_id, Number event_id, Number quantity) {
       try {
           Document eventRec = get_event_details(event_id);
           Document seatInfo = db.getCollection("sportingEventTicket")
               .aggregate(Arrays.asList(
                   Aggregates.match(Filters.and(
                       Filters.eq("sportingEventId", event_id),
                       Filters.eq("ticketholderId", null)
                   )),
                   Aggregates.group(new Document("seatLevel", "$seatLevel")
                       .append("seatSection", "$seatSection")
                       .append("seatRow", "$seatRow"),
                       Accumulators.sum("count", 1)
                   ),
                   Aggregates.match(Filters.gte("count", quantity)),
                   Aggregates.limit(1)
               )).first();
   
           if (seatInfo == null) {
               throw new Exception("not_enough_seats");
           }
   
           Number r_seat_level = seatInfo.getInteger("_id.seatLevel");
           String r_seat_section = seatInfo.getString("_id.seatSection");
           String r_seat_row = seatInfo.getString("_id.seatRow");
   
           MongoCursor<Document> cursor = db.getCollection("sportingEventTicket")
               .find(Filters.and(
                   Filters.eq("sportingEventId", event_id),
                   Filters.eq("seatLevel", r_seat_level),
                   Filters.eq("seatSection", r_seat_section),
                   Filters.eq("seatRow", r_seat_row)
               ))
               .sort(Sorts.ascending("seatLevel", "seatSection", "seatRow"))
               .iterator();
   
           for (int i = 0; i < quantity; i++) {
               if (!cursor.hasNext()) {
                   throw new Exception("not_enough_seats");
               }
               Document cur_ticket = cursor.next();
               db.getCollection("sportingEventTicket").updateOne(
                   Filters.eq("_id", cur_ticket.getObjectId("_id")),
                   Updates.set("ticketholderId", person_id)
               );
               db.getCollection("ticketPurchaseHist").insertOne(new Document()
                   .append("sportingEventTicketId", cur_ticket.getDecimal("id"))
                   .append("purchasedById", person_id)
                   .append("transactionDateTime", new Date())
                   .append("purchasePrice", cur_ticket.getDecimal("ticketPrice"))
               );
           }
       } catch (Exception e) {
           if (e.getMessage().equals("not_enough_seats")) {
               System.out.println("Sorry, there aren't " + quantity + " adjacent seats for event:");
               System.out.println("   " + eventRec.getString("home_team_name") + " VS " + eventRec.getString("away_team_name") + "   (" + eventRec.getString("sport_name") + ")");
               System.out.println("   " + eventRec.getString("home_field") + ":  " + new SimpleDateFormat("dd-MMM-yyyy HH:mm").format(eventRec.getDate("date_time")));
           } else {
               e.printStackTrace();
           }
       }
   }
   
   public void generateTicketActivity(int transaction_delay, int max_transactions) {
       int txn_count = 0;
       while (txn_count < max_transactions) {
           sellRandomTickets();
           txn_count++;
           try {
               Thread.sleep(transaction_delay * 1000);
           } catch (InterruptedException e) {
               Thread.currentThread().interrupt();
           }
       }
   }
   
   public void generateTransferActivity(double transaction_delay, int max_transactions) {
       int txn_count = 0;
       Decimal128 min_tik_id;
       Decimal128 max_tik_id;
       Decimal128 tik_id;
       Decimal128 new_ticketholder;
       boolean xfer_all;
       boolean chg_price;
       Decimal128 new_price;
   
       while (txn_count < max_transactions) {
           Document minMaxResult = db.getCollection("ticketPurchaseHist")
               .aggregate(Arrays.asList(
                   Aggregates.group(null, 
                       Accumulators.min("min_tik_id", "$sportingEventTicketId"), 
                       Accumulators.max("max_tik_id", "$sportingEventTicketId")
                   )
               )).first();
   
           if (minMaxResult == null) {
               System.out.println("No tickets available to transfer.");
               return;
           }
   
           min_tik_id = minMaxResult.get("min_tik_id", Decimal128.class);
           max_tik_id = minMaxResult.get("max_tik_id", Decimal128.class);
   
           Document tikResult = db.getCollection("ticketPurchaseHist")
               .aggregate(Arrays.asList(
                   Aggregates.match(Filters.lte("sportingEventTicketId", new Decimal128(Math.random() * (max_tik_id.doubleValue() - min_tik_id.doubleValue()) + min_tik_id.doubleValue()))),
                   Aggregates.group(null, Accumulators.max("tik_id", "$sportingEventTicketId"))
               )).first();
   
           if (tikResult == null) {
               System.out.println("No tickets available to transfer.");
               return;
           }
   
           tik_id = tikResult.get("tik_id", Decimal128.class);
           new_ticketholder = new Decimal128(Math.floor(Math.random() * (g_max_person_id.doubleValue() - g_min_person_id.doubleValue()) + g_min_person_id.doubleValue()));
   
           xfer_all = (Math.round(Math.random() * 4) < 4); // transfer all tickets 80% of the time
           new_price = null;
   
           chg_price = (Math.round(Math.random() * 2) == 0); // 30% of the time change price
           if (chg_price) {
               Document priceResult = db.getCollection("sportingEventTicket")
                   .find(Filters.eq("id", tik_id))
                   .projection(Projections.include("ticketPrice"))
                   .first();
   
               if (priceResult != null) {
                   new_price = new Decimal128(priceResult.getDouble("ticketPrice") * (Math.random() * 0.4 + 0.8));
               }
           }
   
           transferTicket(tik_id, new_ticketholder, xfer_all, new_price);
   
           txn_count++;
           try {
               Thread.sleep((long) (transaction_delay * 1000));
           } catch (InterruptedException e) {
               Thread.currentThread().interrupt();
           }
       }
   }
   
   public List<Document> getOpenEvents() {
       List<Document> eventTab = new ArrayList<>();
       MongoCollection<Document> sportingEventCollection = db.getCollection("sportingEvent");
       FindIterable<Document> openEvents = sportingEventCollection.find(Filters.eq("soldOut", 0))
               .sort(Sorts.ascending("startDateTime"));
   
       for (Document oeRec : openEvents) {
           eventTab.add(oeRec);
       }
       return eventTab;
   }
   
   public eventRecType get_event_details(Number event_id) {
       eventRecType eventRec = new eventRecType();
       Number p_event_id = event_id;
       
       List<Document> pipeline = Arrays.asList(
           new Document("$match", new Document("id", p_event_id)),
           new Document("$lookup", new Document("from", "sportTeam")
               .append("localField", "homeTeamId")
               .append("foreignField", "id")
               .append("as", "home_team")),
           new Document("$lookup", new Document("from", "sportTeam")
               .append("localField", "awayTeamId")
               .append("foreignField", "id")
               .append("as", "away_team")),
           new Document("$lookup", new Document("from", "sportLocation")
               .append("localField", "locationId")
               .append("foreignField", "id")
               .append("as", "location")),
           new Document("$unwind", "$home_team"),
           new Document("$unwind", "$away_team"),
           new Document("$unwind", "$location"),
           new Document("$project", new Document("sport_name", "$sportTypeName")
               .append("home_team_name", "$home_team.name")
               .append("away_team_name", "$away_team.name")
               .append("home_field", "$location.name")
               .append("date_time", "$startDateTime"))
       );
   
       MongoCollection<Document> collection = db.getCollection("sportingEvent");
       AggregateIterable<Document> result = collection.aggregate(pipeline);
   
       Document doc = result.first();
       if (doc != null) {
           eventRec.sport_name = doc.getString("sport_name");
           eventRec.home_team_name = doc.getString("home_team_name");
           eventRec.away_team_name = doc.getString("away_team_name");
           eventRec.home_field = doc.getString("home_field");
           eventRec.date_time = doc.getDate("date_time");
       }
   
       return eventRec;
   }
   
   public void sellRandomTickets() {
       List<Document> eventTab = getOpenEvents();
       int rowCt = eventTab.size();
       int eventIdx = (int) Math.floor(Math.random() * rowCt);
       Document event = eventTab.get(eventIdx);
       Decimal128 eventId = event.get("id", Decimal128.class);
       Decimal128 ticketHolder = new Decimal128(Math.floor(Math.random() * (g_max_person_id.doubleValue() - g_min_person_id.doubleValue()) + g_min_person_id.doubleValue()));
       int quantity = (int) Math.floor(Math.random() * 5) + 1;
       sellTickets(ticketHolder, eventId, quantity);
   }
   
   public void transferTicket(int ticket_id, int new_ticketholder_id, boolean transfer_all, Double price) {
       int p_ticket_id = ticket_id;
       int p_new_ticketholder_id = new_ticketholder_id;
       Double p_price = price;
       int xferall = transfer_all ? 1 : 0;
       int old_ticketholder_id;
       Date last_txn_date;
   
       List<Document> txfr_cur;
   
       try {
           Document result = db.getCollection("ticketPurchaseHist").aggregate(Arrays.asList(
               Aggregates.match(Filters.eq("sportingEventTicketId", p_ticket_id)),
               Aggregates.group("$ticketholderId", Accumulators.max("transaction_date_time", "$transactionDateTime")),
               Aggregates.lookup("sportingEventTicket", "ticketholderId", "ticketholderId", "ticket"),
               Aggregates.unwind("$ticket"),
               Aggregates.match(Filters.or(
                   Filters.eq("ticket.id", p_ticket_id),
                   Filters.eq("xferall", 1)
               )),
               Aggregates.project(Projections.fields(
                   Projections.computed("transaction_date_time", "$transaction_date_time"),
                   Projections.computed("ticketholder_id", "$ticket.ticketholderId")
               ))
           )).first();
   
           if (result != null) {
               last_txn_date = result.getDate("transaction_date_time");
               old_ticketholder_id = result.getInteger("ticketholder_id");
   
               txfr_cur = db.getCollection("ticketPurchaseHist").find(Filters.and(
                   Filters.eq("purchased_by_id", old_ticketholder_id),
                   Filters.eq("transaction_date_time", last_txn_date)
               )).into(new ArrayList<>());
   
               for (Document xrec : txfr_cur) {
                   db.getCollection("sportingEventTicket").updateOne(
                       Filters.eq("id", xrec.getInteger("sportingEventTicketId")),
                       Updates.set("ticketholder_id", p_new_ticketholder_id)
                   );
   
                   db.getCollection("ticketPurchaseHist").insertOne(new Document()
                       .append("sportingEventTicketId", xrec.getInteger("sportingEventTicketId"))
                       .append("purchased_by_id", p_new_ticketholder_id)
                       .append("transferred_from_id", old_ticketholder_id)
                       .append("transaction_date_time", new Date())
                       .append("purchase_price", p_price != null ? p_price : xrec.getDouble("purchase_price"))
                   );
               }
           }
   
           db.getCollection("sportingEventTicket").getDatabase().runCommand(new Document("commitTransaction", 1));
       } catch (Exception e) {
           db.getCollection("sportingEventTicket").getDatabase().runCommand(new Document("abortTransaction", 1));
       }
   }
   }