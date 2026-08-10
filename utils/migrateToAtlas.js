const mongoose = require('mongoose');
const AdminUser = require('../models/AdminUser');
const Page = require('../models/Page');
const Rsvp = require('../models/Rsvp');
const Media = require('../models/Media');
const dotenv = require('dotenv');

dotenv.config();

// Local connection string
const localURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/preetiwedding';

// Grab the Atlas connection string from arguments
const atlasURI = process.argv[2];

if (!atlasURI) {
  console.error('\x1b[31mError: Please provide your MongoDB Atlas Connection String as an argument.\x1b[0m');
  console.log('\nUsage: node server/utils/migrateToAtlas.js "mongodb+srv://<username>:<password>@cluster.mongodb.net/preetiwedding?retryWrites=true&w=majority"\n');
  process.exit(1);
}

async function migrate() {
  let localConnection = null;
  let atlasConnection = null;

  try {
    console.log('1. Connecting to Local MongoDB...');
    localConnection = await mongoose.createConnection(localURI).asPromise();
    console.log('   Local MongoDB Connected.');

    console.log('2. Connecting to MongoDB Atlas...');
    atlasConnection = await mongoose.createConnection(atlasURI).asPromise();
    console.log('   MongoDB Atlas Connected.');

    // Instantiate models for both connections
    const LocalAdminUser = localConnection.model('AdminUser', AdminUser.schema);
    const LocalPage = localConnection.model('Page', Page.schema);
    const LocalRsvp = localConnection.model('Rsvp', Rsvp.schema);
    const LocalMedia = localConnection.model('Media', Media.schema);

    const AtlasAdminUser = atlasConnection.model('AdminUser', AdminUser.schema);
    const AtlasPage = atlasConnection.model('Page', Page.schema);
    const AtlasRsvp = atlasConnection.model('Rsvp', Rsvp.schema);
    const AtlasMedia = atlasConnection.model('Media', Media.schema);

    // --- Migrate Pages ---
    console.log('\nMigrating Page Configurations...');
    const localPages = await LocalPage.find({});
    console.log(`Found ${localPages.length} pages locally.`);
    for (const page of localPages) {
      const pageObj = page.toObject();
      await AtlasPage.findOneAndUpdate({ page: pageObj.page }, pageObj, { upsert: true, new: true });
      console.log(`   Migrated page: ${pageObj.page}`);
    }

    // --- Migrate Admin Users ---
    console.log('\nMigrating Admin Credentials...');
    const localAdmins = await LocalAdminUser.find({});
    console.log(`Found ${localAdmins.length} admin accounts locally.`);
    for (const admin of localAdmins) {
      const adminObj = admin.toObject();
      await AtlasAdminUser.findOneAndUpdate({ username: adminObj.username }, adminObj, { upsert: true, new: true });
      console.log(`   Migrated admin: ${adminObj.username}`);
    }

    // --- Migrate RSVPs ---
    console.log('\nMigrating Guest RSVPs...');
    const localRsvps = await LocalRsvp.find({});
    console.log(`Found ${localRsvps.length} guest RSVPs locally.`);
    let rsvpCount = 0;
    for (const rsvp of localRsvps) {
      const rsvpObj = rsvp.toObject();
      // Avoid inserting duplicates based on name & email
      const exists = await AtlasRsvp.findOne({ firstName: rsvpObj.firstName, lastName: rsvpObj.lastName, email: rsvpObj.email });
      if (!exists) {
        delete rsvpObj._id; // mongoose will generate new ObjectId in Atlas
        await AtlasRsvp.create(rsvpObj);
        rsvpCount++;
      }
    }
    console.log(`   Successfully copied ${rsvpCount} new guest RSVPs to Atlas.`);

    // --- Migrate Media Metadata ---
    console.log('\nMigrating Media Metadata...');
    const localMedia = await LocalMedia.find({});
    console.log(`Found ${localMedia.length} media metadata items locally.`);
    let mediaCount = 0;
    for (const media of localMedia) {
      const mediaObj = media.toObject();
      const exists = await AtlasMedia.findOne({ filename: mediaObj.filename });
      if (!exists) {
        delete mediaObj._id;
        await AtlasMedia.create(mediaObj);
        mediaCount++;
      }
    }
    console.log(`   Successfully copied ${mediaCount} media assets metadata items to Atlas.`);

    console.log('\n\x1b[32m✔ DATABASE MIGRATION COMPLETED SUCCESSFULLY!\x1b[0m');
    console.log('Now you can update the MONGODB_URI in your server/.env file to connect to Atlas.');
  } catch (err) {
    console.error('\x1b[31mMigration failed with error:\x1b[0m', err);
  } finally {
    if (localConnection) await localConnection.close();
    if (atlasConnection) await atlasConnection.close();
    process.exit(0);
  }
}

migrate();
