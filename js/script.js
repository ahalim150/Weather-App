// nav bar

const buttons = document.querySelectorAll(".menu__item");
let activeButton = document.querySelector(".menu__item.active");

buttons.forEach(item => {
    const text = item.querySelector(".menu__text");
    setLineWidth(text, item);
    window.addEventListener("resize", () => {
        setLineWidth(text, item);
    })

    item.addEventListener("click", function() {
        if (this.classList.contains("active")) return;
        this.classList.add("active");   
        if (activeButton) {
            activeButton.classList.remove("active");
            activeButton.querySelector(".menu__text").classList.remove("active");
        }   
        handleTransition(this, text);
        activeButton = this;
    }); 
});

function setLineWidth(text, item) {
    const lineWidth = text.offsetWidth + "px";
    item.style.setProperty("--lineWidth", lineWidth);
}

function handleTransition(item, text) {
    item.addEventListener("transitionend", (e) => {
        if (e.propertyName != "flex-grow" || 
        !item.classList.contains("active")) return;
        text.classList.add("active");   
    });
}

// digital clock

function updateTime() {
    let now = new Date();
    let hours = now.getHours();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');
    let formattedTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
    document.getElementById('time').textContent = formattedTime;

    let year = now.getFullYear();
    let month = (now.getMonth() + 1).toString().padStart(2, '0');
    let day = now.getDate().toString().padStart(2, '0');
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dayName = days[now.getDay()];
    let formattedDate = dayName + ", " + day + "-" + month + "-" + year;
    document.getElementById('date').textContent = formattedDate;
}
setInterval(updateTime, 1000);
updateTime();

// API
let myData;  
let timeDefaultStop;

async function getWeatherData(q) { 
    let myResponse = await fetch(`https://api.weatherapi.com/v1/current.json?key=572e08fb1d7547f58d8151525211205&q=${q}`);
    myData = await myResponse.json();
    document.getElementById("county-location").innerHTML = myData.location.name;
    document.getElementById("degree").innerHTML = myData.current.temp_c + `&degC`;
    document.getElementById("weather-status").innerHTML = myData.current.condition.text;
    document.getElementById("inner-data").setAttribute("src", `https:${myData.current.condition.icon}`);
}
getWeatherData("cairo");

async function getNextDays(q) {
    let myResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${q}&days=3`);
    let NextDays = await myResponse.json();
    let forecastArr = NextDays.forecast.forecastday;

    if (forecastArr.length >= 3) {
        document.getElementById("degreeOne").innerHTML = `${forecastArr[1].day.maxtemp_c} &degC `;
        document.getElementById("statusOne").innerHTML = forecastArr[1].day.condition.text;
        document.getElementById("imgStatusOne").setAttribute("src", `https:${forecastArr[1].day.condition.icon}`);

        document.getElementById("degreeTwo").innerHTML = `${forecastArr[2].day.maxtemp_c} &degC `;
        document.getElementById("statusTwo").innerHTML = forecastArr[2].day.condition.text;
        document.getElementById("imgStatusTwo").setAttribute("src", `https:${forecastArr[2].day.condition.icon}`);
    }
}
getNextDays("cairo");

document.getElementById("searchInput").addEventListener("keyup", function () { 
    search(); 
});

let CairoTimeStop = getWeatherData("cairo");

function search() {
    let q = document.getElementById("searchInput").value;  
    clearInterval(CairoTimeStop);   
    clearInterval(timeDefaultStop);
    timeDefaultStop = setInterval(function() {
        getWeatherData(q);
    }, 1000);
    getWeatherData(q);  
    getNextDays(q);     
}





function rain() {
    let cloud = document.querySelector('.cloud');
    let e = document.createElement('div');
    let left = Math.floor(Math.random() * 310);
    let width = Math.random() * 5;
    let height = Math.random() * 50;
    let duration = Math.random() * 0.5;

    e.classList.add('drop');
    cloud.appendChild(e);
    e.style.left = left + 'px';
    e.style.width = 0.5 + width + 'px';
    e.style.height = 0.5 + height + 'px';
    e.style.animationDuration = 1+duration+'s';

    setTimeout(function () {
        cloud.removeChild(e);
    }, 2000);
}

setInterval(function(){
rain()
},20);