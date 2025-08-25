// Action bar at bottom contains Add button.
HStack {
    Spacer()
    Button(action: {
        // The bound collection automatically
        // handles write transactions, so we can
        // append directly to it.
        // Because we are using Flexible Sync, we must set
        // the item's ownerId to the current user.id when we create it.
        $itemGroup.items.append(Item(value: ["ownerId":user!.id]))
    }) { Image(systemName: "plus") }
}.padding()
