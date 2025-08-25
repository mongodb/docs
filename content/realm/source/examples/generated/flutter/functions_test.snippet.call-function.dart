final response = await user.functions.call("addition", [1, 2]);

// convert EJSON response to Dart number
print(response);
final responseAsNum = num.tryParse(response["\$numberDouble"]);

prints(responseAsNum); // prints 3
