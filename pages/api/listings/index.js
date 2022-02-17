// import clientPromise from ".";
import clientPromise from "../../../lib/mongodb";

const ListingsHandler = async (req, res) => {
  const {
    body: { title, desc },
    method,
  } = req;
  switch (method) {
    case "GET":
      res.json({ method: "get" });
      break;
    case "POST":
      try {
        const client = await clientPromise;
        const db = client.db("test");
        await db.collection("listings").insertOne({ title, desc });
        // await client.close();
        res.status(200).json("ok");
      } catch (e) {
        console.log(e);
        res.json(e);
      }
  }
};

export default ListingsHandler;
