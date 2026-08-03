db.schools.insertMany( [
   {
      _id: 1,
      zipcode: "63109",
      students: [
         { name: "john", school: 102, age: 10 },
         { name: "jess", school: 102, age: 11 },
         { name: "jeff", school: 108, age: 15 }
      ]
   },
   {
      _id: 2,
      zipcode: "63110",
      students: [
         { name: "ajax", school: 100, age: 7 },
         { name: "achilles", school: 100, age: 8 }
      ],
      athletics: [ "swimming", "basketball", "football" ]
   },
   {
      _id: 3,
      zipcode: "63109",
      students: [
         { name: "ajax", school: 100, age: 7 },
         { name: "achilles", school: 100, age: 8 }
      ],
      athletics: [ "baseball", "basketball", "soccer" ]
   },
   {
      _id: 4,
      zipcode: "63109",
      students: [
         { name: "barney", school: 102, age: 7 },
         { name: "ruth", school: 102, age: 16 }
      ]
   }
] )
