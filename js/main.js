document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario");
  form.addEventListener("submit", handleFormSubmit);
  obtenerDatos();
});

async function handleFormSubmit(event) {
  event.preventDefault();
  const nombre = document.getElementById("nombre-form").value;
  const correo = document.getElementById("correo-form").value;
  const interes = document.getElementById("interes-form").value;

  if (!nombre || !correo || interes === "none") {
    alert("Complete todos los campos y seleccione un interés válido");
    return;
  }

  const datos = { nombre, correo, interes };

  try {
    await fetch("https://dawm-82af5-default-rtdb.firebaseio.com/coleccion.json", {
      method: "POST",
      body: JSON.stringify(datos),
      headers: { "Content-Type": "application/json" }
    });

    nombreInput.value = "";
    correoInput.value = "";
    interesInput.value = "none";

  } catch (error) {
    console.error(error);
  }
  
  obtenerDatos();
}

async function obtenerDatos() {
  const url = "https://dawm-82af5-default-rtdb.firebaseio.com/coleccion.json";

  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) {
      console.error("Error:", respuesta.status);
      return;
    }

    const datos = await respuesta.json();
    const interesTotales = new Map();
    const correosUnicos = new Set();

    for (const key in datos) {
      const { interes, correo } = datos[key];
      correosUnicos.add(correo);
      interesTotales.set(interes, (interesTotales.get(interes) || 0) + 1);
    }

    interesTotales.set("usuariosTotales", correosUnicos.size);
    mostrarIntereses(interesTotales);
  } catch (error) {
    console.error(error);
  }
}

function mostrarIntereses(interestsMap) {
  const mappings = {
    kpop: "intereskpop",
    kdrama: "intereskdrama",
    kbeauty: "intereskbeauty",
    usuariosTotales: "usuariostotales"
  };

  interestsMap.forEach((count, interest) => {
    const elementId = mappings[interest];
    if (elementId) {
      const element = document.getElementById(elementId);
      if (element) {
        element.textContent = count;
      }
    }
  });
}

$(document).ready(function() {
  $(window).on('scroll', function() {
      var scrollPos = $(window).scrollTop();
      $('ul.custom-navbar-nav li a').each(function() {
          var currLink = $(this);
          var refElement = $(currLink.attr("href"));
          if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
              $('ul.custom-navbar-nav li a').removeClass("active");
              currLink.addClass("active");
          }
      });
  });
});
