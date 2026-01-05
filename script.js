const formulario = document.getElementById("formulario");
const contenedorGenero = document.getElementById("contenedor-genero");
const labelTerminos = document.getElementById("label-terminos");

function mostrarError(idCampo, mensaje) {
  const mensajeError = document.getElementById("error-" + idCampo);
  if (mensajeError) {
    mensajeError.textContent = mensaje;
    mensajeError.classList.add("mostrar");
  }
}
function limpiarError(idCampo) {
  const mensajeError = document.getElementById("error-" + idCampo);
  if (mensajeError) {
    mensajeError.textContent = "";
    mensajeError.classList.remove("mostrar");
  }
}

function limpiarTodosErrores() {
  const mensajes = document.querySelectorAll(".mensaje-error");
  for (let i = 0; i < mensajes.length; i++) {
    mensajes[i].textContent = "";
    mensajes[i].classList.remove("mostrar");
  }
}
function validarNombre() {
  const nombre = document.getElementById("nombre");
  limpiarError("nombre");

  if (nombre.value.trim() === "") {
    nombre.classList.add("error");
    mostrarError("nombre", "Nombre completo obligatorio");
    return false;
  }

  if (nombre.value.trim().length < 3) {
    nombre.classList.add("error");
    mostrarError("nombre", "El nombre debe tener al menos 3 caracteres");
    return false;
  }

  nombre.classList.remove("error");
  return true;
}

function validarEmail() {
  const email = document.getElementById("email");
  limpiarError("email");

  if (email.value.trim() === "") {
    email.classList.add("error");
    mostrarError("email", "Correo electrónico obligatorio");
    return false;
  }

  const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formatoEmail.test(email.value)) {
    email.classList.add("error");
    mostrarError("email", "Por favor introduce un formato de email válido");
    return false;
  }

  email.classList.remove("error");
  return true;
}

function validarTelefono() {
  const telefono = document.getElementById("telefono");
  limpiarError("telefono");

  if (telefono.value.trim() !== "") {
    const soloNumeros = /^[0-9]+$/;
    if (!soloNumeros.test(telefono.value)) {
      telefono.classList.add("error");
      mostrarError("telefono", "Sólo números");
      return false;
    }
  }

  telefono.classList.remove("error");
  return true;
}

function validarFecha() {
  const fecha = document.getElementById("fecha");
  limpiarError("fecha");

  if (fecha.value === "") {
    fecha.classList.add("error");
    mostrarError("fecha", "Fecha de nacimiento obligatoria");
    return false;
  }

  fecha.classList.remove("error");
  return true;
}

function validarGenero() {
  const genero = document.querySelector('input[name="genero"]:checked');
  limpiarError("genero");

  if (!genero) {
    contenedorGenero.classList.add("error");
    mostrarError("genero", "Por favor selecciona un género");
    return false;
  }

  contenedorGenero.classList.remove("error");
  return true;
}

function validarPais() {
  const pais = document.getElementById("pais");
  limpiarError("pais");

  if (pais.value === "") {
    pais.classList.add("error");
    mostrarError("pais", "Por favor selecciona un país");
    return false;
  }

  pais.classList.remove("error");
  return true;
}

function validarTerminos() {
  const terminos = document.getElementById("terminos");
  limpiarError("terminos");

  if (!terminos.checked) {
    labelTerminos.classList.add("error");
    mostrarError("terminos", "Debes aceptar los términos y condiciones");
    return false;
  }

  labelTerminos.classList.remove("error");
  return true;
}

document.getElementById("nombre").addEventListener("blur", validarNombre);
document.getElementById("email").addEventListener("blur", validarEmail);
document.getElementById("telefono").addEventListener("blur", validarTelefono);
document.getElementById("fecha").addEventListener("blur", validarFecha);
document.getElementById("pais").addEventListener("blur", validarPais);
document.getElementById("terminos").addEventListener("change", validarTerminos);

const radiosGenero = document.getElementsByName("genero");
for (let i = 0; i < radiosGenero.length; i++) {
  radiosGenero[i].addEventListener("change", validarGenero);
}

formulario.onsubmit = function (evento) {
  evento.preventDefault();
  const campos = document.querySelectorAll(
    "input:not([type='radio']):not([type='checkbox']), select"
  );
  for (let i = 0; i < campos.length; i++) {
    campos[i].classList.remove("error");
  }
  contenedorGenero.classList.remove("error");
  labelTerminos.classList.remove("error");
  limpiarTodosErrores();

  const nombreValido = validarNombre();
  const emailValido = validarEmail();
  const telefonoValido = validarTelefono();
  const fechaValida = validarFecha();
  const generoValido = validarGenero();
  const paisValido = validarPais();
  const terminosValidos = validarTerminos();

  const valido =
    nombreValido &&
    emailValido &&
    telefonoValido &&
    fechaValida &&
    generoValido &&
    paisValido &&
    terminosValidos;

  if (!valido) {
    alert("Por favor, rellena todos los campos obligatorios");
  } else {
    alert("Formulario enviado correctamente, gracias :) ");
    formulario.reset();
    limpiarTodosErrores();
  }
};
