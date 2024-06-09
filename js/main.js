let loaded = (eventLoaded) => {
  /*window.alert("landing page loaded");
  console.log( eventLoaded );*/
  let myform = document.getElementById("formulario");
  myform.addEventListener('submit', (eventSubmit) => {
    eventSubmit.preventDefault();
    let nombre = document.getElementById("nombre-form").value;
    let correo = document.getElementById("correo-form").value;
    if (nombre.length == 0) {
      alert("Ingrese su nombre por favor");
      return;
    }
    if (correo.length == 0) {
      alert("Ingrese un correo por favor");
      return;
    }
    const datos = {
      nombre: nombre,
      correo: correo
    }
    fetch("https://dawm-82af5-default-rtdb.firebaseio.com/coleccion.json", {
      method: "POST",
      body: JSON.stringify(datos),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(respuesta => respuesta.json())
      .then(datos => {
        console.log(datos);
      })
      .catch(error => console.error(error))
  });
}

window.addEventListener("DOMContentLoaded", loaded);