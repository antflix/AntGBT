// const inputDropdown = document.getElementById("inputDropdown");
// inputDropdown.addEventListener("input", function() {
//     const filterValue = inputDropdown.value.toLowerCase();
//     const options = document.querySelectorAll("#dropdownOptions option");
//     options.forEach(function(option) {
//         if (option.value.toLowerCase().startsWith(filterValue)) {
//             option.style.display = "block";
//         } else {
//             option.style.display = "none";
//         }
//     });
// });

const inputDropdown = document.getElementById("inputDropdown");

inputDropdown.addEventListener("input", function() {
    const filterValue = inputDropdown.value;
    const datalist = document.getElementById("dropdownOptions");

    fetch("/filter_options", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `user_input=${encodeURIComponent(filterValue)}`,
    })
    .then(response => response.json())
    .then(filteredOptions => {
        datalist.innerHTML = ""; // Clear existing options
        filteredOptions.forEach(option => {
            const optionElement = document.createElement("option");
            optionElement.value = option;
            datalist.appendChild(optionElement);
        });
    });
});

$(document).ready(function () {

  $("#tile-1 .nav-tabs a").click(function () {

    var position = $(this).parent().position();

    var width = $(this).parent().width();

    $("#tile-1 .slider").css({ "left": + position.left, "width": width });

  });
  var actWidth = $("#tile-1 .nav-tabs").find(".active").parent("li").width();

  var actPosition = $("#tile-1 .nav-tabs .active").position();

  $("#tile-1 .slider").css({ "left": + actPosition.left, "width": actWidth });

});
///////////////////////////////////////// TOGGLE SWITCH FUNCTIONS //////////////////////////////////////////////
function colorModePreview(ele) {
  var value = $(ele).prop("checked") ? "Decora" : "Standard";
  $('body').toggleClass('dark-preview', $(ele).prop("checked"));
  $('body').toggleClass('white-preview', !$(ele).prop("checked"));

  // AJAX request to send the value to the server
  $.ajax({
    type: "POST",
    url: "/update-color-mode",
    data: { color_mode: value },
    success: function (response) {
      console.log(response); // Handle the server response if needed
    },
    error: function (error) {
      console.log(error); // Handle the error if the request fails
    }
  });
}
//////////////////////////////////////////// TOGGLE DEFAULT AND VALUE FUNCTIONS //////////////////////////////////////////
$(document).ready(function () {
  // Get the initial value of the toggle switch
  var initialValue = $("#color_mode").prop("checked");

  // Set the default value and trigger the colorModePreview function
  if (initialValue) {
    $('body').addClass('dark-preview');
    $('body').removeClass('white-preview');
  } else {
    $('body').addClass('white-preview');
    $('body').removeClass('dark-preview');
  }

  // Trigger the colorModePreview function with the initial value
  colorModePreview($("#color_mode"));

  // Bind the change event to the toggle switch
  $("#color_mode").on("change", function () {
    colorModePreview(this);
  });
});


$(document).ready(function () {
  // Get the initial value of the toggle switch
  var initialValue = $("#color_mode").prop("checked");

  // Set the default value and trigger the colorModePreview function
  if (initialValue) {
    $('body').addClass('dark-preview');
    $('body').removeClass('white-preview');
  } else {
    $('body').addClass('white-preview');
    $('body').removeClass('dark-preview');
  }

  $("#tile-1 .nav-tabs a").click(function () {
    var position = $(this).parent().position();
    var width = $(this).parent().width();
    $("#tile-1 .slider").css({ "left": + position.left, "width": width });
  });

  var actWidth = $("#tile-1 .nav-tabs").find(".active").parent("li").width();
  var actPosition = $("#tile-1 .nav-tabs .active").position();
  $("#tile-1 .slider").css({ "left": + actPosition.left, "width": actWidth });

  function colorModePreview(ele) {
    var value = $(ele).prop("checked") ? "Decora" : "Standard";
    $('body').toggleClass('dark-preview', $(ele).prop("checked"));
    $('body').toggleClass('white-preview', !$(ele).prop("checked"));

    // AJAX request to send the value to the server
    $.ajax({
      type: "POST",
      url: "/update-color-mode",
      data: { color_mode: value },
      success: function (response) {
        console.log(response); // Handle the server response if needed
      },
      error: function (error) {
        console.log(error); // Handle the error if the request fails
      }
    });
  }

  // Trigger the colorModePreview function with the initial value
  colorModePreview($("#color_mode"));

  // Bind the change event to the toggle switch
  $("#color_mode").on("change", function () {
    colorModePreview(this);
  });
});
 // Function to check if dark mode is preferred by the user or operating system
   function isDarkModePreferred() {
    // Check if dark mode is enabled via cookies or local storage
    const darkModePreference = localStorage.getItem('darkModePreference');
    return darkModePreference === 'dark' || (darkModePreference === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
}

// Apply dark mode on page load if preferred
if (isDarkModePreferred()) {
    document.body.classList.add('dark-mode');
    document.getElementById('dark-mode-toggle').checked = true; // Toggle the switch
}

// Dark mode toggle functionality
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkModePreference', 'dark'); // Store preference in local storage
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkModePreference', 'light'); // Store preference in local storage
    }
});
function toggleNav() {
  var sidenav = document.getElementById("mySidenav");
  var main = document.getElementById("main");
  if (sidenav.style.width === "250px") {
    sidenav.style.width = "0";
    main.style.marginRight = "0";
  } else {
    sidenav.style.width = "250px";
    main.style.marginRight = "250px";
  }
}

function myFunction() {
var x = document.getElementById("myLinks");
if (x.style.display === "block") {
  x.style.display = "none";
} else {
  x.style.display = "block";
}
}

function updateTotal(inputIds, totalElementId) {
  const totalElement = document.getElementById(totalElementId);
  let sum = 0;
  inputIds.forEach((inputId) => {
    const inputElement = document.getElementById(inputId);
    const value = parseInt(inputElement.value) || 0;
    sum += value;
  });
  totalElement.textContent = ` ${sum}`;
}

// Add event listeners for each block
document.addEventListener("input", function (event) {
  const target = event.target;
  if (target.tagName === "INPUT") {
    switch (target.closest("details").id) {
      case "duplexOutlets":
        updateTotal(
          ["standard", "decora", "gfci", "cutin", "surface", "1switch"],
          "duplexOutletsTotal"
        );
        break;
      case "quadOutlets":
        updateTotal(
          [
            "quad_standard",
            "quad_decora",
            "quad_gfci",
            "quad_cutin",
            "quad_surface",
            "quad_controlled",
          ],
          "quadOutletsTotal"
        );
        break;
        case "lightSwitches":
          updateTotal(
            [
              "lv_switch",
              "hv_switch",
              "hv_dimming",
              "lv_switchCI",
              "hv_switchCI",
              "hv_dimmingCI",
            ],
            "lightSwitchesTotal"
          );
          break;
      case "furnitureFeeds":
        updateTotal(["3-wire", "4-wire"], "furnitureFeedsTotal");
        break;
      case "dataBox":
        updateTotal(["rough_in_data", "cutin_data"], "dataBoxTotal");
        break;
      case "floorDevices":
        updateTotal(["FC6in", "FC4in"], "floorDevicesTotal");
        break;
      case "instaHots":
        updateTotal(["wh_120", "wh_277", "wh_277v" ], "instaHotsTotal");
        break;
      // Add more cases for additional blocks if needed
    }
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/static/sw.js')
             .then(function(registration) {
             console.log('Service Worker Registered');
             return registration;
    })
    .catch(function(err) {
      console.error('Unable to register service worker.', err);
    });
    navigator.serviceWorker.ready.then(function(registration) {
      console.log('Service Worker Ready');
    });
  });
}

let deferredPrompt;
const btnAdd = document.querySelector('#btnAdd');

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('beforeinstallprompt event fired');
  e.preventDefault();
  deferredPrompt = e;
  btnAdd.style.visibility = 'visible';
});

btnAdd.addEventListener('click', (e) => {
  btnAdd.style.visibility = 'hidden';
  deferredPrompt.prompt();
  deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
});

window.addEventListener('appinstalled', (evt) => {
  app.logEvent('app', 'installed');
});

function toggleNav() {
  var sidenav = document.getElementById("mySidenav");
  var main = document.getElementById("main");
  if (sidenav.style.width === "250px") {
    sidenav.style.width = "0";
    main.style.marginRight = "0";
  } else {
    sidenav.style.width = "250px";
    main.style.marginRight = "250px";
  }
}

function myFunction() {
var x = document.getElementById("myLinks");
if (x.style.display === "block") {
  x.style.display = "none";
} else {
  x.style.display = "block";
}
}

function updateTotal(inputIds, totalElementId) {
  const totalElement = document.getElementById(totalElementId);
  let sum = 0;
  inputIds.forEach((inputId) => {
    const inputElement = document.getElementById(inputId);
    const value = parseInt(inputElement.value) || 0;
    sum += value;
  });
  totalElement.textContent = ` ${sum}`;
}

// Add event listeners for each block
document.addEventListener("input", function (event) {
  const target = event.target;
  if (target.tagName === "INPUT") {
    switch (target.closest("details").id) {
      case "duplexOutlets":
        updateTotal(
          ["standard", "decora", "gfci", "cutin", "surface", "1switch"],
          "duplexOutletsTotal"
        );
        break;
      case "quadOutlets":
        updateTotal(
          [
            "quad_standard",
            "quad_decora",
            "quad_gfci",
            "quad_cutin",
            "quad_surface",
            "quad_controlled",
          ],
          "quadOutletsTotal"
        );
        break;
        case "lightSwitches":
          updateTotal(
            [
              "lv_switch",
              "hv_switch",
              "hv_dimming",
              "lv_switchCI",
              "hv_switchCI",
              "hv_dimmingCI",
            ],
            "lightSwitchesTotal"
          );
          break;
      case "furnitureFeeds":
        updateTotal(["3-wire", "4-wire"], "furnitureFeedsTotal");
        break;
      case "dataBox":
        updateTotal(["rough_in_data", "cutin_data"], "dataBoxTotal");
        break;
      case "floorDevices":
        updateTotal(["FC6in", "FC4in"], "floorDevicesTotal");
        break;
      case "instaHots":
        updateTotal(["wh_120", "wh_277", "wh_277v" ], "instaHotsTotal");
        break;
      // Add more cases for additional blocks if needed
    }
  }
});

(function() {
  if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/static/sw.js')
               .then(function(registration) {
               console.log('Service Worker Registered');
               return registration;
      })
      .catch(function(err) {
        console.error('Unable to register service worker.', err);
      });
      navigator.serviceWorker.ready.then(function(registration) {
        console.log('Service Worker Ready');
      });
    });
  }
})();

let deferredPrompt;
const btnAdd = document.querySelector('#btnAdd');

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('beforeinstallprompt event fired');
  e.preventDefault();
  deferredPrompt = e;
  btnAdd.style.visibility = 'visible';
});

btnAdd.addEventListener('click', (e) => {
  btnAdd.style.visibility = 'hidden';
  deferredPrompt.prompt();
  deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
});

window.addEventListener('appinstalled', (evt) => {
  app.logEvent('app', 'installed');
});

function toggleNav() {
  var sidenav = document.getElementById("mySidenav");
  var main = document.getElementById("main");
  if (sidenav.style.width === "250px") {
    sidenav.style.width = "0";
    main.style.marginRight = "0";
  } else {
    sidenav.style.width = "250px";
    main.style.marginRight = "250px";
  }
}

function myFunction() {
var x = document.getElementById("myLinks");
if (x.style.display === "block") {
  x.style.display = "none";
} else {
  x.style.display = "block";
}
}

function updateTotal(inputIds, totalElementId) {
  const totalElement = document.getElementById(totalElementId);
  let sum = 0;
  inputIds.forEach((inputId) => {
    const inputElement = document.getElementById(inputId);
    const value = parseInt(inputElement.value) || 0;
    sum += value;
  });
  totalElement.textContent = ` ${sum}`;
}

// Add event listeners for each block
document.addEventListener("input", function (event) {
  const target = event.target;
  if (target.tagName === "INPUT") {
    switch (target.closest("details").id) {
      case "duplexOutlets":
        updateTotal(
          ["standard", "decora", "gfci", "cutin", "surface", "1switch"],
          "duplexOutletsTotal"
        );
        break;
      case "quadOutlets":
        updateTotal(
          [
            "quad_standard",
            "quad_decora",
            "quad_gfci",
            "quad_cutin",
            "quad_surface",
            "quad_controlled",
          ],
          "quadOutletsTotal"
        );
        break;
        case "lightSwitches":
          updateTotal(
            [
              "lv_switch",
              "hv_switch",
              "hv_dimming",
              "lv_switchCI",
              "hv_switchCI",
              "hv_dimmingCI",
            ],
            "lightSwitchesTotal"
          );
          break;
      case "furnitureFeeds":
        updateTotal(["3-wire", "4-wire"], "furnitureFeedsTotal");
        break;
      case "dataBox":
        updateTotal(["rough_in_data", "cutin_data"], "dataBoxTotal");
        break;
      case "floorDevices":
        updateTotal(["FC6in", "FC4in"], "floorDevicesTotal");
        break;
      case "instaHots":
        updateTotal(["wh_120", "wh_277", "wh_277v" ], "instaHotsTotal");
        break;
      // Add more cases for additional blocks if needed
    }
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/static/sw.js')
             .then(function(registration) {
             console.log('Service Worker Registered');
             return registration;
    })
    .catch(function(err) {
      console.error('Unable to register service worker.', err);
    });
    navigator.serviceWorker.ready.then(function(registration) {
      console.log('Service Worker Ready');
    });
  });
}

let deferredPrompt;
const btnAdd = document.querySelector('#btnAdd');

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('beforeinstallprompt event fired');
  e.preventDefault();
  deferredPrompt = e;
  btnAdd.style.visibility = 'visible';
});

btnAdd.addEventListener('click', (e) => {
  btnAdd.style.visibility = 'hidden';
  deferredPrompt.prompt();
  deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
});

window.addEventListener('appinstalled', (evt) => {
  app.logEvent('app', 'installed');
});

function toggleNav() {
  var sidenav = document.getElementById("mySidenav");
  var main = document.getElementById("main");
  if (sidenav.style.width === "250px") {
    sidenav.style.width = "0";
    main.style.marginRight = "0";
  } else {
    sidenav.style.width = "250px";
    main.style.marginRight = "250px";
  }
}

function myFunction() {
var x = document.getElementById("myLinks");
if (x.style.display === "block") {
  x.style.display = "none";
} else {
  x.style.display = "block";
}
}

function updateTotal(inputIds, totalElementId) {
  const totalElement = document.getElementById(totalElementId);
  let sum = 0;
  inputIds.forEach((inputId) => {
    const inputElement = document.getElementById(inputId);
    const value = parseInt(inputElement.value) || 0;
    sum += value;
  });
  totalElement.textContent = ` ${sum}`;
}

// Add event listeners for each block
document.addEventListener("input", function (event) {
  const target = event.target;
  if (target.tagName === "INPUT") {
    switch (target.closest("details").id) {
      case "duplexOutlets":
        updateTotal(
          ["standard", "decora", "gfci", "cutin", "surface", "1switch"],
          "duplexOutletsTotal"
        );
        break;
      case "quadOutlets":
        updateTotal(
          [
            "quad_standard",
            "quad_decora",
            "quad_gfci",
            "quad_cutin",
            "quad_surface",
            "quad_controlled",
          ],
          "quadOutletsTotal"
        );
        break;
        case "lightSwitches":
          updateTotal(
            [
              "lv_switch",
              "hv_switch",
              "hv_dimming",
              "lv_switchCI",
              "hv_switchCI",
              "hv_dimmingCI",
            ],
            "lightSwitchesTotal"
          );
          break;
      case "furnitureFeeds":
        updateTotal(["3-wire", "4-wire"], "furnitureFeedsTotal");
        break;
      case "dataBox":
        updateTotal(["rough_in_data", "cutin_data"], "dataBoxTotal");
        break;
      case "floorDevices":
        updateTotal(["FC6in", "FC4in"], "floorDevicesTotal");
        break;
      case "instaHots":
        updateTotal(["wh_120", "wh_277", "wh_277v" ], "instaHotsTotal");
        break;
      // Add more cases for additional blocks if needed
    }
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/static/sw.js')
             .then(function(registration) {
             console.log('Service Worker Registered');
             return registration;
    })
    .catch(function(err) {
      console.error('Unable to register service worker.', err);
    });
    navigator.serviceWorker.ready.then(function(registration) {
      console.log('Service Worker Ready');
    });
  });
}

let deferredPrompt;
const btnAdd = document.querySelector('#btnAdd');

window.addEventListener('beforeinstallprompt', (e) => {
  console.log('beforeinstallprompt event fired');
  e.preventDefault();
  deferredPrompt = e;
  btnAdd.style.visibility = 'visible';
});

btnAdd.addEventListener('click', (e) => {
  btnAdd.style.visibility = 'hidden';
  deferredPrompt.prompt();
  deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
});

window.addEventListener('appinstalled', (evt) => {
  app.logEvent('app', 'installed');
});