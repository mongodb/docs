var myObject = realm.Find<MyRealmClass>(id);
// myObject.Counter == 0

realm.Write(() =>
{
    // Increment the value of the RealmInteger
    myObject.Counter.Increment(); // 1
    myObject.Counter.Increment(5); // 6

    // Decrement the value of the RealmInteger
    // Note the use of Increment with a negative number
    myObject.Counter.Decrement(); // 5
    myObject.Counter.Increment(-3); // 2

    // Reset the RealmInteger
    myObject.Counter = 0;

    // RealmInteger<T> is implicitly convertable to T:
    int bar = myObject.Counter;
});
