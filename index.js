let isOrderAccepted = false;

let isWaletFound = false;
let hasRestaurentSeenYourOrder = false;

const acceptOrder = document.getElementById("acceptOrder");
console.log(acceptOrder);

window.addEventListener("load", () => {
  acceptOrder.addEventListener("click", () => {
    askRestaurentToAcceptOrReject();
    const res = checkIfOrderAcceptedOrNot();
    console.log(res);
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
  var promise = new Promise((resolve, reject) => {
    setInterval(() => {
      console.log("Checking order accepted or not");
      // Chechking if Restaurent has checked order or not
      if (!hasRestaurentSeenYourOrder) return;
      if (isOrderAccepted) {
        resolve(true);
      } else {
        reject(false);
      }
    }, 2000);
  });

  return promise;
}
