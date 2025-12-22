addFields(
        new Field<>("metaData", new Document("st", "$st")
                .append("position", "$position")
                .append("elevation", "$elevation")
                .append("callLetters", "$callLetters")
                .append("qualityControlProcess", "$qualityControlProcess")
                .append("type", "$type"))),
project(fields(
        include("_id", "ts", "metaData", "dataSource", "airTemperature",
                "dewPoint", "pressure", "wind", "visibility",
                "skyCondition", "sections", "precipitationEstimatedObservation"))),
