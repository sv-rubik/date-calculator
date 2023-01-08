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
  switch (month)
  {
    case 0: month="Jan"; break
    case 1: month="Feb"; break
    case 2: month="Mar"; break
    case 3: month="Apr"; break
    case 4: month="May"; break
    case 5: month="Jun"; break
    case 6: month="Jul"; break
    case 7: month="Aug"; break
    case 8: month="Sept"; break
    case 9: month="Oct"; break
    case 10: month="Nov"; break
    case 11: month="Dec"; break
  }
  return String(`${day} ${month} ${year}`)
  // return date.toDateString().slice(4)
}

// function to get date = inputDate + days
function changeDate (numberOfDays){
  if (inputDate) {
    const date = new Date(inputDate)
      date.setDate(inputDate.getDate() + numberOfDays)
    // console.log(inputDate)
    // console.log(inputDate < new Date())
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
    placeholder.insertAdjacentHTML("beforeend", `<span class="expired"> *repacking expired!</span>`)
  }
}

// reflect current date on the page
today.innerHTML = `<span class="span">Today is </span>${changeDate(0)}`
newDateDiv.innerHTML = `<div class="new-date__text">
                          <span class="new-date__span">Today is </span>
                        </div> ${changeDate(0)}`

// function to add button-section to page including number if days to add
function buttonSectionToHtml(obj, index) {
  return `
    <div class="button-section">
      <p class="button-section__text">
        Add <span class="span">${Object.values(obj)[index]} days</span> to selected date
      </p>
      <button class="button-section__button" data-days="${Object.keys(obj)[index]}">Calculate</button>
    </div>
  `
}

// function to add Event listeners on buttons in connection to data-attribute name
function clickListener(obj, index, placeholder) {
  document.querySelector(`[data-days="${Object.keys(obj)[index]}"]`).addEventListener('click', (e) => {
    e.preventDefault()
    placeholder.innerHTML = `<div class="new-date__text">
                                <span class="new-date__span">${Object.values(obj)[index]} days added </span>
                             </div>${changeDate(Object.values(obj)[index])}`
    expiryTextCreator(changeDate(Object.values(obj)[index]), placeholder)
  })
}

// create divs with buttons
for(let i = 0; i < Object.keys(days).length; i++) {
  wrapper.insertAdjacentHTML('beforeend', buttonSectionToHtml(days, i))
  clickListener(days, i, newDateDiv)
}

// input numbers handling
document.querySelector(`[data-type="form-text"]`).addEventListener('submit', (e) => {
  e.preventDefault()
  let inputValue = +document.querySelector(`[data-type="form-input"]`).value
  inputValue > 10000 || inputValue <= 0 ? alert('Please enter a number of days in range from 1 to 10.000') : true
  Number.isInteger(inputValue)
    ? newDateDiv.innerHTML = `<div class="new-date__text">
                                <span class="new-date__span">${inputValue} days added </span>
                              </div>${changeDate(inputValue)}`
    : alert('Please enter a number of days')
  expiryTextCreator(changeDate(inputValue), newDateDiv)
})

// input date handling
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