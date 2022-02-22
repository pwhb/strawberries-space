import clientPromise from "../../../lib/mongodb";
import { getSession } from "next-auth/react";

const ListingsHandler = async (req, res) => {
  const { method } = req;
  const client = await clientPromise;
  const db = client.db("test_database");

  switch (method) {
    case "GET":
      const { title, purpose, category, min, max, township, state, limit } =
        req.query;
      console.log("listing query", req.query);
      const query = {};
      if (title) {
        query.title = new RegExp(title);
        // query.description = `/${title}/`;
      }
      if (purpose) {
        query.purpose = purpose;
      }
      if (category) {
        query.category = category;
      }
      if (township) {
        query["address.township"] = township;
      }
      if (state) {
        query["address.state"] = state;
      }
      if (min) {
        query["price.value"] = { $gt: min * 100000 };
      }
      if (max) {
        query["price.value"] = { ...query["price.value"], $lt: max * 100000 };
      }

      console.log("query", query);
      const docs = await db
        .collection("listings")
        .find(query)
        .limit(limit ? parseInt(limit) : 40)
        .toArray();
      // console.log(docs);
      res.json(docs);
      break;
    case "POST":
      try {
        const session = await getSession({ req });
        const user = await db
          .collection("users")
          .findOne({ email: session.user?.email });

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
          created_at: new Date(),
          updated_at: new Date(),
        });
        console.log(doc);
        res.status(200).json(doc);
      } catch (e) {
        console.log(e);
        res.json(e);
      }
  }
};

export default ListingsHandler;
