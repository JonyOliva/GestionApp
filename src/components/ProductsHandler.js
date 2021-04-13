import { PROD_URL } from "../Constants";
import { GetData, PostData, PutData, DeleteData } from "./DataFunc";

export const GetByID = async (context, id) => {
    let url = PROD_URL + "/" + id
    return await fetch(url, {
        headers: context.headers(),
        method: "GET",
    })
        .then((resp) => {
            return resp.json();
        }).then((json) => {
            return json;
        })
        .catch((error) => {
            console.log(error)
            context.alert.set("Error: ", "danger", error.message, true)
        });
};

export const Get = async (context) => {
    return await GetData(context, PROD_URL);
}

export const Post = async (context, data) => {
    await PostData(context, PROD_URL, data);
}

export const Put = async (context, id, data) => {
    await PutData(context, PROD_URL, id, data);
}

export const Delete = async (context, id) => {
    await DeleteData(context, PROD_URL, id);
}