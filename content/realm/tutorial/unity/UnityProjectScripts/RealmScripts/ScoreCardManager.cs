using UnityEngine;
using UnityEngine.UIElements;
using System.ComponentModel;

public class ScoreCardManager : MonoBehaviour
{
    private static VisualElement root;
    private static Label scoreCardHeader;
    private static string username;
    private static Stat currentStat;

    private static PropertyChangedEventHandler propertyHandler;

    #region PublicMethods
    // SetCurrentStat() sets the current playthrough Stat object
    // and calls UpdateCurrentStats() to update the UI
    public static void SetCurrentStat(Stat newStat)
    {
        // called when the game has reset
        currentStat = newStat;
        UpdateCurrentStats();
    }
    // SetLoggedInUser() sets values that are displayed in the ScoreCard UI,
    // such as the username and current Stat, and calls
    // WatchForChangesToCurrentStats to watch for changes to the current Stat
    // object
    public static void SetLoggedInUser(string loggedInUser)
    {
        username = loggedInUser;
        currentStat = RealmController.currentStat;
        UpdateCurrentStats(); // set initial stats
        WatchForChangesToCurrentStats();
    }

    // UnRegisterListener() removes a property handler on the current
    // playthrough Stat object and resets the ScoreCard UI to it's initial
    // values
    public static void UnRegisterListener()
    {
        // unregister when the player has lost
        currentStat.PropertyChanged -= propertyHandler;
        scoreCardHeader.text = username + "\n" +
        "Enemies Defeated: " + 0 + "\n" +
        "Tokens Collected: " + 0 + "\n" +
        "Current Score: " + 0;

    }
    // UpdateCurrentStats() updates the EnemiesDefeated,TokensCollected, and
    // Score in the UI
    private static void UpdateCurrentStats() // updates stats in UI
    {
        scoreCardHeader.text = username + "\n" +
        "Enemies Defeated: " + currentStat.EnemiesDefeated + "\n" +
        "Tokens Collected: " + currentStat.TokensCollected + "\n" +
        "Current Score: " + currentStat.Score;
    }

    // WatchForChangesToCurrentStats() defines a property
    // handler on the current playthrough Stat object
    public static void WatchForChangesToCurrentStats()
    {
        // create a listener that responds to changes to the particular stats for this run/playthrough
        // :state-start: start
        // TODO: Create a listener that reacts to changes to the currentStat and
        // calls UpdateCurrentStats() to update the UI when stats are changed
        // :state-end:
        // :snippet-start: watch-for-changes-stat-propery-changed
        // :state-start: local sync
        propertyHandler = new PropertyChangedEventHandler((sender, e) => UpdateCurrentStats());
        currentStat.PropertyChanged += propertyHandler;
        // :state-end:
        // :snippet-end:
    }
    #endregion

    #region UnityLifecycleMethods
    private void Start()
    {
        root = GetComponent<UIDocument>().rootVisualElement;
        scoreCardHeader = root.Q<Label>("score-card-header");
    }
    #endregion
}