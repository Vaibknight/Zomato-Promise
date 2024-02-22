let isOrderAccepted = false;

let isWaletFound = false;
let hasRestaurentSeenYourOrder = false;

let restaurentTimer = null;

const acceptOrder = document.getElementById("acceptOrder");
console.log(acceptOrder);

window.addEventListener("load", () => {
  acceptOrder.addEventListener("click", () => {
    askRestaurentToAcceptOrReject();
  });

  checkIfOrderAcceptedOrNot()
    .then((isOrderAccepted) => {
      console.log("Update from restaurent - ");
      if (isOrderAccepted) startPreparingOrder();
      else alert("Sorry we couldn't accept your order");
    })
    .catch((err) => {
      console.error(err);
      alert("Something went wrong! Please try again later");
    });
});

// Step 1 Restaurent Accepting Order or Not
function askRestaurentToAcceptOrReject() {
  setTimeout(() => {
    isOrderAccepted = confirm("Should restaurent accepted order");
    hasRestaurentSeenYourOrder = true;
    console.log(isOrderAccepted);
  }, 1000);
  // let demoPromise = new Promise((resolve,reject)=>{
  // })
}

// Step 2 Check if Restaurent has accepted order
function checkIfOrderAcceptedOrNot() {
  // Promise - resolve or reject
  var promise = new Promise((resolve, reject) => {
    restaurentTimer = setInterval(() => {
      console.log("Checking order accepted or not");
      // Chechking if Restaurent has checked order or not
      if (!hasRestaurentSeenYourOrder) return;
      if (isOrderAccepted) {
        resolve(true);
      } else {
        resolve(false);
      }

      clearInterval(restaurentTimer);
    }, 2000);
  });

  return promise;
}

function startPreparingOrder() {
  Promise.allSettled([
    updateOrderStatus(),
    UpdateMapView(),
    // startSearchingForVaulets(),
    // checkForOrderDelivery(),
  ])
    .then((res) => {
      console.log(res);
      setTimeout(() => {
        alert("Ratings of Food");
      }, 2000);
    })
    .catch((err) => {
      console.error(err);
    });
}

function updateOrderStatus() {
  document.getElementById("currentStatus").innerText = `Preparing Your Order`;
}

function UpdateMapView() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      document.getElementById("mapview").style.opacity = "1";
      resolve("Done");
    }, 2000);
  });
}

function startSearchingForVaulets() {}

function getRandomDriver() {}
