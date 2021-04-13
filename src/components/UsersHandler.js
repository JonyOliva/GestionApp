import { USU_URL } from "../Constants";
import {GetData, PostData, PutData, DeleteData} from "./DataFunc";

export const Get = async (context) => {
    return await GetData(context, USU_URL);
};

export const Post = async (context, data) => {
    await PostData(context, USU_URL, data);
}

export const Put = async (context, id, data) => {
    await PutData(context, USU_URL, id, data);
}

export const Delete = async (context, id) => {
    await DeleteData(context, USU_URL, id);
}