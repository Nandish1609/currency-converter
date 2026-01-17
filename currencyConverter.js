const fromCurrency = document.querySelector("#fromCurrency");
const toCurrency = document.querySelector("#toCurrency");
const resultText = document.querySelector("#resultText");
const convertBtn = document.querySelector("#convertBtn");
const lastUpdated=document.querySelector("#lastUpdated");

for (const country in countryList) {
  const newOption = document.createElement("option");
  newOption.innerText = country;
  newOption.value = country;
  fromCurrency.appendChild(newOption);
}

for (const country in countryList) {
  const newOption = document.createElement("option");
  newOption.innerText = country;
  newOption.value = country;
  toCurrency.appendChild(newOption);
}

fromCurrency.options[149].selected=true;
toCurrency.options[66].selected=true;

convertBtn.addEventListener("click", (e) => {
  convertBtn.disabled = true;
  const inputAmt = document.querySelector("#amount").value;
  if (inputAmt != "" && !isNaN(inputAmt)) {
    const inputAmtNumber = Number(inputAmt);
    resultText.textContent = "Converting...";
    get_currency(inputAmtNumber);
  } else {
    resultText.textContent = "Enter a valid Amount!";
    convertBtn.disabled = false;
  }
});

async function get_currency(inputAmtNumber) {
  const fromCurrencyValue = fromCurrency.value.toLowerCase();
  const toCurrencyValue = toCurrency.value.toLowerCase();
  try {
    if (fromCurrencyValue === toCurrencyValue) {
      resultText.textContent = `${inputAmtNumber}${fromCurrencyValue.toUpperCase()} = ${inputAmtNumber.toFixed(4)}${toCurrencyValue.toUpperCase()}`;
    } else {
      const response = await fetch(
        `https://latest.currency-api.pages.dev/v1/currencies/${fromCurrencyValue}.json`,
      );
      const currencies = await response.json();
      lastUpdated.textContent = `Rates last updated on ${currencies.date}`;
      const convertedAmt =
        inputAmtNumber * currencies[fromCurrencyValue][toCurrencyValue];
      resultText.textContent = `${inputAmtNumber}${fromCurrencyValue.toUpperCase()} = ${convertedAmt.toFixed(4)}${toCurrencyValue.toUpperCase()}`;
    }
  } catch (error) {
    resultText.textContent = "Sorry Try after Some Time.";
  }
  convertBtn.disabled = false;
}