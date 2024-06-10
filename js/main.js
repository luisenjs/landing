let loaded = (eventLoaded) => {
  let myform = document.getElementById("formulario");
  myform.addEventListener('submit', (eventSubmit) => {
    eventSubmit.preventDefault();
    let nombre = document.getElementById("nombre-form").value;
    let correo = document.getElementById("correo-form").value;
    let interes = document.getElementById("interes-form").value;
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
      correo: correo,
      interes: interes
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

async function obtenerDatos() {
  const url = "https://dawm-82af5-default-rtdb.firebaseio.com/coleccion.json";
  const respuesta = await fetch(url);
  debugger;
  if (!respuesta.ok) {
    console.error("Error:", respuesta.status);
    return;
  }
  const datos = await respuesta.json();
  let interesTotales = new Map();
  for (var key in datos) {
    let elementos = datos[key];
    let interes = elementos["interes"];
    let conteo = interesTotales.has(interes)?interesTotales.get(interes)+1:1;
    interesTotales.set(interes,conteo);
  }
  console.log(interesTotales);
}

obtenerDatos();