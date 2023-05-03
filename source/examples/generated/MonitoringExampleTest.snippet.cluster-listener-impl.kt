class IsWriteable : ClusterListener {
    // TODO: make publically gettable but not settable
    private var isWritable = false


    @Synchronized
    override fun clusterDescriptionChanged(event: ClusterDescriptionChangedEvent) {
        if (!isWritable) {
            if (event.newDescription.hasWritableServer()) {
                isWritable = true
                println("Able to write to cluster")
            }
        } else {
            if (!event.newDescription.hasWritableServer()) {
                isWritable = false
                println("Unable to write to cluster")
            }
        }
    }
}
