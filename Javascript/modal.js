// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
//var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
let cancel = document.getElementById("cancel");
// When the user clicks on the button, open the modal
//btn.onclick = function() {
//  modal.style.display = "block";
//}

$("#myBtn").click(function(){
  if (carrito.length === 0) {
  } else {
  $("#myModal").css("display", "block")
  $("#modal-content").animate({top: '50px'});
}})

  $("#confirmarCompra").click(function(){
  $("#modal-content").fadeOut(2000);
  localStorage.clear();
  let reload = function(){
  location.reload()
  }
  setTimeout(reload, 2000)
  })

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

cancel.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it MANTENER PARA LA PROXIMA ENTREGA
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Finalizamos y confirmamos la compra.
document.getElementById('confirmarCompra')
.addEventListener("click", function(){
document.getElementById('modal-content').innerHTML=`
  <h4> Gracias por su compra <h4>`});
