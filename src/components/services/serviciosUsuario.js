import axios from 'axios';

axios.post("http://localhost:8080/api/tarjetas", {
  nombre: "Tarjeta de ejemplo",
  imagenPrincipal: "https://url.com/imagen.jpg",
  descripcion: "Descripción aquí"
})
.then(res => {
  console.log("Respuesta:", res.data);
})
.catch(err => {
  console.error("Error:", err);
});
