// Pass the serialized object to the method
final deserializeFromEjsonWithExplicitType = fromEJson<Pet>(serializeByParam);

// The method can also infer the object type
Pet deserializeFromEjson = fromEJson(serializeByParam);
