import { CLI_URL } from "../Constants";
import {GetData, PostData, PutData, DeleteData} from "./DataFunc";

export const Get = async (context) => {
    return await GetData(context, CLI_URL);
};

export const Post = async (context, data) => {
    await PostData(context, CLI_URL, data);
}

export const Put = async (context, id, data) => {
    await PutData(context, CLI_URL, id, data);
}