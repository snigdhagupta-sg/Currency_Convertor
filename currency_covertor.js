let base_url =
  "https://v6.exchangerate-api.com/v6/040e964f24a9ce1182f4dc00/latest/USD";
let response, data, countrylist;
async function getData() {
  response = await fetch(base_url);
  console.log(response);
  data = await response.json();
  console.log(data);
  countrylist = data.conversion_rates;
  console.log(countrylist);
  next();
}
getData();
function next() {
  let dropdown = document.querySelectorAll(".dropdown select");
  for (let currencyCode in countrylist) {
    if (
      currencyCode !== "AWG" &&
      currencyCode !== "BTN" &&
      currencyCode !== "BYN" &&
      currencyCode !== "ERN" &&
      currencyCode !== "FOK" &&
      currencyCode !== "IMP" &&
      currencyCode !== "JEP" &&
      currencyCode !== "KID" &&
      currencyCode !== "MRU" &&
      currencyCode !== "SHP" &&
      currencyCode !== "SLE" &&
      currencyCode !== "SSP" &&
      currencyCode !== "STN" &&
      currencyCode !== "TVD" &&
      currencyCode !== "VES" &&
      currencyCode !== "WST" &&
      currencyCode !== "XDR" &&
      currencyCode !== "ZMW" &&
      currencyCode !== "ZWL"
    ) {
      for (let selected of dropdown) {
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;
        if (selected.name === "From" && currencyCode === "USD") {
          newOption.selected = "selected";
        } else if (
          selected.getAttribute("name") === "To" &&
          currencyCode === "INR"
        ) {
          newOption.selected = "selected";
        }
        selected.append(newOption);
      }
    }
  }
  console.log("in");
  const updateFlags = () => {
    document.querySelector(".from img").src = `https://flagsapi.com/${
      countryName[dropdown[0].value]
    }/shiny/64.png`;
    document.querySelector(".to img").src = `https://flagsapi.com/${
      countryName[dropdown[1].value]
    }/shiny/64.png`;
  };
  const updateMsg = () => {
    console.log("clicked");
    let msg = document.querySelector(".msg");
    let input = document.querySelector(".amount");
    let x =
      (countrylist[dropdown[1].value] * input.value) /
      countrylist[dropdown[0].value];
    msg.innerText = `${input.value} ${dropdown[0].value} = ${x} ${dropdown[1].value}`;
  };
  updateFlags();
  updateMsg();
  let amount = document.querySelector(".amount");
  dropdown[0].addEventListener("change", updateFlags);
  dropdown[1].addEventListener("change", updateFlags);
  dropdown[0].addEventListener("change", updateMsg);
  dropdown[1].addEventListener("change", updateMsg);
  amount.addEventListener("input", updateMsg);
  let btn = document.querySelector(".btn");
}
