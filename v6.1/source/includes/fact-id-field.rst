In MongoDB, each document stored in a collection requires a unique
:term:`_id` field that acts as a :term:`primary key`. If an inserted
document omits the ``_id`` field, the MongoDB driver automatically
generates an :ref:`objectid` for the ``_id`` field.

This also applies to documents inserted through update
operations with :ref:`upsert: true <upsert-parameter>`.
