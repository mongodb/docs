var item = await user.Functions.CallAsync<MyClass>
    ("getItem", "5f7f7638024a99f41a3c8de4");

var name = item.Name;
