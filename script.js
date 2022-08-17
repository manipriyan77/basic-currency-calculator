const currencyOne = document.querySelector("#currency-one");
const currencyTwo = document.querySelector("#currency-two");
const amountOne = document.querySelector("#amount-one");
const amountTwo = document.querySelector("#amount-two");

const rateElement = document.querySelector("#rate");
const swap = document.querySelector("#swap");

// feth currency rates

async function fetchValue() {
  const currencyOneSelected = currencyOne.value;
  const currencyTwoSelected = currencyTwo.value;
  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/a251c34ddaf30b5bd936e9f4/latest/${currencyOneSelected}`
  );
  const data = await response.json();
  const rate = data.conversion_rates[currencyTwoSelected];
  rateElement.innerText = `1 ${currencyOneSelected} = ${rate} ${currencyTwoSelected}`;
  amountTwo.value = (amountOne.value * rate).toFixed(2);
}
// function calculate() {
//   const currencyOneSelected = currencyOne.value;
//   const currencyTwoSelected = currencyTwo.value;

//   fetch(`https://v6.exchangerate-api.com/v6/a251c34ddaf30b5bd936e9f4/latest/${currencyOneSelected}`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       const rate = data.conversion_rates[currencyTwoSelected];
//       rateElement.innerText = `1 ${currencyOneSelected} = ${rate} ${currencyTwoSelected}`;
//       amountTwo.value = (amountOne.value * rate).toFixed(2);
//     });
// }

currencyOne.addEventListener("change", fetchValue);
currencyTwo.addEventListener("change", fetchValue);

amountOne.addEventListener("input", fetchValue);
amountTwo.addEventListener("input", fetchValue);

swap.addEventListener("click", () => {
  const tempVariable = currencyOne.value;
  currencyOne.value = currencyTwo.value;
  currencyTwo.value = tempVariable;
  fetchValue();
});

fetchValue();
