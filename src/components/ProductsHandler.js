import { PROD_URL } from "../Constants";

export var GetByID = async (context, id, setAlert) => {
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
            if (setAlert) setAlert("Error: ", "danger", error.message, true)
        });
};