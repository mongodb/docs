package main

/*
	This file contains a sample data model you can use
	to serialize data you store in MongoDB and deserialize
	your retrieved data from MongoDB.
*/

// start-patient-document
type PatientDocument struct {
	PatientName   string        `bson:"patientName"`
	PatientID     int32         `bson:"patientId"`
	PatientRecord PatientRecord `bson:"patientRecord"`
}

// end-patient-document

// start-patient-record
type PatientRecord struct {
	SSN     string      `bson:"ssn"`
	Billing PaymentInfo `bson:"billing"`
}

// end-patient-record

// start-payment-info
type PaymentInfo struct {
	Type   string `bson:"type"`
	Number string `bson:"number"`
}

// end-payment-info
