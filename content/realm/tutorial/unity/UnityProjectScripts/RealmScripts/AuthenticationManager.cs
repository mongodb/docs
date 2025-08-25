using System;
using UnityEngine;
using UnityEngine.UIElements;

public class AuthenticationManager : MonoBehaviour
{

    private static VisualElement root;
    private static VisualElement authWrapper;
    private static Label subtitle;
    private static Button startButton;
    private static Button logoutButton;
    private static string loggedInUser;
    private static TextField userInput;
    // (Part 2 Sync): isInRegistrationMode is used to toggle between
    // authentication modes
    private static bool isInRegistrationMode = false;
    // (Part 2 Sync): passInput represents the password input
    private static TextField passInput;

    // (Part 2 Sync): toggleLoginOrRegisterUIButton is the button to toggle
    // between login or registration modes
    private static Button toggleLoginOrRegisterUIButton;

    #region PrivateMethods
    private static void HideAuthenticationUI()
    {
        authWrapper.AddToClassList("hide");
        logoutButton.AddToClassList("show");
    }

    // :state-start: start local
    // OnPressLogin() passes the username to the RealmController,
    // ScoreCardManager, and LeaderboardManager
    private static void OnPressLogin()
    {
        try
        {
            HideAuthenticationUI();
            loggedInUser = userInput.value;
            RealmController.SetLoggedInUser(loggedInUser);
            ScoreCardManager.SetLoggedInUser(loggedInUser);
            LeaderboardManager.Instance.SetLoggedInUser(loggedInUser);
        }
        catch (Exception ex)
        {
            Debug.Log("an exception was thrown:" + ex.Message);
        }
    }
    // :state-end:

    // :snippet-start: add-sync-login-click-handler
    // :state-start: sync
    // OnPressLoginWithBackend() is an asynchronous method that calls
    // RealmController.SetLoggedInUser to login and passes the currentPlayer to
    // ScoreCardManager and LeaderboardManager; once logged in the login screen
    // is hidden and the logout button is shown
    private static async void OnPressLoginWithBackend()
    {
        try
        {
            var currentPlayer = await RealmController.SetLoggedInUser(userInput.value, passInput.value);
            if (currentPlayer != null)
            {
                HideAuthenticationUI();
            }
            ScoreCardManager.SetLoggedInUser(currentPlayer.Name);
            LeaderboardManager.Instance.SetLoggedInUser(currentPlayer.Name);
        }
        catch (Exception ex)
        {
            Debug.Log("an exception was thrown:" + ex.Message);
        }
    }
    // :state-end:
    // :snippet-end:

    // :snippet-start: add-sync-register-click-handler
    // :state-start: sync
    // OnPressRegister() passes RealmController.OnPressRegister() the values of
    // the userInput and  passInput TextFields in order to register a user
    private static async void OnPressRegister()
    {
        try
        {
            var currentPlayer = await RealmController.OnPressRegister(userInput.value, passInput.value);

            if (currentPlayer != null)
            {
                HideAuthenticationUI();
            }
            ScoreCardManager.SetLoggedInUser(currentPlayer.Name);
            LeaderboardManager.Instance.SetLoggedInUser(currentPlayer.Name);

        }
        catch (Exception ex)
        {
            Debug.Log("an exception was thrown:" + ex.Message);
        }
    }
    // :state-end:
    // :snippet-end:

    // :snippet-start: add-sync-togglable-ui-methods
    // :state-start: sync
    // SwitchToLoginUI() switches the UI to the Login UI mode
    private static void SwitchToLoginUI()
    {
        subtitle.text = "Login";
        startButton.text = "Login & Start Game";
        toggleLoginOrRegisterUIButton.text = "Don't have an account yet? Register";
    }
    // SwitchToRegisterUI() switches the UI to the Register UI mode
    private static void SwitchToRegisterUI()
    {
        subtitle.text = "Register";
        startButton.text = "Signup & Start Game";
        toggleLoginOrRegisterUIButton.text = "Have an account already? Login";
    }
    // :state-end:
    // :snippet-end:
    #endregion
    #region UnityLifecycleMethods
    // Start() is inherited from MonoBehavior and is called on the frame when a
    // script is enabled Start() defines AuthenticationScreen UI elements, and
    // sets click event handlers for them
    private void Start()
    {
        root = GetComponent<UIDocument>().rootVisualElement;
        authWrapper = root.Q<VisualElement>("auth-wrapper");
        subtitle = root.Q<Label>("subtitle");
        startButton = root.Q<Button>("start-button");
        logoutButton = root.Q<Button>("logout-button");
        userInput = root.Q<TextField>("username-input");
        // :state-start: start local
        logoutButton.clicked += RealmController.LogOut;
        startButton.clicked += () =>
        {
            OnPressLogin();
        };
        // :state-end:

        // :snippet-start: sync-auth-manager-start
        // :state-uncomment-start: sync
        logoutButton.clicked += RealmController.LogOutBackend;
        // passInput = root.Q<TextField>("password-input");
        // passInput.isPasswordField = true;
        // //  when the start button is clicked, toggle between registration modes
        // startButton.clicked += () =>
        // {
        //     if (isInRegistrationMode == true)
        //     {
        //         OnPressRegister();
        //     }
        //     else
        //     {
        //         OnPressLoginWithBackend();
        //     }
        // };
        // toggleLoginOrRegisterUIButton = root.Q<Button>("toggle-login-or-register-ui-button");
        // toggleLoginOrRegisterUIButton.clicked += () =>
        // {
        //     // if in registration mode, swap to the login mode
        //     if (isInRegistrationMode == true)
        //     {
        //         SwitchToLoginUI();
        //         isInRegistrationMode = false;
        //     }
        //     else
        //     {
        //         SwitchToRegisterUI();
        //         isInRegistrationMode = true;
        //     }
        // };
        // :state-uncomment-end:
        // :snippet-end:
    }
    #endregion
}

