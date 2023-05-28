const Product = require("../models/product");

const products = require("../data/products");

module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
    try {
      await db.collection("products").insertMany(products);
      console.log("All Products are added.");
    } catch (error) {
      console.log(error.message);
    }
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
    try {
      await db.collection("products").deleteMany();
      console.log("Products are deleted");
    } catch (error) {
      console.log(error.message);
    }
  },
};
