The relationship between the order of ``ObjectId`` values and
generation time is not strict within a single second. If multiple
systems, or multiple processes or threads on a single system generate
values, within a single second; ``ObjectId`` values do not represent a
strict insertion order. Clock skew between clients can also result in
non-strict ordering even for values because client drivers generate
``ObjectId`` values.
