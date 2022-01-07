//CLASE CONSTRUCTORA
class Producto {
  constructor(nombre, precio, stock, imagen, ID, raza) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.imagen = imagen;
    this.ID = ID;
    this.raza = raza;
  }
}

//OBTENGO EL ARRAY DE JSON Y USO LA CLASE CONTSTRUCTORA
const productos = []
const URLGET = "../json/productos.json"

//AGREGAMOS LOS PRODUCTOS AL DOM CON AJAX
$.getJSON(URLGET, function (respuesta, estado) {
  for (let i = 0; i <= respuesta.length - 1; i++) {
  productos.push(new Producto(respuesta[i].nombre, respuesta[i].precio, respuesta[i].stock, respuesta[i].imagen, respuesta[i].ID, respuesta[i].raza));
  }
    agregarProds()
    agregarTodos()
    filtrarPrecio()
    })

//FUNCION CON LA CUAL AGREGAMOS LOS PRODUCTOS AL DOM
function agregarProds(){
  for (const item of productos) {
  let contenedor = document.createElement("div");
  contenedor.classList.add("producto");
  contenedor.classList.add(`${item.raza}`);
  contenedor.innerHTML = `
  <img class="imagenProd" src="${item.imagen}">
  <h3 class="productoNombre">${item.nombre}</h3>
  <h3 class="productoPrecio">$ ${item.precio} P/kg</h3>
  <p id="qty${item.ID}"></p>
  <button onclick="openNav()" class="boton" type="submit" id="myBtn${item.ID}">🛒 Agregar</button>`;
  document.getElementById("carrito").appendChild(contenedor);
  $(`#myBtn${item.ID}`).click(function() {agregarElemento(item.ID);
  $(`#myBtn${item.ID}`).html("Item Agregado");
  $(`#myBtn${item.ID}`).prop("disabled", true);
  $('#carritoQ').html(carrito.length);
  totalAComprar()})}
  for (const ID of carrito) {
  $(`#myBtn${ID.ID}`).html("Item Agregado");
  $(`#myBtn${ID.ID}`).prop("disabled", true)}
}

//FUNCION CON LA CUAL AGREGAMOS "TODOS" LOS PRODUCTOS AL DOM Y FILTRO POR RAZA DE ANIMAL
function agregarTodos(){
  $('#botonProd').click(function(){
  if ($('#tipoProd').val() == "Todos") {
    $('.producto').remove();
    agregarProds()
  }
else {
  const filtroRaza = productos.filter(item => item.raza == $('#tipoProd').val());
  $('.producto').remove();
  for (const item of filtroRaza) {
  let contenedor = document.createElement("div");
  contenedor.classList.add("producto");
  contenedor.classList.add(`${item.raza}`);
  contenedor.innerHTML = `
  <img class="imagenProd" src="${item.imagen}">
  <h3 class="productoNombre">${item.nombre}</h3>
  <h3 class="productoPrecio">$ ${item.precio} P/kg</h3>
  <p id="qty${item.ID}"></p>
  <button onclick="openNav()" class="boton" type="submit" id="myBtn${item.ID}">🛒 Agregar</button>`;
  document.getElementById("carrito").appendChild(contenedor);
  $(`#myBtn${item.ID}`).click(function() {agregarElemento(item.ID);
  $(`#myBtn${item.ID}`).html("Item Agregado");
  $(`#myBtn${item.ID}`).prop("disabled", true);
  $('#carritoQ').html(carrito.length);
  totalAComprar()})}
  for (const ID of carrito) {
  $(`#myBtn${ID.ID}`).html("Item Agregado");
  $(`#myBtn${ID.ID}`).prop("disabled", true)}
}})}


//FUNCION CON LA CUAL APLICAMOS FILTRO POR PRECIO
function filtrarPrecio(){
  $('#botonPrecio').click(function(){
  let precioMin = parseInt($('#precioMin').val())
  let precioMax = parseInt($('#precioMax').val())
  const filtroPrecio = productos.filter(item => item.precio <= precioMax && item.precio >= precioMin);
  $('.producto').remove();
  for (const item of filtroPrecio) {
  let contenedor = document.createElement("div");
  contenedor.classList.add("producto");
  contenedor.classList.add(`${item.raza}`);
  contenedor.innerHTML = `
  <img class="imagenProd" src="${item.imagen}">
  <h3 class="productoNombre">${item.nombre}</h3>
  <h3 class="productoPrecio">$ ${item.precio} P/kg</h3>
  <p id="qty${item.ID}"></p>
  <button onclick="openNav()" class="boton" type="submit" id="myBtn${item.ID}">🛒 Agregar</button>`;
  document.getElementById("carrito").appendChild(contenedor);
  $(`#myBtn${item.ID}`).click(function() {agregarElemento(item.ID);
  $(`#myBtn${item.ID}`).html("Item Agregado");
  $(`#myBtn${item.ID}`).prop("disabled", true);
  $('#carritoQ').html(carrito.length);
  totalAComprar()})}
  for (const ID of carrito) {
  $(`#myBtn${ID.ID}`).html("Item Agregado");
  $(`#myBtn${ID.ID}`).prop("disabled", true)}
})}


//FUNCION PARA AGREGAR LOS PRODUCTOS AL CARRITO
const carrito = [];
function agregarElemento(prodID) {
  let productoAAgregar = productos.find((item) => item.ID == prodID);
  carrito.push(productoAAgregar);
  carrito[carrito.findIndex((x) => x.ID === prodID)].qty = 1;
  cargarDOM(carrito[carrito.findIndex((x) => x.ID === prodID)])
  document.getElementById('carritoQ').innerHTML = carrito.length
  const carritoAGuardar = JSON.stringify(carrito);
  const carritoSet = localStorage.setItem("carrito", carritoAGuardar);
}

//FUNCION PARA AUMENTAR Y DISMINUIR LA CANTIDAD DE PRODUCTOS EN EL CARRITO
function aumentarCantidad(ID) {
  let producto = carrito.find((item) => item.ID == ID);
  producto.qty++;
  const p = document.getElementById(`cantidad${ID}`);
  p.innerHTML = "";
  p.innerHTML = `&nbsp ${producto.qty} Kgs &nbsp`;
  const carritoAGuardar = JSON.stringify(carrito);
  const carritoSet = localStorage.setItem("carrito", carritoAGuardar);
  precioTotalProducto(ID);
  totalAComprar(ID);
}

function restarCantidad(ID) {
  let producto = carrito.find((item) => item.ID == ID);
  if (producto.qty <= 0) {
  } else {
    producto.qty--;
  }
  const p = document.getElementById(`cantidad${ID}`);
  p.innerHTML = "";
  p.innerHTML = `&nbsp ${producto.qty} Kgs &nbsp`;
  const carritoAGuardar = JSON.stringify(carrito);
  const carritoSet = localStorage.setItem("carrito", carritoAGuardar);
  precioTotalProducto(ID);
  totalAComprar(ID);
}
//FUNCION PARA ELIMINAR PRODUCTOS DEL CARRITO
function eliminarCarrito(ID) {
  let borrar = carrito.findIndex(item => item.ID == ID);
  carrito.splice(borrar,1);
  const carritoAGuardar = JSON.stringify(carrito);
  const carritoSet = localStorage.setItem("carrito", carritoAGuardar);
  document.getElementById(`delete${ID}`).parentNode.remove();
  totalAComprar(ID);
  document.getElementById('carritoQ').innerHTML = carrito.length;
  if (document.getElementById(`myBtn${ID}`) == null) {return;}
   else {
     document.getElementById(`myBtn${ID}`).innerHTML = "🛒 Agregar";
     document.getElementById(`myBtn${ID}`).disabled = false;
   }}
   //FUNCION QUE NOS BRINDA EL TOTAL POR ITEM
function precioTotalProducto(ID) {
  let producto = carrito.find((item) => item.ID == ID);
  let precioTotal = producto.qty * producto.precio;
  const p = document.getElementById(`precio${ID}`);
  p.innerHTML = "";
  p.innerHTML = "&nbsp $ " + precioTotal;
}

//FUNCION QUE NOS BRINDA EL TOTAL DE LA COMPRA
function totalAComprar() {
  let suma = 0;
  for (const item of carrito) {
    suma += item.qty * item.precio;
  }
  const div = document.getElementById("total");
  div.innerHTML = "";
  div.innerHTML = "TOTAL $ " + suma;
}

//LOCAL STORAGE//
const carritoGet = localStorage.getItem("carrito");
const carritoParse = JSON.parse(carritoGet);
let totalqty = 0;
for (let i = 0; i <= carritoParse.length - 1; i++) {
  totalqty += carritoParse[i].qty;
}
if (carritoParse === null || totalqty === 0) {
} else {

  function openNavv() {
    document.getElementById("mySidenav").style.width = "350px";
    document.getElementById("main").style.marginRight = "350px";
  }
  openNavv();

  for (let i = 0; i <= carritoParse.length - 1; i++) {
    carrito.push(carritoParse[i]);
  }

  for (let i = 0; i <= carrito.length - 1; i++) {
    cargarDOM(carrito[i])
  }

  totalAComprar();
}

// AGREGO CANTIDAD AL CARRITO

document.getElementById('carritoQ').innerHTML = carrito.length;
$('button').click(function() {$('#carritoQ').html(carrito.length)})
$('svg').click(function() {$('#carritoQ').html(carrito.length)})


function cargarDOM(producto) {
  let contenedor = document.createElement("div");
    contenedor.classList.add("item");
    contenedor.innerHTML = `
      <svg  id="delete${producto.ID}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
      </svg>
      <p>&nbsp;${producto.nombre}&nbsp;</p>
      <svg id="mas${producto.ID}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
      </svg>
      <p id='cantidad${producto.ID}'>&nbsp;${producto.qty} Kgs &nbsp;</p>
      <svg id="menos${producto.ID}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-dash-square" viewBox="0 0 16 16">
      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
      </svg>
      <p id='precio${producto.ID}'>&nbsp; $ ${producto.qty * producto.precio} </p>`;
    document.getElementById("TEST").appendChild(contenedor);
    document.getElementById(`mas${producto.ID}`)
        .addEventListener("click", () => aumentarCantidad(producto.ID))
    document.getElementById(`menos${producto.ID}`)
        .addEventListener("click", () => restarCantidad(producto.ID));
    document.getElementById(`delete${producto.ID}`)
        .addEventListener("click", () => eliminarCarrito(producto.ID));
    }
