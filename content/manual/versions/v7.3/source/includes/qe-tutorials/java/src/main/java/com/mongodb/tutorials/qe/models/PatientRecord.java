package com.mongodb.tutorials.qe.models;

// start-patientRecord-model
public class PatientRecord {
    public String ssn;
    public PatientBilling billing;

    public PatientRecord() {
    }

    public PatientRecord(String ssn, PatientBilling billing) {
        this.ssn = ssn;
        this.billing = billing;
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

    @Override
    public String toString() {
        return "{" +
                "ssn='" + ssn + '\'' +
                ", billing=" + billing +
                '}';
    }
}
// end-patientRecord-model
