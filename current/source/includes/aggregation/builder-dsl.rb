criteria = Tour.where('participant.name' => 'Serenity').
    unwind(:states).
    group(_id: 'states', :states.add_to_set => '$states').
    project(_id: 0, states: 1)

@states = Tour.collection.aggregate(criteria.pipeline).to_json