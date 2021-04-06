import { RSTOCK_URL } from "../Constants";

export var PostStock = async (context, data, setAlert) => {
    await fetch(RSTOCK_URL, {
        headers: context.headers(),
        method: "POST",
        body: JSON.stringify(data)
    })
        .then((resp) => {
            if (resp.ok) {
                if (setAlert)
                  setAlert("Guardado", "success", "", true);
              } else if (resp.status === 401)
                throw new Error("No posee los privilegios para realizar esta acción");
        })
        .catch((error) => {
            console.log(error)
            if (setAlert) setAlert("Error: ", "danger", error.message, true)
        });
}