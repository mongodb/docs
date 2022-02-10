  import React from 'react';
  import ReactDOM from 'react-dom';

  //start stitch import
  import { Stitch, GoogleRedirectCredential } from "mongodb-stitch-browser-sdk";
  //end stitch import

  // Create a component to display google auth user information
  const User = ({ data: name }) => name && <div><pre>{name}</pre></div>

  // Create the main component
  class Demo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentUser: false
      }
    }

    async componentDidMount() {
      await this.setupStitch();
    }

    //start stitch setup
    async setupStitch() {
      //copy the name of your google-auth enabled stitch application here
      //the name of the app will typically be the stitch application name
      //with a "-"" + random string appended
      const appId = 'authentication_test-htbrq';

      // Get a client for your Stitch app, or instantiate a new one
      const client = Stitch.hasAppClient(appId)
        ? Stitch.getAppClient(appId)
        : Stitch.initializeAppClient(appId);

      //manage user authentication state
      
      // Check if this user has already authenticated and we're here
      // from the redirect. If so, process the redirect to finish login.
      if (client.auth.hasRedirectResult()) {
        await client.auth.handleRedirectResult().catch(console.error);
        console.log("Processed redirect result.")
      }

      if (client.auth.isLoggedIn) {
        // The user is logged in. Add their user object to component state.
        currentUser = client.auth.user;
        this.setState({ currentUser });
      } else {
        // The user has not yet authenticated. Begin the Google login flow.
        const credential = new GoogleRedirectCredential();
        client.auth.loginWithRedirect(credential);
      }
    }
    //end stitch setup

    render() {
      const { currentUser } = this.state;
      return !currentUser
        ? <div>User must authenticate.</div>
        : <User profile={currentUser.profile}/>
    }
  }

  // ========================================
     
  ReactDOM.render(
    <Demo />,
    document.getElementById('root')
  );
