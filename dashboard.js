let json;
let timeFilterBtns = document.querySelectorAll('.filter-btn')
let activities = document.querySelectorAll('.activity')
let btnType = 'daily'

function fetchData() {
    fetch('/data.json').then((response) => {
        if (!response.ok) return console.log('Oops! Something went wrong.')

        return  response.json()
    }).then((data) =>{
        json = data
        updateActivityCard(btnType)
    })
}

function updateActivityValue (hours, value, activityCard, previous) {
    if (value > 1) {hours = 'hrs'}
    if (previous) {
        activityCard.innerText = 'Previous - ' + value + hours
    } else {
        activityCard.innerText = value + hours
    }
}

function updateActivityCard (type) {
    activities.forEach(activity => {
        let activityHeader = activity.querySelector('.activity-header').querySelector('h2').innerText
        let currentTime = activity.querySelector('.activity-time-current')
        let previousTime = activity.querySelector('.activity-time-previous')
        let importedData = json.find(item => item.title === activityHeader)
        let hours = 'hr'
        let previous = false
        if (importedData) {
            let currentValue = importedData.timeframes[type].current
            updateActivityValue(hours, currentValue, currentTime,previous)

            let previousValue = importedData.timeframes[type].previous
            previous = true
            updateActivityValue(hours, previousValue, previousTime,previous)
        }

    })
}

function handleTimeFilter (e) {
    btnType = e.target.dataset.option
    updateActivityCard(btnType)
}

fetchData()

timeFilterBtns.forEach(btn => {
    btn.addEventListener('click', handleTimeFilter)
})