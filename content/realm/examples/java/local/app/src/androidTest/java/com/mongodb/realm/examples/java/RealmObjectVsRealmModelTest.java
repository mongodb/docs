package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.model.java.FrogObjectExample;
import com.mongodb.realm.examples.model.java.FrogRealmModelExample;

import org.junit.Test;

import java.util.concurrent.atomic.AtomicReference;

import javax.annotation.Nullable;

import io.realm.ObjectChangeSet;
import io.realm.Realm;
import io.realm.RealmConfiguration;
import io.realm.RealmModel;
import io.realm.RealmObject;
import io.realm.RealmObjectChangeListener;

public class RealmObjectVsRealmModelTest extends RealmTest {
    @Test
    public void testRealmObjectVsRealmModel() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .name("realmobject.vs.realmmodel")
                    .inMemory()
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();
            Realm realm = Realm.getInstance(config);

            final RealmObjectChangeListener<RealmModel> listener = new RealmObjectChangeListener<RealmModel>() {
                @Override
                public void onChange(RealmModel realmModel, @Nullable ObjectChangeSet changeSet) {
                    Log.v("EXAMPLE", "This will never be called");
                }
            };

            AtomicReference<FrogObjectExample> frogRealmObjectRef = new AtomicReference<FrogObjectExample>();
            AtomicReference<FrogRealmModelExample> frogRealmModelRef = new AtomicReference<FrogRealmModelExample>();
            realm.executeTransaction(r -> {
                frogRealmObjectRef.set(realm.createObject(FrogObjectExample.class));
                frogRealmModelRef.set(realm.createObject(FrogRealmModelExample.class));
            });
            FrogObjectExample frogRealmObject = frogRealmObjectRef.get();
            FrogRealmModelExample frogRealmModel = frogRealmModelRef.get();
            // :snippet-start: realm-object-vs-realm-model
            // With RealmObject
            frogRealmObject.isValid();
            frogRealmObject.addChangeListener(listener);

            // With RealmModel
            RealmObject.isValid(frogRealmModel);
            RealmObject.addChangeListener(frogRealmModel, listener);
            // :snippet-end:
            realm.close();
            expectation.fulfill();
        });
        expectation.await();
    }
}
