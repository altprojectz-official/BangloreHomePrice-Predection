// Global session history
let predictionHistory = [];

function formatIndianPrice(priceInLakhs) {
  let price = parseFloat(priceInLakhs);
  if (isNaN(price)) return "";
  if (price >= 100) {
    return "₹ " + (price / 100).toFixed(2) + " Crore";
  } else {
    return "₹ " + price.toFixed(2) + " Lakh";
  }
}

function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for (var i in uiBathrooms) {
    if (uiBathrooms[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for (var i in uiBHK) {
    if (uiBHK[i].checked) {
      return parseInt(i) + 1;
    }
  }
  return -1; // Invalid Value
}

function validateInput() {
  var sqft = document.getElementById("uiSqft");
  var location = document.getElementById("uiLocations");
  var isValid = true;

  // Reset errors
  document.getElementById("sqftError").innerText = "";
  sqft.style.borderColor = "#e5e7eb";
  location.style.borderColor = "#e5e7eb";

  if (!sqft.value || parseFloat(sqft.value) <= 0) {
    document.getElementById("sqftError").innerText = "Please enter a valid positive area.";
    sqft.style.borderColor = "#ef4444";
    isValid = false;
  }

  if (location.value == "" || location.value == "Choose a Location") {
    location.style.borderColor = "#ef4444";
    isValid = false;
  }

  return isValid;
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");

  if (!validateInput()) {
    return;
  }

  var sqft = document.getElementById("uiSqft");
  var bhk = getBHKValue();
  var bathrooms = getBathValue();
  var location = document.getElementById("uiLocations");

  // UI Elements
  var submitBtn = document.querySelector(".submit-btn");
  var placeholder = document.getElementById("uiPlaceholder");
  var loader = document.getElementById("uiLoader");
  var resultContent = document.getElementById("uiResultContent");
  var resultCard = document.getElementById("resultCard");

  // State: Loading
  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.7";
  placeholder.style.display = "none";
  resultContent.style.display = "none";
  loader.style.display = "block";

  // Ensure Result Card is visible (if hidden by CSS initially, though now we show placeholder)
  resultCard.style.display = "block";

  var url = "/predict_home_price";
  // var url = "http://127.0.0.1:5001/predict_home_price"; // Local dev

  $.post(url, {
    total_sqft: parseFloat(sqft.value),
    bhk: bhk,
    bath: bathrooms,
    location: location.value
  }, function (data, status) {
    console.log(data);

    // update main price
    // update main price
    var priceVal = parseFloat(data.estimated_price);
    var mainPriceElement = document.getElementById("uiEstimatedPrice");
    var unitElement = document.querySelector(".main-price .unit");

    if (priceVal >= 100) {
      mainPriceElement.innerText = (priceVal / 100).toFixed(2);
      unitElement.innerText = "Crore";
    } else {
      mainPriceElement.innerText = priceVal.toFixed(2);
      unitElement.innerText = "Lakh";
    }

    var minPriceFormatted = formatIndianPrice(data.price_range.min);
    var maxPriceFormatted = formatIndianPrice(data.price_range.max);
    document.getElementById("uiPriceRange").innerText = minPriceFormatted + " - " + maxPriceFormatted;

    document.getElementById("uiPricePerSqft").innerText = "₹ " + data.price_per_sqft;

    // update confidence badge
    var badge = document.getElementById("uiConfidenceBadge");
    badge.innerText = "Confidence: " + data.confidence;
    badge.className = "badge " + data.confidence.toLowerCase();

    // render metrics
    var metricsHtml = "";
    for (var key in data.metrics) {
      metricsHtml += `
        <div class="metric-box">
            <span class="metric-label">${key.toUpperCase().replace('_', ' ')}</span>
            <span class="metric-val">${data.metrics[key]}</span>
        </div>`;
    }
    document.getElementById("uiMetrics").innerHTML = metricsHtml;

    // render features
    var featureHtml = "";
    data.feature_importance.forEach(function (item) {
      featureHtml += `
        <div class="feature-bar">
            <span class="feature-name">${item.feature}</span>
            <div class="bar-container">
                <div class="bar-fill" style="width: ${item.importance}%"></div>
            </div>
            <span class="feature-value">${item.importance}%</span>
        </div>`;
    });
    document.getElementById("uiFeatures").innerHTML = featureHtml;

    // State: Success
    loader.style.display = "none";
    resultContent.style.display = "block";
    resultContent.classList.add("fade-in");
    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";

    // Update History
    addToHistory({
      sqft: sqft.value,
      bhk: bhk,
      bath: bathrooms,
      location: location.value,
      price: data.estimated_price
    });
  });
}

function addToHistory(prediction) {
  predictionHistory.unshift(prediction);
  if (predictionHistory.length > 5) {
    predictionHistory.pop();
  }
  renderHistory();
}

function renderHistory() {
  var tbody = document.getElementById("uiHistoryTable");
  tbody.innerHTML = "";
  predictionHistory.forEach(function (item) {
    var formattedPrice = formatIndianPrice(item.price);
    var row = `<tr>
            <td>${item.sqft}</td>
            <td>${item.bhk}</td>
            <td>${item.bath}</td>
            <td>${item.location}</td>
            <td>${formattedPrice}</td>
        </tr>`;
    tbody.innerHTML += row;
  });
}

function toggleSection(id) {
  var content = document.getElementById(id);
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
}

function onPageLoad() {
  console.log("document loaded");
  var url = "/get_location_names";
  // var url = "http://127.0.0.1:5001/get_location_names"; // Local dev

  $.get(url, function (data, status) {
    console.log("got response for get_location_names request");
    if (data) {
      var locations = data.locations;
      var uiLocations = document.getElementById("uiLocations");
      $('#uiLocations').empty();
      for (var i in locations) {
        var opt = new Option(locations[i]);
        $('#uiLocations').append(opt);
      }
    }
  });
}

window.onload = onPageLoad;
