HauntedHouse house = realm.where(HauntedHouse.class)
        .findFirst();
realm.executeTransaction(r -> {
    Log.v("EXAMPLE", "Number of ghosts: " + house.getGhosts().get()); // 0
    house.getGhosts().increment(1);
    Log.v("EXAMPLE", "Number of ghosts: " + house.getGhosts().get()); // 1
    house.getGhosts().increment(5);
    Log.v("EXAMPLE", "Number of ghosts: " + house.getGhosts().get()); // 6
    house.getGhosts().decrement(2);
    Log.v("EXAMPLE", "Number of ghosts: " + house.getGhosts().get()); // 4
});
