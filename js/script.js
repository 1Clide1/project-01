
var trendsDiv = document.querySelector(".trends-div")


// lines 4-16 are just test data to see if func will run properly
// let testTrend = []
// testTrend.push({
//     name: "#atrend"
// })
// testTrend.push({
//     name: "#another-trend"
// })
// testTrend.push({
//     name: "#one-more-trend"
// })
// localStorage.setItem("trend", JSON.stringify(testTrend))
// var myTrend = JSON.parse(localStorage.getItem('trend'))
// console.log(myTrend)


// function to generate li for each trend
generateTrendingList = (trends) => {
    var trendsUl = document.createElement("ul")
    trendsUl.classList= ("trends-ul")
    trendsDiv.append(trendsUl)
    

    //  pull #s from locally stored data
    for (var i = 0; i<trends.length; i++) {
        var trendItem= document.createElement("li")
        trendItem.classList= ("trend-item")
        trendItem.textContent = (trends[i].name)
        trendsUl.append(trendItem)
    }
}

var cityObjects = [{
    name: "Albuquerque",
    code: "2352824"
},
{
    name: "Atlanta",
    code: "2357024"
},
{
    name: "Austin",
    code: "2357536"
},
{
    name: "Baltimore",
    code: "22358820"
},
{
    name: "Baton Rouge",
    code: "2359991"
},
{
    name: "Birmingham",
    code: "2364559"
},
{
    name: "Boston",
    code: "2367105"
},
{
    name: "Charlotte",
    code: "2378426"
},
{
    name: "Chicago",
    code: "2379574"
},
{
    name: "Cincinnati",
    code: "2380358"
},
{
    name: "Cleveland",
    code: "2381475"
},
{
    name: "Colorado Springs",
    code: "2383489"
},
{
    name: "Columbus",
    code: "2383660"
},
{
    name: "Dallas-Ft. Worth",
    code: "2388929"
},
{
    name: "Denver",
    code: "2391279"
},
{
    name: "Detroit",
    code: "2391585"
},
{
    name: "Fresno",
    code: "2407517"
},
{
    name: "Greensboro",
    code: "2414469"
},
{
    name: "Harrisburg",
    code: "2418046"
},
{
    name: "Honolulu",
    code: "2423945"
},
{
    name: "Houston",
    code: "2424766"
},
{
    name: "Indianapolis",
    code: "2427032"
},
{
    name: "Jackson",
    code: "2428184"
},
{
    name: "Jacksonville",
    code: "2428344"
},
{
    name: "Kansas City",
    code: "2430683"
},
{
    name: "Las Vegas",
    code: "2436704"
},
{
    name: "Long Beach",
    code: "2441472"
},
{
    name: "Los Angeles",
    code: "2442047"
},
{
    name: "Louisville",
    code: "2442327"
},
{
    name: "Memphis",
    code: "2449323"
},
{
    name: "Mesa",
    code: "2449808"
},
{
    name: "Miami",
    code: "2450022"
},
{
    name: "Milwaukee",
    code: "2451822"
},
{
    name: "Minneapolis",
    code: "2452078"
},
{
    name: "Nashville",
    code: "2457170"
},
{
    name: "New Haven",
    code: "2458410"
},
{
    name: "New Orleans",
    code: "2458833"
},
{
    name: "New York",
    code: "2459115"
},
{
    name: "Norfolk",
    code: "2460389"
},
{
    name: "Oklahoma City",
    code: "2464592"
},
{
    name: "Omaha",
    code: "2465512"
},
{
    name: "Orlando",
    code: "2466256"
},
{
    name: "Philadelphia",
    code: "2471217"
},
{
    name: "Phoenix",
    code: "2471390"
},
{
    name: "Pittsburgh",
    code: "2473224"
},
{
    name: "Portland",
    code: "2475687"
},
{
    name: "Providence",
    code: "2477058"
},
{
    name: "Raleigh",
    code: "2478307"
},
{
    name: "Richmond",
    code: "2480894"
},
{
    name: "Sacramento",
    code: "2486340"
},
{
    name: "Salt Lake City",
    code: "2487610"
},
{
    name: "San Antonio",
    code: "2487796"
},
{
    name: "San Diego",
    code: "2487889"
},
{
    name: "San Francisco",
    code: "2487956"
},
{
    name: "San Jose",
    code: "2488042"
},
{
    name: "Seattle",
    code: "2490383"
},
{
    name: "St. Louis",
    code: "2486982"
},
{
    name: "Tallahassee",
    code: "2503713"
},
{
    name: "Tampa",
    code: "2503863"
},
{
    name: "Tucson",
    code: "2508428"
},
{
    name: "Virginia Beach",
    code: "2512636"
},
{
    name: "Washington",
    code: "2514815"
}
]

// generateTrendingList(myTrend)



const selectMenu = $('#city-select')

//Create an element with display name and value = code
for (let i = 0; i < cityObjects.length; i++) {

    const optionItem = $('<option>').attr('value', cityObjects[i].code).text(cityObjects[i].name)

    selectMenu.append(optionItem)
}

selectMenu.on('change', function () {
    const cityName = $("#city-select option:selected").text()
    const code = this.value
    
    console.log('city', cityName)
    console.log(this.value)
    getTwitterData(cityName, code)
    
})


var getTwitterData = async function (city, code) {
    var url = "https://api.twitter.com/1.1/trends/place.json?id=" + code;
    var response = await fetch(url, {
        headers: {
            "Authorization": "Bearer AAAAAAAAAAAAAAAAAAAAAMUBVwEAAAAAbefMCya8TAn%2FFqsCu1x%2F%2Fwn5zqk%3DZqyvGwPneBRzfIYnZz3fNMMjxMobWKHZjkbmlJVq63q6kwZjLE",
            "Accept": "application/json"
        }

    });

    Promise.resolve(response).then(function (response) {
        return response.json()
    }).then(function (data) {
        console.log(data);


        var cityData = {name: city, trends: []}
        for (var i = 0; i < 10; i++) {
            cityData.trends.push(data[0].trends[i].name)
        }
        console.log('city data', cityData)
        localStorage.setItem('Points of Interest', JSON.stringify(cityData))

    }).catch(function (error) {
        if (error) {
        }
    });

}

