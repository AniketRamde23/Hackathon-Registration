require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const db = mongoose.connection.db;
  const u = await db.collection('users').findOne({email: 'aniketramde@gmail.com'});
  if(u) {
    await db.collection('registrations').deleteMany({userId: u._id});
    await db.collection('teams').deleteMany({leaderId: u._id});
    await db.collection('users').deleteMany({_id: u._id});
    console.log('SUCCESS: aniketramde@gmail.com data completely erased.');
  } else {
    console.log('User not found.');
  }
  process.exit(0);
}).catch(e => {
  console.error(e);
  process.exit(1);
});
