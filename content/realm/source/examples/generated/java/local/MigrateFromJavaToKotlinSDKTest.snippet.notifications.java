realm.where(Sample.class).findAllAsync()
    .addChangeListener(
            (samples, changeSet) -> {
        // log change description
        Log.v("EXAMPLE",
            "Results changed. " +
            "change ranges: " +
            Arrays.toString(
                changeSet
                    .getChangeRanges()) +
            ", insertion ranges: " +
            Arrays.toString(
                changeSet
                    .getInsertionRanges()) +
            ", deletion ranges: " +
            Arrays.toString(
                changeSet
                    .getDeletionRanges()));
    });
