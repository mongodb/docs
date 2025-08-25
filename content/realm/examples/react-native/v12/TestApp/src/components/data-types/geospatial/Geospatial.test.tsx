import 'react-native';
import React from 'react';
import {Geospatial} from './Geospatial';
import {render, screen} from '@testing-library/react-native';

test('Geospatial queries', async () => {
  render(<Geospatial />);

  // We use findByText becuase it better mimics how users would interact
  // with the app. It also allows us to not have `testID='id'` in our UI
  // markup, which would be included in Bluehawk examples.
  const smallCircleNode = await screen.findByText('Small circle', {
    exact: false,
  });

  // The second child of the rendered <Text> element contains the
  // interpolated value we're testing: the number of companies
  // contained within the small circle.
  const numberOfCompaniesInSmallCircle = smallCircleNode.children[1];
  expect(numberOfCompaniesInSmallCircle).toBe('0');

  const largeCircleNode = await screen.findByText('Large circle', {
    exact: false,
  });

  // The number of companies contained within the large circle.
  const numberOfCompaniesInLargeCircle = largeCircleNode.children[1];
  expect(numberOfCompaniesInLargeCircle).toBe('1');

  const smallBoxNode = await screen.findByText('Small box', {
    exact: false,
  });

  // The number of companies contained within the small box.
  const numberOfCompaniesInSmallBox = smallBoxNode.children[1];
  expect(numberOfCompaniesInSmallBox).toBe('2');

  const largeBoxNode = await screen.findByText('Small box', {
    exact: false,
  });

  // The number of companies contained within the large box.
  const numberOfCompaniesInLargeBox = largeBoxNode.children[1];
  expect(numberOfCompaniesInLargeBox).toBe('2');

  const basicPolygon = await screen.findByText('Basic polygon', {
    exact: false,
  });

  // The number of companies contained within the basic polygon.
  const numberOfCompaniesInBasicPolygon = basicPolygon.children[1];
  expect(numberOfCompaniesInBasicPolygon).toBe('2');

  const polygonWithTwoHoles = await screen.findByText(
    'Polygon with two holes',
    {
      exact: false,
    },
  );

  // The number of companies contained within the polygon with two holes.
  const numberOfCompaniesInpolygonWithTwoHoles =
    polygonWithTwoHoles.children[1];
  expect(numberOfCompaniesInpolygonWithTwoHoles).toBe('1');
});
