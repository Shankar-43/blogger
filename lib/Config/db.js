import mongoose from "mongoose";

const ConnectDB = async () => {
    await mongoose.connect(`${process.env.MONGOOSE_CONNECT_DB}`)
    console.log("Connected to DB");
}
export default ConnectDB;