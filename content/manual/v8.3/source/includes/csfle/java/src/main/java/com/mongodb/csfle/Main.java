package com.mongodb.csfle;

public class Main {
    public static void main(String[] args) throws Exception {
        System.out.println("=".repeat(60));
        System.out.println("Running MakeDataKey...");
        System.out.println("=".repeat(60));
        MakeDataKey.main(new String[]{});
        System.out.println("=".repeat(60));
        System.out.println("Running InsertEncryptedDocument...");
        System.out.println("=".repeat(60));
        InsertEncryptedDocument.main(new String[]{});
        System.out.println("=".repeat(60));
        System.out.println("All scripts completed successfully!");
        System.out.println("=".repeat(60));
    }
}
