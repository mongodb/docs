// Create a basic polygon
const basicPolygon = {
  outerRing: [
    [-122.8, 48.0],
    [-121.8, 48.2],
    [-121.6, 47.6],
    [-122.0, 47.0],
    [-122.6, 47.2],
    [-122.8, 48.0],
  ],
};

// Create a polygon with one hole
const outerRing = [
  [-122.8, 48.0],
  [-121.8, 48.2],
  [-121.6, 47.6],
  [-122.0, 47.0],
  [-122.6, 47.2],
  [-122.8, 48.0],
];

const hole = [
  [-122.6, 47.8],
  [-122.2, 47.7],
  [-122.6, 47.4],
  [-122.5, 47.6],
  [-122.6, 47.8],
];

const polygonWithOneHole = {
  outerRing: outerRing,
  holes: [hole],
};

// Add a second hole to the polygon
const hole2 = [
  {
    longitude: -122.05,
    latitude: 47.55,
  },
  {
    longitude: -121.9,
    latitude: 47.55,
  },
  {
    longitude: -122.1,
    latitude: 47.3,
  },
  {
    longitude: -122.05,
    latitude: 47.55,
  },
];

const polygonWithTwoHoles = {
  outerRing: outerRing,
  holes: [hole, hole2],
};
