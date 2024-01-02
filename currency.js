const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button")
const fromCurr = document.querySelector(".from select")
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")

window.addEventListener("load", () => {
    updateExchangeRate()
})

for (let select of dropdowns){
    for (currcode in countryList) {
        let newOption = document.createElement("option")
        newOption.innerText = currcode
        newOption.value = currcode
        if(select.name === "from" && currcode === "INR"){
            newOption.selected = "selected"
        }
        if(select.name === "to" && currcode === "USD"){
            newOption.selected = "selected"
        }
        select.append(newOption)
    }

    select.addEventListener("change", (e) => {
        updateFlag(e.target)
    })
}

const updateFlag = (element) => {
    let currcode = element.value
    let countryCode = countryList[currcode]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src = newSrc
}


btn.addEventListener("click" , (e) => {
    e.preventDefault()
    updateExchangeRate()
})

const updateExchangeRate = async () => {
    let amount = document.querySelector("form input")
    let amtVal = amount.value
    // console.log(amtVal)
    if(amtVal === "" || amtVal < 1) {
        amtVal = " "
        amount.value = " "
    }

    // console.log(fromCurr.value, toCurr.value)
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    let response = await fetch(URL)
    let data = await response.json()
    let rate = data[toCurr.value.toLowerCase()]
    // console.log(rate)

    let finalAmount = amtVal * rate
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}
