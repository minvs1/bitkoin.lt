// no miner here
var rates;
var lastChangedValues = [];
var inputs = document.querySelectorAll(".rates > .rate > div > input");
var eventName = "keyup";

function fetchRates(initialize = false) {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function() {
    rates = JSON.parse(this.responseText);

    inputs.forEach(function(input) {
      if (initialize) {
        createEventListener(input, eventName);

        if (input.id.split("-")[0] === "BTC") {
          input.value = 1;
          input.dispatchEvent(new Event(eventName));
        }
      } else {
        if (lastChangedValues.indexOf(input.id) > -1) {
          input.dispatchEvent(new Event(eventName));
        }
      }
    });
  });
  oReq.open("GET", "https://blockchain.info/ticker");
  oReq.send();
}

fetchRates(true);

setInterval(function() {
  fetchRates();
}, 8888);

function createEventListener(input, eventName) {
  input.addEventListener(eventName, function(event) {
    var target = event.currentTarget;
    var givenValue = Number.parseFloat(target.value);

    if (Number.isNaN(givenValue)) {
      return;
    }

    var id = target.id.split("-");
    var isGivenValueBTC = id[0] === "BTC";
    var rate = rates[isGivenValueBTC ? id[1] : id[0]]["15m"];
    var updatingId = id[1] + "-" + id[0];
    var newValue;

    if (isGivenValueBTC) {
      newValue = Number((givenValue * rate).toFixed(2));
    } else {
      newValue = Number((givenValue * (1 / rate)).toFixed(8));
    }

    document.getElementById(updatingId).value = newValue;

    var updatingIdIndex = lastChangedValues.indexOf(updatingId);

    if (updatingIdIndex !== -1) {
      lastChangedValues.splice(updatingIdIndex, 1);
    }

    if (lastChangedValues.indexOf(target.id) === -1) {
      lastChangedValues.push(target.id);
    }
  });
}
