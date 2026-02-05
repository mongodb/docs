session = client.start_session
session.with_transaction do
  collection.insert_one({ name: 'Alice' }, session: session)
  collection.update_one(
    { name: 'Bob' }, 
    { '$set' => { age: 30 } }, 
    session: session
  )
end
