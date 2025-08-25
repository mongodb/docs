var sessionState = session.State;
if (sessionState == SessionState.Active){
    Console.WriteLine("The session is active");
} else {
    Console.WriteLine("The session is inactive");
}
