package org.example.pojos;

public class Subscription {
    private String type;
    private String subName;
    
    public Subscription() {}
    
    public Subscription(String type, String subName) {
        this.type = type;
        this.subName = subName;
    }
    
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getSubName() {
        return subName;
    }
    public void setSubName(String subName) {
        this.subName = subName;
    }

    @Override
    public String toString() {
        return "Subscription [type=" + type + ", subName=" + subName + "]";
    }
    
}
