
export const GetData = async (context, url) => {
  return await fetch(url, {
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
          context.alert.set("Error: ", "danger", error.message, true)
      });
}

export const DeleteData = async (context, url, id) => {
  await fetch(url+"/"+id, {
      headers: context.headers(),
      method: "DELETE",
  })
      .then((resp) => {
          if (resp.ok) {
              context.alert.set("Guardado", "success", "", true);
            } else if (resp.status === 401)
              throw new Error("No posee los privilegios para realizar esta acción");
      })
      .catch((error) => {
          console.log(error)
          context.alert.set("Error: ", "danger", error.message, true)
      });
}

export const PostData = async (context, url, data) => {
  await fetch(url, {
      headers: context.headers(),
      method: "POST",
      body: JSON.stringify(data)
  })
      .then((resp) => {
          if (resp.ok) {
              context.alert.set("Guardado", "success", "", true);
            } else if (resp.status === 401)
              throw new Error("No posee los privilegios para realizar esta acción");
      })
      .catch((error) => {
          console.log(error)
          context.alert.set("Error ", "danger", error.message, true)
      });
}

export const PutData = async (context, url, id, data) => {
  await fetch(url+"/"+id, {
      headers: context.headers(),
      method: "PUT",
      body: JSON.stringify(data)
  })
      .then((resp) => {
          if (resp.ok) {
              context.alert.set("Guardado", "success", "", true);
            } else if (resp.status === 401)
              throw new Error("No posee los privilegios para realizar esta acción");
      })
      .catch((error) => {
          console.log(error)
          context.alert.set("Error: ", "danger", error.message, true)
      });
}