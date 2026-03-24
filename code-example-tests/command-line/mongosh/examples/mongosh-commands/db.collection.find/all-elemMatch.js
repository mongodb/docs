// :snippet-start: all-elemMatch-example
db.embedded_movies.find(
   { writers: { $all: [
      { $elemMatch: { $regex: '\\bstory\\b', $not: { $regex: '\\bscreenplay\\b' }}},
      { $elemMatch: { $regex: '\\btitles\\b', $not: { $regex: '\\badaptation\\b' }}}
   ]}}, 
   { title: 1, writers: 1, year: 1 })
// :snippet-end: