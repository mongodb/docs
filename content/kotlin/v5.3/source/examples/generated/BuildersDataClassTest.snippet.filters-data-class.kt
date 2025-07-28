val student = Student(
    "Sandra Nook",
    listOf("Alvarez", "Gruber"),
    85.7
)

// Equivalent equality queries
Student::name.eq(student.name)
eq(Student::name, student.name)
Student::name eq student.name // Infix notation

// Equivalent array queries
all(Student::teachers, student.teachers)
Student::teachers.all(student.teachers)
Student::teachers all student.teachers // Infix notation
