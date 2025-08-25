package kotlin
// :snippet-start: test-unit-testing
import android.content.Context
import android.view.View
import com.mongodb.realm.examples.R
import com.mongodb.realm.examples.kotlin.UnitTestActivity
import com.mongodb.realm.examples.model.java.Cat
import io.realm.Realm
import io.realm.RealmConfiguration
import io.realm.RealmObject
import io.realm.RealmQuery
import io.realm.RealmResults
import io.realm.internal.RealmCore
import io.realm.log.RealmLog
import java.lang.Exception
import java.util.*
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.ArgumentMatchers
import org.mockito.Mockito
import org.powermock.api.mockito.PowerMockito
import org.powermock.core.classloader.annotations.PowerMockIgnore
import org.powermock.core.classloader.annotations.PrepareForTest
import org.powermock.core.classloader.annotations.SuppressStaticInitializationFor
import org.powermock.modules.junit4.rule.PowerMockRule
import org.robolectric.Robolectric
import org.robolectric.RobolectricTestRunner
import org.robolectric.RuntimeEnvironment
import org.robolectric.annotation.Config

// :snippet-start: annotations
@RunWith(RobolectricTestRunner::class)
@Config(sdk = [28])
@PowerMockIgnore(
    "org.mockito.*",
    "org.robolectric.*",
    "android.*",
    "jdk.internal.reflect.*",
    "androidx.*"
)
@SuppressStaticInitializationFor("io.realm.internal.Util")
@PrepareForTest(
    Realm::class,
    RealmConfiguration::class,
    RealmQuery::class,
    RealmResults::class,
    RealmCore::class,
    RealmLog::class
)
// :snippet-end:
class TestTest {
    // :snippet-start: bootstrap-powermock
    // bootstrap powermock
    @Rule
    var rule = PowerMockRule()

    // :snippet-end:
    // mocked realm SDK components for tests
    private var mockRealm: Realm? = null
    private var cats: RealmResults<Cat>? = null
    @Before
    @Throws(Exception::class)
    fun setup() {
        // :snippet-start: mock-realm-components
        // set up realm SDK components to be mocked. The order of these matters
        PowerMockito.mockStatic(RealmCore::class.java)
        PowerMockito.mockStatic(RealmLog::class.java)
        PowerMockito.mockStatic(Realm::class.java)
        PowerMockito.mockStatic(RealmConfiguration::class.java)
        Realm.init(RuntimeEnvironment.application)
        PowerMockito.doNothing().`when`(RealmCore::class.java)
        RealmCore.loadLibrary(ArgumentMatchers.any(Context::class.java))
        // :snippet-end:

        // :snippet-start: mock-a-realm
        // create the mocked realm
        val mockRealm = PowerMockito.mock(Realm::class.java)
        val mockRealmConfig = PowerMockito.mock(
            RealmConfiguration::class.java
        )
        // use this mock realm config for all new realm configurations
        PowerMockito.whenNew(RealmConfiguration::class.java).withAnyArguments()
            .thenReturn(mockRealmConfig)
        // use this mock realm for all new default realms
        PowerMockito.`when`(Realm.getDefaultInstance()).thenReturn(mockRealm)
        // :snippet-end:

        // any time we ask Realm to create a Cat, return a new instance.
        PowerMockito.`when`(mockRealm.createObject(Cat::class.java)).thenReturn(Cat())

        // set up test data
        val p1 = Cat()
        p1.name = "Enoch"
        val p2 = Cat()
        p2.name = "Quincy Endicott"
        val p3 = Cat()
        p3.name = "Sara"
        val p4 = Cat()
        p4.name = "Jimmy Brown"
        val catList = Arrays.asList(p1, p2, p3, p4)

        // create a mocked RealmQuery
        val catQuery = mockRealmQuery<Cat>()
        // when the RealmQuery performs findFirst, return the first record in the list.
        PowerMockito.`when`(catQuery!!.findFirst()).thenReturn(catList[0])
        // when the where clause is called on the Realm, return the mock query.
        PowerMockito.`when`(mockRealm.where(Cat::class.java)).thenReturn(catQuery)
        // when the RealmQuery is filtered on any string and any integer, return the query
        PowerMockito.`when`(
            catQuery.equalTo(
                ArgumentMatchers.anyString(),
                ArgumentMatchers.anyInt()
            )
        ).thenReturn(catQuery)
        // when a between query is performed with any string as the field and any int as the
        // value, then return the catQuery itself
        PowerMockito.`when`(
            catQuery.between(
                ArgumentMatchers.anyString(),
                ArgumentMatchers.anyInt(),
                ArgumentMatchers.anyInt()
            )
        ).thenReturn(catQuery)
        // When a beginsWith clause is performed with any string field and any string value
        // return the same cat query
        PowerMockito.`when`(
            catQuery.beginsWith(
                ArgumentMatchers.anyString(),
                ArgumentMatchers.anyString()
            )
        ).thenReturn(catQuery)

        // RealmResults is final, must mock static and also place this in the PrepareForTest
        // annotation array.
        PowerMockito.mockStatic(RealmResults::class.java)
        // create a mock RealmResults
        val cats = mockRealmResults<Cat>()
        // the for(...) loop in Java needs an iterator, so we're giving it one that has items,
        // since the mock RealmResults does not provide an implementation. Therefore, any time
        // anyone asks for the RealmResults Iterator, give them a functioning iterator from the
        // ArrayList of Cats we created above. This will allow the loop to execute.
        PowerMockito.`when`<Iterator<Cat>>(cats!!.iterator()).thenReturn(catList.iterator())
        // Return the size of the mock list.
        PowerMockito.`when`(cats.size).thenReturn(catList.size)

        // when we ask Realm for all of the Cat instances, return the mock RealmResults
        PowerMockito.`when`(mockRealm.where(Cat::class.java).findAll()).thenReturn(cats)
        // when we ask the RealmQuery for all of the Cat objects, return the mock RealmResults
        PowerMockito.`when`(catQuery.findAll()).thenReturn(cats)
        this.mockRealm = mockRealm
        this.cats = cats
    }

    @Test
    fun shouldBeAbleToAccessActivityAndVerifyRealmInteractions() {
        Mockito.doCallRealMethod().`when`(mockRealm)!!
            .executeTransaction(ArgumentMatchers.any(Realm.Transaction::class.java))

        // create test activity --  onCreate method calls methods that
        // query/write to realm
        val activity = Robolectric
            .buildActivity(UnitTestActivity::class.java)
            .create()
            .start()
            .resume()
            .visible()
            .get()

        // click the clean up button
        activity.findViewById<View>(R.id.clean_up).performClick()

        // verify that we queried for Cat instances five times in this run
        // (2 in basicCrud(), 2 in complexQuery() and 1 in the button click)
        Mockito.verify(mockRealm, Mockito.times(5))!!.where(Cat::class.java)

        // verify that the delete method was called. We also call delete at
        // the start of the activity to ensure we start with a clean db.
        Mockito.verify(mockRealm, Mockito.times(2))!!.delete(Cat::class.java)

        // call the destroy method so we can verify that the .close() method
        // was called (below)
        activity.onDestroy()

        // verify that the realm got closed 2 separate times. Once in the
        // AsyncTask, once in onDestroy
        Mockito.verify(mockRealm, Mockito.times(2))!!.close()
    }

    private fun <T : RealmObject?> mockRealmQuery(): RealmQuery<T>? {
        @Suppress("UNCHECKED_CAST")
        return PowerMockito.mock(RealmQuery::class.java) as RealmQuery<T>
    }

    private fun <T : RealmObject?> mockRealmResults(): RealmResults<T>? {
        @Suppress("UNCHECKED_CAST")
        return PowerMockito.mock(RealmResults::class.java) as RealmResults<T>
    }
}
// :snippet-end: