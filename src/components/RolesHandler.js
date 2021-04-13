import { ROL_URL } from "../Constants";
import {GetData, PostData, PutData, DeleteData} from "./DataFunc";

export const Get = async (context) => {
    return await GetData(context, ROL_URL);
};