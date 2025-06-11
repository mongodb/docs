.. code-block:: sql
   :copyable: false

   CREATE OR REPLACE EDITIONABLE PACKAGE "TICKETMANAGEMENT" IS
     procedure sellTickets(person_id IN NUMBER, event_id IN NUMBER, quantity IN NUMBER DEFAULT 1);
     procedure generateTicketActivity(transaction_delay NUMBER, max_transactions IN NUMBER DEFAULT 1000);
     procedure generateTransferActivity(transaction_delay IN NUMBER DEFAULT 5, max_transactions IN NUMBER DEFAULT 100);
   end ticketManagement;
   /

   CREATE OR REPLACE EDITIONABLE PACKAGE BODY "TICKETMANAGEMENT" AS
   -- forward type declaration
     TYPE eventTab IS TABLE OF sporting_event%ROWTYPE INDEX BY BINARY_INTEGER;
     TYPE eventRecType IS RECORD ( sport_name sport_type.name%TYPE,
                                   home_team_name sport_team.name%TYPE,
                                   away_team_name sport_team.name%TYPE,
                                   home_field     sport_location.name%TYPE,
                                   date_time      sporting_event.start_date_time%TYPE);
   
   -- package variables
     g_max_person_id person.id%TYPE;
     g_min_person_id person.id%TYPE;
  
   -- forward declarations
     function get_open_events return eventTab;
     function get_event_details(event_id IN NUMBER) RETURN eventRecType;
     procedure sellRandomTickets;

   --------------------------------
   -- sell tickets proc
   -------------------------------- 
   procedure sellTickets(person_id IN NUMBER, event_id IN NUMBER, quantity IN NUMBER DEFAULT 1) IS
     not_enough_seats EXCEPTION;
     
     p_person_id person.id%TYPE := person_id;
     p_event_id sporting_event.id%TYPE := event_id;
     p_quantity NUMBER := quantity;
     
     r_seat_level   sporting_event_ticket.seat_level%TYPE;
     r_seat_section sporting_event_ticket.seat_section%type;
     r_seat_row     sporting_event_ticket.seat_row%type;
     
     event_rec eventRecType;
     
     CURSOR adjacent_seats(p_seat_level NUMBER, p_seat_section VARCHAR2, p_seat_row VARCHAR2) IS
     SELECT * FROM sporting_event_ticket
     WHERE sporting_event_id = p_event_id
     AND   seat_level = p_seat_level
     AND   seat_section = p_seat_section
     AND   seat_row = p_seat_row
     ORDER BY  seat_level, seat_section, seat_row
     FOR UPDATE OF ticketholder_id;
     
     cur_ticket sporting_event_ticket%ROWTYPE;
   
   BEGIN
     event_rec := get_event_details(p_event_id);
     BEGIN
       SELECT seat_level, seat_section, seat_row
       INTO  r_seat_level, r_seat_section, r_seat_row
       FROM (SELECT seat_level,seat_section,seat_row
             FROM sporting_event_ticket
             WHERE sporting_event_id = p_event_id
             AND   ticketholder_id IS NULL
             GROUP BY seat_level,seat_section,seat_row
             HAVING COUNT(*) >= p_quantity)
       WHERE rownum < 2;
     EXCEPTION WHEN NO_DATA_FOUND THEN
       RAISE not_enough_seats;
     END;
     
     OPEN adjacent_seats(r_seat_level,r_seat_section,r_seat_row);
     
     FOR i IN 1..p_quantity LOOP
       
       FETCH adjacent_seats INTO cur_ticket;
       UPDATE sporting_event_ticket
       SET    ticketholder_id = p_person_id
       WHERE CURRENT OF adjacent_seats;
       
       INSERT INTO ticket_purchase_hist(sporting_event_ticket_id, purchased_by_id, transaction_date_time, purchase_price)
       VALUES(cur_ticket.id, p_person_id, SYSDATE, cur_ticket.ticket_price);
     
     END LOOP;
     COMMIT;
   
   EXCEPTION WHEN not_enough_seats THEN
     DBMS_OUTPUT.PUT_LINE('Sorry, there aren''t ' || p_quantity || ' adjacent seats for event:');
     DBMS_OUTPUT.PUT_LINE('   ' || event_rec.home_team_name || ' VS ' || event_rec.away_team_name || '   (' || event_rec.sport_name || ')' );
     DBMS_OUTPUT.PUT_LINE('   ' || event_rec.home_field || ':  ' || TO_CHAR(event_rec.date_time,'DD-MON-YYYY HH:MI'));
   END;

   --------------------------------
   -- transfer ticket
   --------------------------------
   procedure transferTicket(ticket_id IN NUMBER, new_ticketholder_id IN NUMBER, transfer_all IN BOOLEAN DEFAULT FALSE, price IN NUMBER DEFAULT NULL) IS
     p_ticket_id           NUMBER := ticket_id;
     p_new_ticketholder_id NUMBER := new_ticketholder_id;
     p_price               NUMBER := price;
     xferall               NUMBER := 0;
     old_ticketholder_id   NUMBER;
     
     last_txn_date         DATE;
     
     CURSOR txfr_cur(p_purchased_by NUMBER, p_txn_date_time DATE) IS
     SELECT * FROM ticket_purchase_hist
     WHERE  purchased_by_id = p_purchased_by
     AND    transaction_date_time = p_txn_date_time;
   
   BEGIN
     IF transfer_all THEN
       xferall := 1;
     END IF;
     
     SELECT max(h.transaction_date_time) as transaction_date_time
           ,t.ticketholder_id as ticketholder_id
     INTO  last_txn_date, old_ticketholder_id
     FROM   ticket_purchase_hist h
           ,sporting_event_ticket t
     WHERE  t.id = p_ticket_id
     AND    h.purchased_by_id = t.ticketholder_id
     AND    ((h.sporting_event_ticket_id = p_ticket_id) OR (xferall = 1) )
     GROUP BY t.ticketholder_id;
     
     FOR xrec IN txfr_cur(old_ticketholder_id, last_txn_date) LOOP
       UPDATE sporting_event_ticket
       SET    ticketholder_id = p_new_ticketholder_id
       WHERE  id = xrec.sporting_event_ticket_id;
       
       INSERT INTO ticket_purchase_hist(sporting_event_ticket_id, purchased_by_id, transferred_from_id, transaction_date_time, purchase_price)
       VALUES(xrec.sporting_event_ticket_id,  p_new_ticketholder_id, old_ticketholder_id, SYSDATE, NVL(p_price,xrec.purchase_price));
     
     END LOOP;
     
     COMMIT;  -- commit the group
   
   EXCEPTION WHEN OTHERS THEN
     ROLLBACK;
   END;

   ---------------------------------------
   -- generate ticket purchase activity
   ---------------------------------------
   PROCEDURE generateTicketActivity(transaction_delay NUMBER, max_transactions IN NUMBER DEFAULT 1000) IS
    txn_count NUMBER := 0;
   BEGIN
     WHILE txn_count < max_transactions LOOP
       sellRandomTickets;
       txn_count := txn_count +1;
       dbms_lock.sleep(transaction_delay);
     END LOOP;
   END;

   ---------------------------------------
   -- generate ticket purchase activity
   ---------------------------------------
   PROCEDURE generateTransferActivity(transaction_delay IN NUMBER DEFAULT 5, max_transactions IN NUMBER DEFAULT 100) IS
     txn_count NUMBER := 0;
     min_tik_id sporting_event_ticket.id%TYPE;
     max_tik_id sporting_event_ticket.id%TYPE;
     tik_id     sporting_event_ticket.id%TYPE;
     new_ticketholder person.id%TYPE;
     xfer_all  BOOLEAN;
     chg_price BOOLEAN;
     new_price sporting_event_ticket.ticket_price%TYPE;
   
   
   BEGIN
     WHILE txn_count < max_transactions LOOP
         SELECT min(sporting_event_ticket_id), max(sporting_event_ticket_id)
         INTO   min_tik_id, max_tik_id
         FROM  ticket_purchase_hist;
         
         SELECT MAX(sporting_event_ticket_id)
         INTO   tik_id
         FROM   ticket_purchase_hist
         WHERE  sporting_event_ticket_id <= dbms_random.value(min_tik_id,max_tik_id);
         
         new_ticketholder := TRUNC(dbms_random.value(g_min_person_id,g_max_person_id));
         
         xfer_all := (ROUND(dbms_random.value(1,5)) < 5);   -- transfer all tickets 80% of the time
         
         new_price := NULL;
         
         chg_price := (ROUND(dbms_random.value(1,3)) = 1);  --  30% of the time change price
         IF chg_price  THEN
           SELECT dbms_random.value(0.8,1.2) * ticket_price INTO new_price
           FROM   sporting_event_ticket
           WHERE  id = tik_id;
         END IF;
         
         transferTicket(tik_id, new_ticketholder, xfer_all, new_price);
         
         txn_count := txn_count +1;
         dbms_lock.sleep(transaction_delay);
       END LOOP;
   
   EXCEPTION WHEN NO_DATA_FOUND THEN
       dbms_output.put_line('No tickets available to transfer.');
   END;   

   --------------------------------
   -- get event details
   --------------------------------
   function get_event_details(event_id IN NUMBER) RETURN eventRecType IS
     eventRec eventRecType;
     p_event_id sporting_event.id%TYPE := event_id;
   BEGIN
     SELECT e.sport_type_name
           ,h.name
           ,a.name
           ,l.name
           ,e.start_date_time
     INTO eventRec.sport_name, eventRec.home_team_name, eventRec.away_team_name, eventRec.home_field, eventRec.date_time
     FROM sporting_event e
         ,sport_team h
         ,sport_team a
         ,sport_location l
     WHERE e.id = p_event_id
     AND e.home_team_id = h.id
     AND e.away_team_id = a.id
     AND e.location_id = l.id;
    
    RETURN eventRec;
   END;

   --------------------------------
   -- sell random tickets proc
   --------------------------------
   procedure sellRandomTickets IS
     event_tab eventTab;
     ticket_holder person.id%TYPE;
     
     row_ct NUMBER(8);
     event_idx NUMBER(8);
     event_id NUMBER;
     quantity NUMBER;
   BEGIN
       event_tab := get_open_events;
       row_ct    := event_tab.COUNT;
       event_idx := TRUNC(dbms_random.value(1,row_ct));
       event_id := event_tab(event_idx).id;
       ticket_holder := TRUNC(dbms_random.value(g_min_person_id,g_max_person_id));
       quantity := dbms_random.value(1,6);
       sellTickets(ticket_holder,event_id,quantity);
   END;

   ---------------------------------------
   -- get open events function
   ---------------------------------------
     function get_open_events return eventTab IS
       event_tab eventTab;
       
       CURSOR open_events IS
       SELECT *
       FROM   sporting_event
       WHERE  sold_out = 0
       ORDER BY start_date_time;
       row_num BINARY_INTEGER := 1;
     BEGIN
       FOR oe_rec IN open_events LOOP
         event_tab(row_num) := oe_rec;
         row_num := row_num +1;
       END LOOP;
       return event_tab;
     END;
   
   BEGIN
       --- initialize
       select min(id),max(id) INTO g_min_person_id,g_max_person_id from person;
   
   END ticketManagement;
   /