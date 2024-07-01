const apiKey = 'bf96d8596d35f5762089df39'; // Replace with your API key
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

// Fetching DOM elements
let dropList = document.querySelectorAll("form select");
let fromCurrency = document.querySelector(".from select");
let toCurrency = document.querySelector(".to select");
let icon = document.querySelector(".icon");
let exchangeTxt = document.querySelector(".exchange-rate");
let getBtn = document.querySelector("button");

// Function to populate select boxes with options
function populateSelectBoxes() {
    for (let i = 0; i < dropList.length; i++) {
        for (let currency_code in country_list) {
            let selected =
                i === 0
                    ? currency_code === "USD" ? "selected" : ""
                    : currency_code === "INR" ? "selected" : "";

            let optionTag = `<option value="${currency_code}" ${selected}>
            ${currency_code}</option>`;

            dropList[i].insertAdjacentHTML("beforeend", optionTag);
        }

        dropList[i].addEventListener("change", (e) => {
            loadFlag(e.target);
        });
    }
}

// Function to load flag based on selected currency
function loadFlag(element) {
    for (let code in country_list) {
        if (code === element.value) {
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagcdn.com/48x36/${country_list[
                code
            ].toLowerCase()}.png`;
        }
    }
}

// Function to fetch and display exchange rate
function getExchangeValue() {
    const amount = document.querySelector("form input");
    let amountVal = amount.value;
    if (amountVal === "" || amountVal === "0") {
        amount.value = "1";
        amountVal = 1;
    }

    exchangeTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency.value}`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => {
            let exchangeRate = result.conversion_rates[toCurrency.value];
            let total = (amountVal * exchangeRate).toFixed(2);
            exchangeTxt.innerText = `${amountVal} ${fromCurrency.value} = ${total} ${toCurrency.value}`;
        })
        .catch(() => {
            exchangeTxt.innerText = "Something went wrong";
        });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    populateSelectBoxes();
    getExchangeValue();
});

getBtn.addEventListener("click", (e) => {
    e.preventDefault();
    getExchangeValue();
});

icon.addEventListener("click", () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    loadFlag(fromCurrency);
    loadFlag(toCurrency);
    getExchangeValue();
});
