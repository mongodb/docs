package com.mongodb.tutorials.qe.models;

// start-patientBilling-model
public class PatientBilling {
    public String cardType;
    public String cardNumber;

    public PatientBilling() {
    }

    public PatientBilling(String cardType, String cardNumber) {
        this.cardType = cardType;
        this.cardNumber = cardNumber;
    }

    public String getCardType() {
        return cardType;
    }

    public void setCardType(String cardType) {
        this.cardType = cardType;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    @Override
    public String toString() {
        return "{" +
                "cardType='" + cardType + '\'' +
                ", cardNumber='" + cardNumber + '\'' +
                '}';
    }
}
// end-patientBilling-model