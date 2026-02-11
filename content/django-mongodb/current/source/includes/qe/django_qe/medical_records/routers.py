class EncryptedRouter:
    def allow_migrate(self, db, app_label, model_name=None, **hints):
        # Create medical_records models only in the encrypted database.
        if app_label == "medical_records":
            return db == "encrypted"
        # Don't create collections for other apps in the encrypted db.
        if db == "encrypted":
            return False
        return None

    def db_for_read(self, model, **hints):
        # All reads and writes for medical_records models go to the encrypted db.
        if model._meta.app_label == "medical_records":
            return "encrypted"
        return None

    db_for_write = db_for_read