import cloudinaryPackage from "cloudinary";

const cloudinary = cloudinaryPackage.v2;

const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

const uploadHandler = async (req, res) => {
  const { method } = req;
  if (method === "POST") {
    const { photos } = req.body;
    // console.log(photos);
    const promises = [];
    photos.forEach(async (image) => {
      promises.push(
        cloudinary.uploader.upload(image, {
          folder: "test",
        })
      );
    });
    const response = await Promise.all(promises);
    console.log(response);
    res.json(response);
  } else if (method === "GET") {
    res.json("get");
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "20mb",
    },
  },
};
export default uploadHandler;
