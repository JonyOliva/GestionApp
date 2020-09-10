export var FetchData = async (url, method, headers, data, setAlert) => {
  console.log(headers)
    await fetch(url, {
      headers: headers,
      method: method,
      body: JSON.stringify(data),
    })
      .then((resp) => {
        if (resp.ok) {
            if(setAlert)
            setAlert("Guardado", "success", "", true);
        }else if(resp.status == 401)
        throw new Error("No posee los privilegios para realizar esta acción");
      })
      .catch((error) => {
          if(setAlert) setAlert("Error: ", "danger", error.message, true)
        });
  };