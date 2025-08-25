// This property will be stored in the Realm
private string email { get; set; }

// Custom validation of the email property.
// This property is *not* stored in Realm.
public string Email
{
    get { return email; }
    set
    {
        if (!value.Contains("@")) throw new Exception("Invalid email address");
        email = value;
    }
}
