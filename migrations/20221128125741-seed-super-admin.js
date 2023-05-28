const bcrypt = require("bcryptjs");
const SuperAdmin = require("../models/super-admin");
module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    try {
      await db.collection("superadmins").insertOne({
        name: "Abdul Rehman",
        email: "abdulrehman@gmail.com",
        role: "super-admin",
        password: await bcrypt.hash("bunty1234", 10),
      });
      await db.collection("superadmins").insertOne({
        name: "admin",
        email: "admin@gmail.com",
        role: "super-admin",
        password: await bcrypt.hash("admin1234", 10),
      });
      console.log("The user 'Bunty' is added.");
    } catch (error) {
      console.log(error.message);
    }
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    try {
      await db.collection("superadmins").deleteMany();
      console.log("All super admin users are deleted");
    } catch (error) {
      console.log(error.message);
    }
  },
};
