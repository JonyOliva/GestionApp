import { RSTOCK_URL } from "../Constants";

export const PostStock = async (context, data) => {
    await fetch(RSTOCK_URL, {
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

export const GetStock = async (context) => {
    return await fetch(RSTOCK_URL, {
        headers: context.headers(),
        method: "GET"
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
}

export const DeleteStock = async (context, id) => {
    await fetch(RSTOCK_URL+"/"+id, {
        headers: context.headers(),
        method: "DELETE",
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