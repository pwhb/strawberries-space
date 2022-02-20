import clientPromise from "../../../lib/mongodb";
import { getSession } from "next-auth/react";

// import B2 from "backblaze-b2";

// const applicationKeyId = process.env.APPLICATION_KEY_ID;
// const applicationKey = process.env.APPLICATION_KEY;
// const BUCKET_ID = process.env.BUCKET_ID;

// const b2 = new B2({
//   applicationKeyId,
//   applicationKey,
// });

const ListingsHandler = async (req, res) => {
  const { method } = req;
  const session = await getSession({ req });
  const client = await clientPromise;
  const db = client.db("test_database");
  const user = await db
    .collection("users")
    .findOne({ email: session.user?.email });
  console.log(user);

  switch (method) {
    case "GET":
      res.json({ method: "get" });
      break;
    case "POST":
      console.log(req.body);
      try {
        const {
          title,
          description,
          price,
          currency,
          purpose,
          category,
          bedrooms,
          bathrooms,
          floor_level,
          floor_type,
          phones,
          images,
          lat,
          lng,
          home_no,
          street,
          township,
          state,
          tags,
          status,
          width,
          length,
          lot_width,
          lot_length,
        } = req.body;

        const doc = await db.collection("listings").insertOne({
          added_by: user._id,
          title,
          description,
          price: {
            value: price,
            currency,
          },
          purpose,
          category,
          bedrooms,
          bathrooms,
          floor_level,
          floor_type,
          phones,
          images,
          coords: {
            lat,
            lng,
          },
          address: {
            home_no,
            street,
            township,
            state,
          },
          tags,
          status,
          width,
          length,
          lot_width,
          lot_length,
        });
        console.log(doc);
        res.status(200).json("ok");
      } catch (e) {
        console.log(e);
        res.json(e);
      }
  }
};

export default ListingsHandler;
