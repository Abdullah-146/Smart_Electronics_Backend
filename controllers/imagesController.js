const path = require("path");
const Jimp = require("jimp");
const fs = require("fs");
const formidable = require("formidable");

exports.saveImages = catchAsyncErrors(async (req, res, next) => {
  //   Defualt upload directory for images upload
  if (req.method === "POST") {
    try {
      // directory for saving images
      let dir = path.join(__dirname, "../Uploads");
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      // get data from request
      const data = await new Promise(function (resolve, reject) {
        // use formidable to get uploaded image and fields setting upload directory to the specified directory
        // this saves the image with a uuid to the specified directory but with no extension
        const form = new formidable.IncomingForm({
          keepExtensions: true,
          uploadDir: dir,
        });
        form.parse(req, function (err, fields, files) {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      });

      // create image name adding its extensions
      const imageName = data.files["avatar"].newFilename + ".jpg";
      // rename the image adding it's extension
      fs.renameSync(data.files["avatar"].filepath, path.join(dir + imageName));
      // Update user image in data base
      // end the request sending a response code of 200 for succeful res
      res.status(200).end();
    } catch (e) {
      // if there is an error in server send error message with status 500
      console.log(e);
      res.status(500).end(e.message);
    }
  } else {
    // if wrong request end
    res.end();
  }
});
