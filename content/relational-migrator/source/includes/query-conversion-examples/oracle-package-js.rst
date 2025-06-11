.. code-block:: javascript
   :copyable: false
   
   class TicketManagement {
     constructor(db) {
       this.db = db;
       this.g_max_person_id = null;
       this.g_min_person_id = null;
     }
   
   async sellTickets(person_id, event_id, quantity = 1) {
     const notEnoughSeats = new Error('not_enough_seats');
     const p_person_id = person_id;
     const p_event_id = event_id;
     const p_quantity = quantity;
   
     let r_seat_level, r_seat_section, r_seat_row;
     let event_rec;
   
     try {
       event_rec = await this.get_event_details(p_event_id);
   
       const seatData = await this.db.collection('sportingEventTicket').aggregate([
         { $match: { sportingEventId: p_event_id, ticketholderId: null } },
         { $group: { _id: { seatLevel: "$seatLevel", seatSection: "$seatSection", seatRow: "$seatRow" }, count: { $sum: 1 } } },
         { $match: { count: { $gte: p_quantity } } },
         { $limit: 1 },
         { $project: { _id: 0, seatLevel: "$_id.seatLevel", seatSection: "$_id.seatSection", seatRow: "$_id.seatRow" } }
       ]).toArray();
   
       if (seatData.length === 0) throw notEnoughSeats;
   
       r_seat_level = seatData[0].seatLevel;
       r_seat_section = seatData[0].seatSection;
       r_seat_row = seatData[0].seatRow;
   
       const adjacentSeatsCursor = this.db.collection('sportingEventTicket').find({
         sportingEventId: p_event_id,
         seatLevel: r_seat_level,
         seatSection: r_seat_section,
         seatRow: r_seat_row
       }).sort({ seatLevel: 1, seatSection: 1, seatRow: 1 });
   
       for (let i = 0; i < p_quantity; i++) {
         const cur_ticket = await adjacentSeatsCursor.next();
         if (!cur_ticket) throw notEnoughSeats;
   
         await this.db.collection('sportingEventTicket').updateOne(
           { _id: cur_ticket._id },
           { $set: { ticketholderId: p_person_id } }
         );
   
         await this.db.collection('ticketPurchaseHist').insertOne({
           sportingEventTicketId: cur_ticket.id,
           purchasedById: p_person_id,
           transactionDateTime: new Date(),
           purchasePrice: cur_ticket.ticketPrice
         });
       }
   
     } catch (err) {
       if (err === notEnoughSeats) {
         console.log(`Sorry, there aren't ${p_quantity} adjacent seats for event:`);
         console.log(`   ${event_rec.home_team_name} VS ${event_rec.away_team_name}   (${event_rec.sport_name})`);
         console.log(`   ${event_rec.home_field}:  ${event_rec.date_time.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}`);
       } else {
         throw err;
       }
     }
   }
   
   async $transferTicket(ticket_id, new_ticketholder_id, transfer_all = false, price = null) {
     const p_ticket_id = ticket_id;
     const p_new_ticketholder_id = new_ticketholder_id;
     const p_price = price;
     const xferall = transfer_all ? 1 : 0;
   
     try {
       const ticket = await this.db.collection('sportingEventTicket').findOne({ id: p_ticket_id });
       if (!ticket) throw new Error('Ticket not found');
   
       const lastTransaction = await this.db.collection('ticketPurchaseHist').aggregate([
         { $match: { purchased_by_id: ticket.ticketholderId, $or: [{ sporting_event_ticket_id: p_ticket_id }, { xferall: 1 }] } },
         { $group: { _id: '$ticketholderId', last_txn_date: { $max: '$transaction_date_time' } } }
       ]).toArray();
   
       if (lastTransaction.length === 0) throw new Error('No transaction found');
   
       const old_ticketholder_id = ticket.ticketholderId;
       const last_txn_date = lastTransaction[0].last_txn_date;
   
       const transactions = await this.db.collection('ticketPurchaseHist').find({
         purchased_by_id: old_ticketholder_id,
         transaction_date_time: last_txn_date
       }).toArray();
   
       for (const xrec of transactions) {
         await this.db.collection('sportingEventTicket').updateOne(
           { id: xrec.sporting_event_ticket_id },
           { $set: { ticketholderId: p_new_ticketholder_id } }
         );
   
         await this.db.collection('ticketPurchaseHist').insertOne({
           sporting_event_ticket_id: xrec.sporting_event_ticket_id,
           purchased_by_id: p_new_ticketholder_id,
           transferred_from_id: old_ticketholder_id,
           transaction_date_time: new Date(),
           purchase_price: p_price !== null ? p_price : xrec.purchase_price
         });
       }
     } catch (error) {
       console.error(error);
       throw error;
     }
   }
   
   async generateTicketActivity(transaction_delay, max_transactions = 1000) {
     let txn_count = 0;
     while (txn_count < max_transactions) {
       await this.sellRandomTickets();
       txn_count += 1;
       await new Promise(resolve => setTimeout(resolve, transaction_delay * 1000));
     }
   }
   
   async generateTransferActivity(transaction_delay = 5, max_transactions = 100) {
     let txn_count = 0;
     let min_tik_id, max_tik_id, tik_id, new_ticketholder, xfer_all, chg_price, new_price;
   
     while (txn_count < max_transactions) {
       const minMaxResult = await this.db.collection('ticketPurchaseHist').aggregate([
         {
           $group: {
             _id: null,
             min_tik_id: { $min: "$sportingEventTicketId" },
             max_tik_id: { $max: "$sportingEventTicketId" }
           }
         }
       ]).toArray();
   
       if (minMaxResult.length === 0) {
         console.log('No tickets available to transfer.');
         return;
       }
   
       min_tik_id = minMaxResult[0].min_tik_id;
       max_tik_id = minMaxResult[0].max_tik_id;
   
       const tikResult = await this.db.collection('ticketPurchaseHist').aggregate([
         {
           $match: {
             sportingEventTicketId: { $lte: Math.random() * (max_tik_id - min_tik_id) + min_tik_id }
           }
         },
         {
           $group: {
             _id: null,
             tik_id: { $max: "$sportingEventTicketId" }
           }
         }
       ]).toArray();
   
       if (tikResult.length === 0) {
         console.log('No tickets available to transfer.');
         return;
       }
   
       tik_id = tikResult[0].tik_id;
   
       new_ticketholder = Math.floor(Math.random() * (this.g_max_person_id - this.g_min_person_id) + this.g_min_person_id);
   
       xfer_all = Math.round(Math.random() * 4) < 4;
   
       new_price = null;
   
       chg_price = Math.round(Math.random() * 2) === 0;
       if (chg_price) {
         const priceResult = await this.db.collection('sportingEventTicket').findOne({ id: tik_id });
         new_price = Math.random() * (1.2 - 0.8) + 0.8 * priceResult.ticketPrice;
       }
   
       await this.transferTicket(tik_id, new_ticketholder, xfer_all, new_price);
   
       txn_count++;
       await new Promise(resolve => setTimeout(resolve, transaction_delay * 1000));
     }
   }
   
   async $get_event_details(event_id) {
     const p_event_id = event_id;
     const result = await this.db.collection('sportingEvent').aggregate([
       {
         $match: { id: p_event_id }
       },
       {
         $lookup: {
           from: 'sportTeam',
           localField: 'homeTeamId',
           foreignField: 'id',
           as: 'home_team'
         }
       },
       {
         $lookup: {
           from: 'sportTeam',
           localField: 'awayTeamId',
           foreignField: 'id',
           as: 'away_team'
         }
       },
       {
         $lookup: {
           from: 'sportLocation',
           localField: 'locationId',
           foreignField: 'id',
           as: 'location'
         }
       },
       {
         $unwind: '$home_team'
       },
       {
         $unwind: '$away_team'
       },
       {
         $unwind: '$location'
       },
       {
         $project: {
           sport_name: '$sportTypeName',
           home_team_name: '$home_team.name',
           away_team_name: '$away_team.name',
           home_field: '$location.name',
           date_time: '$startDateTime'
         }
       }
     ]).toArray();
   
     if (result.length === 0) {
       throw new Error('Event not found');
     }
   
     return result[0];
   }
   
   async sellRandomTickets() {
     const eventTab = await this.get_open_events();
     const row_ct = eventTab.length;
     const event_idx = Math.floor(Math.random() * row_ct);
     const event_id = eventTab[event_idx].id;
     const ticket_holder = Math.floor(Math.random() * (this.g_max_person_id - this.g_min_person_id + 1)) + this.g_min_person_id;
     const quantity = Math.floor(Math.random() * 6) + 1;
     await this.sellTickets(ticket_holder, event_id, quantity);
   }
   
   async get_open_events() {
     const openEvents = await this.db.collection('sportingEvent').find({ soldOut: 0 }).sort({ startDateTime: 1 }).toArray();
     return openEvents;
   }
   }