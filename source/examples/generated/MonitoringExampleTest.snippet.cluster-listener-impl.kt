class IsWriteable : ClusterListener {
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
