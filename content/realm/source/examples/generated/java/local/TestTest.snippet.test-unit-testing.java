import android.content.Context;

import com.mongodb.realm.examples.java.UnitTestActivity;
import com.mongodb.realm.examples.model.java.Cat;

import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.powermock.core.classloader.annotations.PowerMockIgnore;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.core.classloader.annotations.SuppressStaticInitializationFor;
import org.powermock.modules.junit4.rule.PowerMockRule;
import org.robolectric.Robolectric;
import org.robolectric.RobolectricTestRunner;
import org.robolectric.RuntimeEnvironment;
import org.robolectric.annotation.Config;

import java.util.Arrays;
import java.util.List;

import io.realm.Realm;
import io.realm.RealmConfiguration;
import io.realm.RealmObject;
import io.realm.RealmQuery;
import io.realm.RealmResults;
import io.realm.internal.RealmCore;
import io.realm.log.RealmLog;

import com.mongodb.realm.examples.R;

import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyInt;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.doCallRealMethod;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.powermock.api.mockito.PowerMockito.doNothing;
import static org.powermock.api.mockito.PowerMockito.mock;
import static org.powermock.api.mockito.PowerMockito.mockStatic;
import static org.powermock.api.mockito.PowerMockito.when;
import static org.powermock.api.mockito.PowerMockito.whenNew;

@RunWith(RobolectricTestRunner.class)
@Config(sdk = 28)
@PowerMockIgnore({"org.mockito.*", "org.robolectric.*", "android.*", "jdk.internal.reflect.*", "androidx.*"})
@SuppressStaticInitializationFor("io.realm.internal.Util")
@PrepareForTest({Realm.class, RealmConfiguration.class, RealmQuery.class, RealmResults.class, RealmCore.class, RealmLog.class})
public class TestTest {
    // bootstrap powermock
    @Rule
    public PowerMockRule rule = new PowerMockRule();

    // mocked realm SDK components for tests
    private Realm mockRealm;
    private RealmResults<Cat> cats;

    @Before
    public void setup() throws Exception {
        // set up realm SDK components to be mocked. The order of these matters
        mockStatic(RealmCore.class);
        mockStatic(RealmLog.class);
        mockStatic(Realm.class);
        mockStatic(RealmConfiguration.class);
        Realm.init(RuntimeEnvironment.application);
        // boilerplate to mock realm components -- this prevents us from hitting any
        // native code
        doNothing().when(RealmCore.class);
        RealmCore.loadLibrary(any(Context.class));

        // create the mocked realm
        final Realm mockRealm = mock(Realm.class);
        final RealmConfiguration mockRealmConfig = mock(RealmConfiguration.class);
        // use this mock realm config for all new realm configurations
        whenNew(RealmConfiguration.class).withAnyArguments().thenReturn(mockRealmConfig);
        // use this mock realm for all new default realms
        when(Realm.getDefaultInstance()).thenReturn(mockRealm);

        // any time we ask Realm to create a Cat, return a new instance.
        when(mockRealm.createObject(Cat.class)).thenReturn(new Cat());

        // set up test data
        Cat p1 = new Cat();
        p1.setName("Enoch");
        Cat p2 = new Cat();
        p2.setName("Quincy Endicott");
        Cat p3 = new Cat();
        p3.setName("Sara");
        Cat p4 = new Cat();
        p4.setName("Jimmy Brown");
        List<Cat> catList = Arrays.asList(p1, p2, p3, p4);

        // create a mocked RealmQuery
        RealmQuery<Cat> catQuery = mockRealmQuery();
        // when the RealmQuery performs findFirst, return the first record in the list.
        when(catQuery.findFirst()).thenReturn(catList.get(0));
        // when the where clause is called on the Realm, return the mock query.
        when(mockRealm.where(Cat.class)).thenReturn(catQuery);
        // when the RealmQuery is filtered on any string and any integer, return the query
        when(catQuery.equalTo(anyString(), anyInt())).thenReturn(catQuery);
        // when a between query is performed with any string as the field and any int as the
        // value, then return the catQuery itself
        when(catQuery.between(anyString(), anyInt(), anyInt())).thenReturn(catQuery);
        // When a beginsWith clause is performed with any string field and any string value
        // return the same cat query
        when(catQuery.beginsWith(anyString(), anyString())).thenReturn(catQuery);

        // RealmResults is final, must mock static and also place this in the PrepareForTest
        // annotation array.
        mockStatic(RealmResults.class);
        // create a mock RealmResults
        RealmResults<Cat> cats = mockRealmResults();
        // the for(...) loop in Java needs an iterator, so we're giving it one that has items,
        // since the mock RealmResults does not provide an implementation. Therefore, any time
        // anyone asks for the RealmResults Iterator, give them a functioning iterator from the
        // ArrayList of Cats we created above. This will allow the loop to execute.
        when(cats.iterator()).thenReturn(catList.iterator());
        // Return the size of the mock list.
        when(cats.size()).thenReturn(catList.size());

        // when we ask Realm for all of the Cat instances, return the mock RealmResults
        when(mockRealm.where(Cat.class).findAll()).thenReturn(cats);
        // when we ask the RealmQuery for all of the Cat objects, return the mock RealmResults
        when(catQuery.findAll()).thenReturn(cats);

        this.mockRealm = mockRealm;
        this.cats = cats;
    }

    @Test
    public void shouldBeAbleToAccessActivityAndVerifyRealmInteractions() {
        doCallRealMethod().when(mockRealm)
                .executeTransaction(any(Realm.Transaction.class));

        // create test activity --  onCreate method calls methods that
        // query/write to realm
        UnitTestActivity activity = Robolectric
                .buildActivity(UnitTestActivity.class)
                .create()
                .start()
                .resume()
                .visible()
                .get();

        // click the clean up button
        activity.findViewById(R.id.clean_up).performClick();

        // verify that we queried for Cat instances five times in this run
        // (2 in basicCrud(), 2 in complexQuery() and 1 in the button click)
        verify(mockRealm, times(5)).where(Cat.class);

        // verify that the delete method was called. We also call delete at
        // the start of the activity to ensure we start with a clean db.
        verify(mockRealm, times(2)).delete(Cat.class);

        // call the destroy method so we can verify that the .close() method
        // was called (below)
        activity.onDestroy();

        // verify that the realm got closed 2 separate times. Once in the
        // AsyncTask, once in onDestroy
        verify(mockRealm, times(2)).close();
    }

    @SuppressWarnings("unchecked")
    private <T extends RealmObject> RealmQuery<T> mockRealmQuery() {
        return mock(RealmQuery.class);
    }

    @SuppressWarnings("unchecked")
    private <T extends RealmObject> RealmResults<T> mockRealmResults() {
        return mock(RealmResults.class);
    }
}
