import mongoose from 'mongoose';
import User from './model/User.js';

export async function createUserWithInvalidEmail() {
  // :snippet-start: create-user-improper-email
  const user = await User.create({
    name: 'Jess Garcia',
    email: 'jgarciaemail.com', // Intentional error: missing '@' symbol in email address
  });
  // :snippet-end:
  return user; // :remove:
}

export async function createUserWithValidEmail() {
  const user = await User.create({
    name: 'Jess Garcia',
    email: 'jgarcia@email.com',
  });
  return user;
}
