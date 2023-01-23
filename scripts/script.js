'use strict'
const newDateDiv = document.querySelector('[data-date="new"]')
const today = document.querySelector('.today')
const wrapper = document.querySelector('.wrapper')
let inputDate

// object to create buttons sections
const days = {
  add180: 180,
  add90: 90,
}

// function to get format of date
function formatDate(inputDate) {
  let year = inputDate.getFullYear()
  let month = inputDate.getMonth()
  let day = inputDate.getDate()
  const months = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ]
  return String(`${day} ${months[month]} ${year}`)
}
// Below can be used instead of formatDate(), however above format is preferred by the App users
// const options = { year: 'numeric', month: 'long', day: 'numeric' };
// console.log(inputDate.toLocaleDateString(undefined, options))

// function to get date = inputDate + days
function changeDate (numberOfDays){
  if (inputDate) {
    const date = new Date(inputDate)
    date.setDate(inputDate.getDate() + numberOfDays)
    return formatDate(date)
  } else {
    const date = new Date()
    date.setDate(date.getDate() + numberOfDays)
    return formatDate(date)
  }
}

// function to check if expired and create notification
function expiryTextCreator(date, placeholder) {
  if (new Date(date) < new Date()) {
    placeholder.insertAdjacentHTML("beforeend", `<span class="expired">*repacking has expired!</span>`)
  }
}

// function to create an error notification if not valid number provided from input form
function providedValidNumber(inputValue) {
  if(!Number.isInteger(inputValue) || inputValue > 10000 || inputValue <= 0) {
    return alert('Please enter a number of days in range from 1 to 10.000')
  } else {return true}
}

// function to add button-section to page including number of days to add
function buttonSectionToHtml(key, value) {
  return `
    <div class="button-section">
      <p class="button-section__text">
        Add <span class="span">${value} days</span> to selected date
      </p>
      <button class="button-section__button" data-days="${key}">Calculate</button>
    </div>
  `
}

// function to add Event listeners on buttons in connection to data-attribute name
function clickListener(key, value, placeholder) {
  document.querySelector(`[data-days="${key}"]`).addEventListener('click', e => {
    e.preventDefault()
    placeholder.innerHTML = `<div class="new-date__text">
                                <span class="new-date__span">${value} days added </span>
                             </div>${changeDate(value)}`
    expiryTextCreator(changeDate(value), placeholder)
  })
}

////////////////////////////////////////////////////////////////////////////////////////
// reflect current date on the page
today.innerHTML = `<span class="span">Today is </span>${changeDate(0)}`
newDateDiv.innerHTML = `<div class="new-date__text">
                          <span class="new-date__span">Today is </span>
                        </div> ${changeDate(0)}`

// create divs with buttons
for(const [key, value] of Object.entries(days)) {
  wrapper.insertAdjacentHTML('beforeend', buttonSectionToHtml(key, value))
  clickListener(key, value, newDateDiv)
}

// number input handling
document.querySelector(`[data-type="form-text"]`).addEventListener('submit', e => {
  e.preventDefault()
  let inputValue = +document.querySelector(`[data-type="form-input"]`).value
  if (providedValidNumber(inputValue)) {
    newDateDiv.innerHTML = `<div class="new-date__text">
                                <span class="new-date__span">${inputValue} days added </span>
                            </div>${changeDate(inputValue)}`
  }
  expiryTextCreator(changeDate(inputValue), newDateDiv)
})

// date input handling
document.querySelector(`[data-type="form-date"]`).addEventListener('change', () => {
  inputDate = new Date(document.querySelector(`[data-type="form-date-input"]`).value)
  newDateDiv.innerHTML = `<div class="new-date__text">
                                Last <span class="new-date__span">Repacking Date</span> is 
                          </div>${formatDate(inputDate)}`
})

// Reset button
document.querySelector('.reset').addEventListener('click', () => {
  location.reload()
})