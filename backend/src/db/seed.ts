import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

import User from '../models/User.model';
import Team from '../models/Team.model';
import Registration from '../models/Registration.model';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hackflow';

async function seed() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected. Dropping existing collections...');
    
    await User.deleteMany({});
    await Team.deleteMany({});
    await Registration.deleteMany({});

    console.log('Seeding Users...');
    const admin = await User.create({ firebaseUid: 'admin-uid', name: 'Admin User', email: 'admin@hackflow.com', role: 'admin' });
    const judge1 = await User.create({ firebaseUid: 'judge1-uid', name: 'Judge One', email: 'judge1@hackflow.com', role: 'judge' });
    const judge2 = await User.create({ firebaseUid: 'judge2-uid', name: 'Judge Two', email: 'judge2@hackflow.com', role: 'judge' });
    
    const participants = await User.insertMany([
      { firebaseUid: 'p1-uid', name: 'Participant 1', email: 'p1@test.com', role: 'participant' },
      { firebaseUid: 'p2-uid', name: 'Participant 2', email: 'p2@test.com', role: 'participant' },
      { firebaseUid: 'p3-uid', name: 'Participant 3', email: 'p3@test.com', role: 'participant' },
      { firebaseUid: 'p4-uid', name: 'Participant 4', email: 'p4@test.com', role: 'participant' },
      { firebaseUid: 'p5-uid', name: 'Participant 5', email: 'p5@test.com', role: 'participant' }
    ]);

    console.log('Seeding Teams...');
    const team1 = await Team.create({
      name: 'Alpha Coders',
      leaderId: participants[0]._id,
      members: [participants[0]._id, participants[1]._id]
    });
    const team2 = await Team.create({
      name: 'Beta Builders',
      leaderId: participants[2]._id,
      members: [participants[2]._id, participants[3]._id]
    });
    const team3 = await Team.create({
      name: 'Gamma Geeks',
      leaderId: participants[4]._id,
      members: [participants[4]._id]
    });

    console.log('Seeding Registrations...');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    await Registration.insertMany([
      { userId: participants[0]._id, teamId: team1._id, paymentStatus: 'pending', expiresAt: tomorrow },
      { userId: participants[2]._id, teamId: team2._id, paymentStatus: 'pending', expiresAt: tomorrow },
      { userId: participants[4]._id, teamId: team3._id, paymentStatus: 'pending', expiresAt: tomorrow }
    ]);

    console.log('✅ Seeding complete!');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

// To run this script:
// npx ts-node src/db/seed.ts
seed();
