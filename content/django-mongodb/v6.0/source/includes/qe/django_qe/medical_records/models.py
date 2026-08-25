from django.db import models
from django_mongodb_backend.models import EmbeddedModel
from django_mongodb_backend.fields import (
    EmbeddedModelField,
    EncryptedCharField,
    EncryptedEmbeddedModelField,
)

class Patient(models.Model):
    patient_name = models.CharField(max_length=255)
    patient_id = models.BigIntegerField()
    patient_record = EmbeddedModelField("PatientRecord")

    class Meta:
        db_table = "patients"

    def __str__(self):
        return f"{self.patient_name} ({self.patient_id})"

class PatientRecord(EmbeddedModel):
    ssn = EncryptedCharField(max_length=11, queries={"queryType": "equality"})
    billing = EncryptedEmbeddedModelField("Billing")
    bill_amount = models.DecimalField(max_digits=10, decimal_places=2)

class Billing(EmbeddedModel):
    cc_type = models.CharField(max_length=50)
    cc_number = models.CharField(max_length=20)