let activityData;
const timeFilterBtns = document.querySelectorAll('.filter-btn')
const activities = document.querySelectorAll('.activity')

function fetchData() {
    fetch('/data.json').then((response) => {
        if (!response.ok) throw new Error('Error occurred during fetching data from external API')

        return  response.json()
    }).then((data) =>{
        activityData = data
        updateActivityCard('daily')
    }).catch((error) => console.error(error))
}

function updateActivityValue (value, activityCard, previous) {
    const suffix = value === 1 ? 'hr' : 'hrs'
    if (previous) {
        activityCard.innerText = 'Previous - ' + value + suffix
    } else {
        activityCard.innerText = value + suffix
    }
}

function updateActivityCard (type) {
    activities.forEach(activity => {
        let activityHeader = activity.dataset.title
        let currentTime = activity.querySelector('.activity-time-current')
        let previousTime = activity.querySelector('.activity-time-previous')
        let importedData = activityData.find(item => item.title === activityHeader)
        let previous = false
        if (importedData) {
            let currentValue = importedData.timeframes[type].current
            updateActivityValue(currentValue, currentTime,previous)

            let previousValue = importedData.timeframes[type].previous
            previous = true
            updateActivityValue(previousValue, previousTime,previous)
        }

    })
}

function handleTimeFilter (e) {
    timeFilterBtns.forEach(btn => {
        btn.classList.remove('active')
    })
    e.target.classList.add('active')
    const currentType = e.target.dataset.option
    updateActivityCard(currentType)
}

fetchData()

timeFilterBtns.forEach(btn => {
    btn.addEventListener('click', handleTimeFilter)
})