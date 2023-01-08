// @ts-nocheck

export function extractDate(dateString) {
    return dateString.substring(dateString.indexOf(' ') + 1);
}

export function reverseDate(dateString) {
    try {
        return dateString.split("-").reverse().join("-")
    }
    catch (e) {
        return null
    }
}

export function getWeek(date) {
    let startDate = new Date(date.getFullYear(), 0, 1);
    let days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));

    var weekNumber = Math.ceil(days / 7);

    let start = new Date(date)
    start.setDate(start.getDate() - ((start.getDay() + 6) % 7))
    let dateString = getDateString(start)
    start.setDate(start.getDate() + 6)

    return { number: weekNumber, start: dateString, end: getDateString(start) }
}

export function addWeeks(week, amount) {
    let start = new Date(week.start)
    start.setDate(start.getDate() + 7 * amount)
    let end = new Date(week.end)
    end.setDate(end.getDate() + 7 * amount)

    return { number: week.number + amount, start: start, end: end}
}

export function getWeeks(from, to) {
    let week = getWeek(from)
    let weekNumber = week.number
    let year = from.getFullYear()

    let start = new Date(week.start)
    let end = new Date(to)
    end.setDate(to.getDate() - (to.getDay() + 7) % 7)

    let date = new Date(start)
    let endDate = new Date(start)
    endDate.setDate(endDate.getDate() + 6)
    let weekList = []

    let i = 100
    while (!checkIfSameDay(endDate, end) && i) {
        weekList.push({number: weekNumber, start: getDateString(date), end: getDateString(endDate)})

        date.setDate(date.getDate() + 7)
        endDate.setDate(endDate.getDate() + 7)
        weekNumber++
        if (year != date.getFullYear()) {
            weekNumber = 1
            year = date.getFullYear()
        }
        i--
    }
    weekList.push({number: weekNumber, start: getDateString(date), end: getDateString(endDate)})

    return weekList
}

function checkIfSameDay(date1, date2) {
    return date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear()
}

export function getDateString(date) {
    return date.toISOString().replace(/T.*/,'')
}