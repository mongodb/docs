package com.mongodb.tutorials.qe.models;

// start-patientRecord-model
public class PatientRecord {
    public String ssn;
    public PatientBilling billing;
    public int billAmount;

    public PatientRecord() {
    }

    public PatientRecord(String ssn, PatientBilling billing, int billAmount) {
        this.ssn = ssn;
        this.billing = billing;
        this.billAmount = billAmount;
    }

    public String getSsn() {
        return ssn;
    }

    public void setSsn(String ssn) {
        this.ssn = ssn;
    }

    public PatientBilling getBilling() {
        return billing;
    }

    public void setBilling(PatientBilling billing) {
        this.billing = billing;
    }

    public int getBillAmount() {
        return billAmount;
    }

    public void setBillAmount(int billAmount) {
        this.billAmount = billAmount;
    }

    @Override
    public String toString() {
        return "{" +
                "ssn='" + ssn + '\'' +
                ", billing=" + billing +
                ", billAmount=" + billAmount +
                '}';
    }
}
// end-patientRecord-model
