package sampledatautil;

import java.util.List;

/**
 * Result of checking sample data availability for multiple databases
 */
public class SampleDataAvailability {
    private final boolean isAvailable;
    private final List<String> missingDatabases;
    private final List<String> availableDatabases;

    /**
     * Creates a new SampleDataAvailability result
     * 
     * @param isAvailable True if all required sample databases and collections are available
     * @param missingDatabases List of database names that are missing or don't have required collections
     * @param availableDatabases List of database names that are available with required collections
     */
    public SampleDataAvailability(boolean isAvailable, List<String> missingDatabases, List<String> availableDatabases) {
        this.isAvailable = isAvailable;
        this.missingDatabases = List.copyOf(missingDatabases);
        this.availableDatabases = List.copyOf(availableDatabases);
    }

    /**
     * @return True if all required sample databases and collections are available
     */
    public boolean isAvailable() {
        return isAvailable;
    }

    /**
     * @return List of database names that are missing or don't have required collections
     */
    public List<String> getMissingDatabases() {
        return missingDatabases;
    }

    /**
     * @return List of database names that are available with required collections
     */
    public List<String> getAvailableDatabases() {
        return availableDatabases;
    }

    @Override
    public String toString() {
        return "SampleDataAvailability{" +
                "isAvailable=" + isAvailable +
                ", missingDatabases=" + missingDatabases +
                ", availableDatabases=" + availableDatabases +
                '}';
    }
}
