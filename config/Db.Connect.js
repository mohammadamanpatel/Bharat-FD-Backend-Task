//import the mongoose for database connnetion
import mongoose from "mongoose";

//using async and wait for handling promise
const DBConnection = async () => {
  try {
    //placed the mongodb database url in mongoose.connect for establishing the connection
    const { connection } = await mongoose.connect(process.env.MONGO_URL);
    if (connection) {
      //logging the connnection host for checking wheather database is properly connected or not
      console.log("DB is connected", connection.host);
    }
  } catch (e) {
    //logging the internal server error
    console.log(e);
    process.exit(1);
  }
};
export default DBConnection;
