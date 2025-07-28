val warehouses = current().getMap<MqlNumber>("warehouses")

listOf(
    Aggregates.project(
        Projections.fields(
            Projections.computed("totalInventory", warehouses
                .entries()
                .sum { v -> v.getValue() })
)))
