import { RSTOCK_URL } from "../Constants";
import {GetData, PostData, DeleteData} from "./DataFunc";

export const Get = async (context) => {
    return await GetData(context, RSTOCK_URL);
}

export const Post = async (context, data) => {
    await PostData(context, RSTOCK_URL, data);
}

export const Delete = async (context, id) => {
    await DeleteData(context, RSTOCK_URL, id);
}