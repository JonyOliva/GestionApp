import { PROD_URL } from "../Constants";

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
            if (context.setAlert) context.setAlert("Error: ", "danger", error.message, true)
        });
};

export const PostProduct = async (context, data) => {
    await fetch(PROD_URL, {
        headers: context.headers(),
        method: "POST",
        body: JSON.stringify(data)
    })
        .then((resp) => {
            if (resp.ok) {
                if (context.setAlert)
                context.setAlert("Guardado", "success", "", true);
              } else if (resp.status === 401)
                throw new Error("No posee los privilegios para realizar esta acción");
        })
        .catch((error) => {
            console.log(error)
            if (context.setAlert) context.setAlert("Error: ", "danger", error.message, true)
        });
}