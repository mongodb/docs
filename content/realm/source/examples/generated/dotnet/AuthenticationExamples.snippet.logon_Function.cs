var functionParameters = new
{
    username = "caleb",
    password = "MySekritPwd",
    IQ = 42,
    hasPets = true
};

var user =
    await app.LogInAsync(Credentials.Function(functionParameters));
