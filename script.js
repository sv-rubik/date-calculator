'use strict'
const newDateDiv = document.querySelector('[data-date="new"]')
const container = document.querySelector('.container')

// object to create buttons sections
const days = {
  add90: 90,
  add180: 180,
  add365: 365,
}

// function to get date = today + days
function changeDate (numberOfDays){
  const date = new Date()
  date.setDate(date.getDate() + numberOfDays)
  return date.toLocaleDateString()
}

// reflect current date on the page
newDateDiv.innerHTML = `<span class="span">Today is </span>${changeDate(0)}`

// function to add button-section to page including number if days to add
function buttonSectionToHtml(obj, index) {
  return `
    <div class="button-section">
      <p class="button-section__text">Add <span class="span">${Object.values(obj)[index]} days</span> to current date</p>
      <button class="button-section__button" data-days="${Object.keys(obj)[index]}">Calculate</button>
    </div>
  `
}

// function to add Event listeners on buttons in connection to data-attribute name
function clickListener(obj, index, placeholder) {
  document.querySelector(`[data-days="${Object.keys(obj)[index]}"]`).addEventListener('click', function (e) {
    e.preventDefault()
    placeholder.innerHTML = `<span class="span">${Object.values(obj)[index]} days added </span>${changeDate(Object.values(obj)[index])}`
    // window.scrollTo(0, -300)
  })

}

for(let i = 0; i < Object.keys(days).length; i++) {
  container.insertAdjacentHTML('beforeend', buttonSectionToHtml(days, i))
  clickListener(days, i, newDateDiv)
}

// input handling
document.querySelector('.form').addEventListener('submit', function (e) {
  e.preventDefault()
  let inputValue = +document.querySelector('.form__input').value
  Number.isInteger(inputValue)
    ? newDateDiv.innerHTML = `<span class="span">${inputValue} days added </span>${changeDate(inputValue)}`
    : alert('Please enter a number of days')
})

// const datePlus90 = changeDate(days.add90)
// const datePlus180 = changeDate(days.add180)
// const datePlus365 = changeDate(days.add365)
// console.log(datePlus90)
// console.log(datePlus180)
// console.log(datePlus365)

// TODO - labels, error on wrong input, buttons position center