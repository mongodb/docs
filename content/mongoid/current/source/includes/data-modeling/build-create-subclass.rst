To build or create |association-document| as an instance of a
subclass, pass the subclass as the second argument to the
``build_<association>`` or ``create_<association>`` method. If you omit
the subclass, {+odm+} uses the class the association specifies.

The following example builds and creates a |example-class| document as
an instance of the |example-subclass| subclass:
