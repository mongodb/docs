namespace QueryableEncryption;

// start-patient-record
public class PatientRecord
{
    public string Ssn { get; set; }
    public PatientBilling Billing { get; set; }
}
// end-patient-record