// Függvény a háttérszín megváltoztatásához és elmentéséhez
function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
    localStorage.setItem('selectedColor', color);
  }
  
  // Függvény a mentett háttérszín betöltéséhez
  function loadSavedColor() {
    var savedColor = localStorage.getItem('selectedColor');
    if (savedColor) {
      document.body.style.backgroundColor = savedColor;
    }
  }
  
  // Függvény a navbar színének megváltoztatásához és elmentéséhez
  function changeNavbarColor(color) {
    document.getElementById('navbar').style.backgroundColor = color;
    localStorage.setItem('navbarColor', color);
  }
  
  // Függvény a footer színének megváltoztatásához és elmentéséhez
  function changeFooterColor(color) {
    document.getElementById('footer').style.backgroundColor = color;
    localStorage.setItem('footerColor', color);
  }
  
  // Betölti az oldalt és a mentett színeket
  window.onload = function () {
    loadSavedColor();
  
    var savedNavbarColor = localStorage.getItem('navbarColor');
    var savedFooterColor = localStorage.getItem('footerColor');
  
    if (savedNavbarColor) {
      document.getElementById('navbar').style.backgroundColor = savedNavbarColor;
    }
  
    if (savedFooterColor) {
      document.getElementById('footer').style.backgroundColor = savedFooterColor;
    }
  
    // Színek elmentése kattintás után
    var navbarColorPalette = document.getElementById('navbar-color-palette');
    var footerColorPalette = document.getElementById('footer-color-palette');
  
    navbarColorPalette.addEventListener('click', function (event) {
      var target = event.target;
      if (target.classList.contains('color-box')) {
        changeNavbarColor(target.style.backgroundColor);
      }
    });
  
    footerColorPalette.addEventListener('click', function (event) {
      var target = event.target;
      if (target.classList.contains('color-box')) {
        changeFooterColor(target.style.backgroundColor);
      }
    });
  };
  //card-body-container
  $(document).ready(function() {
    $(".card-body-container").css("overflow", "auto");
  });

 