collection.distinct<Int>("${Movie::awards.name}.${Movie.Awards::wins.name}")
