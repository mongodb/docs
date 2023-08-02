package com.mongodb.tutorials.qe.models;

import org.bson.types.ObjectId;

// start-patient-model
public class Patient {
    public ObjectId id;
    public String name;

    public PatientRecord patientRecord;

    public Patient() {
    }

    public Patient(String name, PatientRecord patientRecord) {
        this.name = name;
        this.patientRecord = patientRecord;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public PatientRecord getPatientRecord() {
        return patientRecord;
    }

    public void setPatientRecord(PatientRecord patientRecord) {
        this.patientRecord = patientRecord;
    }

    @Override
    public String toString() {
        return "{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", patientRecord=" + patientRecord +
                '}';
    }
}
// end-patient-model
