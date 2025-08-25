import 'react-native';
import React from 'react';
import {BSON} from 'realm';
import {RelationshipExamples} from './RealmWrapper';
import {render, screen, userEvent, within} from '@testing-library/react-native';

describe('Atlas Device SDK relationships', () => {
  test('to-one relationship', async () => {
    render(<RelationshipExamples />);

    const user = userEvent.setup();

    const carModelInput = await screen.findByTestId('to-one-model-input');
    const createButton = await screen.findByTestId('create-to-one-car');
    const removeButton = await screen.findByTestId('remove-all-objects');

    // Clear any existing realm objects
    await user.press(removeButton);

    // Create car
    await user.type(carModelInput, 'Sentra');
    await user.press(createButton);
    await user.clear(carModelInput);

    const carModelNode = await screen.findByTestId('car-model');
    expect(carModelNode.children[1]).toBe('Sentra');

    // Clean up
    await user.press(removeButton);
  });

  test('to-many relationship', async () => {
    render(<RelationshipExamples />);

    const user = userEvent.setup();

    const carModelInput = await screen.findByTestId('to-many-model-input');
    const createButton = await screen.findByTestId('create-to-many-car');
    const removeButton = await screen.findByTestId('remove-all-objects');

    // Clear any existing realm objects
    await user.press(removeButton);

    // Create first car
    await user.type(carModelInput, 'Sentra');
    await user.press(createButton);
    await user.clear(carModelInput);

    // Create second car
    await user.type(carModelInput, 'Pathfinder');
    await user.press(createButton);
    await user.clear(carModelInput);

    // Get car <View> components
    const carNodes = await screen.findAllByTestId('car');
    expect(carNodes.length).toEqual(2);

    // Search within the first <View> component for model and manufacturer info
    const firstCarModel = await within(carNodes[0]).findByTestId('model');
    const firstCarManufacturer = await within(carNodes[0]).findByTestId(
      'manufacturer',
    );

    // Search within the second <View> component for model and manufacturer info
    const secondCarModel = await within(carNodes[1]).findByTestId('model');
    const secondCarManufacturer = await within(carNodes[1]).findByTestId(
      'manufacturer',
    );

    expect(firstCarModel.children[1]).toBe('Sentra');
    expect(firstCarManufacturer.children[1]).toBe('Nissan');
    expect(secondCarModel.children[1]).toBe('Pathfinder');
    expect(secondCarManufacturer.children[1]).toBe('Nissan');

    // Clean up
    await user.press(removeButton);
  });

  test('inverse relationship', async () => {
    render(<RelationshipExamples />);

    const user = userEvent.setup();

    const carModelInput = await screen.findByTestId('inverse-model-input');
    const carCreateButton = await screen.findByTestId('create-inverse-car');
    const manufacturerInput = await screen.findByTestId('inverse-id-input');
    const manufacturerCreateButton = await screen.findByTestId(
      'create-inverse-manufacturer',
    );
    const removeButton = await screen.findByTestId('remove-all-objects');

    // Clear any existing realm objects
    await user.press(removeButton);

    const manufacturerId = new BSON.ObjectID().toString();

    // Create manufacturer
    await user.type(manufacturerInput, manufacturerId);
    await user.press(manufacturerCreateButton);
    await user.clear(manufacturerInput);

    // Create car
    await user.type(carModelInput, 'Sentra');
    await user.press(carCreateButton);
    await user.clear(carModelInput);

    // Get car <View> components
    const carNodes = await screen.findAllByTestId('inverse-car');
    expect(carNodes.length).toEqual(1);

    // Search within the first <View> component for model and manufacturer id
    const carModelNode = await within(carNodes[0]).findByTestId(
      'inverse-model',
    );
    const carManufacturerIdNode = await within(carNodes[0]).findByTestId(
      'inverse-manufacturer-id',
    );

    expect(carModelNode.children[1]).toBe('Sentra');
    expect(carManufacturerIdNode.children[1]).toEqual(manufacturerId);

    // Clean up
    await user.press(removeButton);
  });

  test('embedded relationship', async () => {
    render(<RelationshipExamples />);

    const user = userEvent.setup();

    const carModelInput = await screen.findByTestId('embedded-model-input');
    const carWarrantyInput = await screen.findByTestId(
      'embedded-warranty-input',
    );
    const createButton = await screen.findByTestId('create-embedded-car');
    const removeButton = await screen.findByTestId('remove-all-objects');

    // Clear any existing realm objects
    await user.press(removeButton);

    // Create first car
    await user.type(carModelInput, 'Sentra');
    await user.type(carWarrantyInput, 'Premium');
    await user.press(createButton);
    await user.clear(carModelInput);
    await user.clear(carWarrantyInput);

    // Create second car
    await user.type(carModelInput, 'Pathfinder');
    await user.type(carWarrantyInput, 'SuperPremium');
    await user.press(createButton);
    await user.clear(carModelInput);
    await user.clear(carWarrantyInput);

    // Get car <View> components
    const carNodes = await screen.findAllByTestId('embedded-car');
    expect(carNodes.length).toEqual(2);

    // Search within the first <View> component for model and manufacturer info
    const firstCarModel = await within(carNodes[0]).findByTestId(
      'embedded-model',
    );
    const firstCarWarranty = await within(carNodes[0]).findByTestId(
      'embedded-warranty',
    );
    const firstCarManufacturer = await within(carNodes[0]).findByTestId(
      'embedded-manufacturer',
    );

    // Search within the second <View> component for model and manufacturer info
    const secondCarModel = await within(carNodes[1]).findByTestId(
      'embedded-model',
    );
    const secondCarWarranty = await within(carNodes[1]).findByTestId(
      'embedded-warranty',
    );
    const secondCarManufacturer = await within(carNodes[1]).findByTestId(
      'embedded-manufacturer',
    );

    expect(firstCarModel.children[1]).toBe('Sentra');
    expect(firstCarWarranty.children[1]).toBe('Premium');
    expect(firstCarManufacturer.children[1]).toBe('Nissan');
    expect(secondCarModel.children[1]).toBe('Pathfinder');
    expect(secondCarWarranty.children[1]).toBe('SuperPremium');
    expect(secondCarManufacturer.children[1]).toBe('Nissan');

    // Clean up
    await user.press(removeButton);
  });
});
