import { CAT_URL } from "../Constants";
import {GetData, PostData, PutData, DeleteData} from "./DataFunc";

export const Get = async (context) => {
    return await GetData(context, CAT_URL);
};

export const Post = async (context, data) => {
    await PostData(context, CAT_URL, data);
}

export const Put = async (context, id, data) => {
    await PutData(context, CAT_URL, id, data);
}

export const Delete = async (context, id) => {
    await DeleteData(context, CAT_URL, id);
}