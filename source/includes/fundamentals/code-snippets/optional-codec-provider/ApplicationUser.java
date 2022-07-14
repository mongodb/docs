package org.example.pojos;

import java.util.Optional;


public class ApplicationUser {
    
    private Optional<Address> optionalAddress;
    private Optional<Subscription> optionalSubscription;
    private String name;
    
    public ApplicationUser() {}
    public ApplicationUser(String name) {
        this.name = name;
    }
    
    public Optional<Address> getOptionalAddress() {
        return optionalAddress;
    }
    public void setOptionalAddress(Optional<Address> optionalAddress) {
        this.optionalAddress = optionalAddress;
    }
    public Optional<Subscription> getOptionalSubscription() {
        return optionalSubscription;
    }
    public void setOptionalSubscription(Optional<Subscription> optionalSubscription) {
        this.optionalSubscription = optionalSubscription;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    @Override
    public String toString() {
        return "ApplicationUser [optionalAddress=" + optionalAddress + ", optionalSubscription=" + optionalSubscription
                + ", name=" + name + "]";
    }

    
    
}
