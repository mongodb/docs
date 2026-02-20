import 'dotenv/config';
import mongoose from 'mongoose';
import * as qeHelper from './queryable-encryption-helpers.js';
import { MongoClient, ClientEncryption } from 'mongodb';

async function runExample() {

  // Paste initial application variables below

  // Paste credential and options variables below

  // Paste connection and client configuration below

  // Paste data key creation code below

  // Paste encryption schema below

  // Paste the model below

  // Paste connection code below

  // Paste the insertion operation below

  // Paste the encrypted query below

  await connection.close();
  console.log('Connection closed.');
}

runExample().catch(console.dir);
