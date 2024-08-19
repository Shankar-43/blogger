import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGOOSE_CONNECT_DB}`)
        console.log("Connected to DB");
        return true
    } catch (error) {
        console.error("error in connecting to DB", error);
        return false
    }
}
export default ConnectDB;