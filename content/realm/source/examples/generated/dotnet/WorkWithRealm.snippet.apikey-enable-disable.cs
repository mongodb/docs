var key = await user.ApiKeys.FetchAsync(ObjectId.Parse("00112233445566778899aabb"));
if (!key.IsEnabled)
{
    // enable the key
    await user.ApiKeys.EnableAsync(key.Id);
}
else
{
    // disable the key
    await user.ApiKeys.DisableAsync(key.Id);
}
