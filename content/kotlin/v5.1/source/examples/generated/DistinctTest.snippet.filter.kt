collection.distinct<String>(Movie::type.name, Filters.eq(Movie::languages.name, "French"))
