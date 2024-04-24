const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".downdrop select");

const btn = document.querySelector("button");
const formcurr = document.querySelector(".form select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for(let select of dropdowns){
    for(currcode in countryList){
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if(select.name === "From" && currcode === "USD"){
            newoption.selected = "selected";
        }
        if(select.name === "To" && currcode === "INR"){
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    select.addEventListener("change", (evnt) =>{
        updateflag(evnt.target);
    });
}
const updateexchange = async () =>{
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval === "" || amtval < 1){
        amtval = 1;
        amount.value = "1";
    }

    const URL = `${base_url}/${formcurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data);
    let rate = data[formcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    console.log(rate);
    let finalamount = rate * amtval;
    msg.innerText = `${amtval} ${formcurr.value} = ${finalamount} ${tocurr.value}`;
}
updateflag = (element) =>{
    let currCode = element.value;
    let countrycode = countryList[currCode];
    let newimg = `https://flagsapi.com/${countrycode}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newimg;
}
btn.addEventListener("click", async (evnt)=>{
    evnt.preventDefault();
    updateexchange();
})
window.addEventListener("load", ()=>{
    updateexchange();
})

