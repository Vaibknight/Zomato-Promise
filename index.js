let isOrderAccepted = false;

let isWaletFound = false;
let hasRestaurentSeenYourOrder = false;

let restaurentTimer = null;

let valetTimer = null;

let valetDeliveryTimer = null;
let isOrderDelivered = false;

const acceptOrder = document.getElementById("acceptOrder");
console.log(acceptOrder);

window.addEventListener("load", () => {
  acceptOrder.addEventListener("click", () => {
    askRestaurentToAcceptOrReject();
  });

  document.getElementById("findValet").addEventListener("click", () => {
    startSearchingForVaulets();
  });

  this.document.getElementById("deliverOrder").addEventListener("click", () => {
    setTimeout(() => {
      isOrderDelivered = true;
    }, 2000);
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
    checkIfValetAssigned,

    checkForOrderDelivery(),
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
  document.getElementById("currentStatus").innerText = isOrderDelivered
    ? "Order Delivered Successfully"
    : `Preparing Your Order`;
}

function UpdateMapView() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      document.getElementById("mapview").style.opacity = "1";
      resolve("Done");
    }, 2000);
  });
}

function startSearchingForVaulets() {
  const valetPromises = [];
  for (let i = 0; i < 5; i++) {
    valetPromises.push(getRandomDriver());
  }
  console.log(valetPromises);

  Promise.any(valetPromises)
    .then((selectedValet) => {
      console.log("Select a vallet", selectedValet);
      isWaletFound = true;
    })
    .catch((err) => {
      console.error(err);
    });
}

function getRandomDriver() {
  return new Promise((resolve, reject) => {
    const timeout = Math.random() * 1000;
    setTimeout(() => {
      resolve("Valet - " + timeout);
    }, timeout);
  });
}

function checkIfValetAssigned() {
  return new Promise((resolve, reject) => {
    valetTimer = setInterval(() => {
      if (isWaletFound) {
        UpdateValetDetails();
        resolve("Updated Valet details");
        clearTimeout(valetTimer);
      }
    }, 1000);
  });
}

function checkForOrderDelivery() {
  return new Promise((resolve, reject) => {
    valetDeliveryTimer = setInterval(() => {
      console.log("Is order delivered by valet");
      if (isOrderDelivered) {
        resolve("Order delivered Valet details");
        updateOrderStatus();
        clearTimeout(valetTimer);
      }
    }, 1000);
  });
}

function UpdateValetDetails() {
  if (isWaletFound) {
    document.getElementById("finding-driver").classList.add("none");
    document.getElementById("found-driver").classList.remove("none");
    document.getElementById("call").classList.remove("none");
  }
}
