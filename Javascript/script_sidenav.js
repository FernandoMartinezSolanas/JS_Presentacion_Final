function openNav() {
  document.getElementById("mySidenav").style.width = "350px";
  document.getElementById("main").style.marginRight = "350px";
  }

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginRight = "0";
}

document.getElementById("carritoIcon").addEventListener("click", () => openNav());
document.getElementById("carritoIcon").addEventListener("click", function(event){
  event.preventDefault()
})
