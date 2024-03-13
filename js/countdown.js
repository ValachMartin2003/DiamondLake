(function () {
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

  let today = new Date(),
    dd = String(today.getDate()).padStart(2, "0"),
    mm = String(today.getMonth() + 1).padStart(2, "0"),
    yyyy = today.getFullYear(),
    nextYear = yyyy + 1,
    dayMonth = "05/27/",
    birthday1 = dayMonth + yyyy, 
    birthday2 = "06/07/" + yyyy,
    birthday3 = "12/25/" + yyyy, 
    birthday4 = "02/23/" + yyyy, 
    birthday5 = "01/02/" + yyyy; 

  today = mm + "/" + dd + "/" + yyyy;
  if (today > dayMonth + mm + "/" + dd) {
    birthday1 = dayMonth + nextYear;
  }

  let distance1, distance2, distance3, distance4, distance5; 

  const countDown1 = new Date(birthday1).getTime(),
    countDown2 = new Date(birthday2).getTime(), 
    countDown3 = new Date(birthday3).getTime(),
    countDown4 = new Date(birthday4).getTime(),
    countDown5 = new Date(birthday5).getTime(),

    x = setInterval(function () {
      const now = new Date().getTime();
      distance1 = countDown1 - now;
      distance2 = countDown2 - now;
      distance3 = countDown3 - now;
      distance4 = countDown4 - now;
      distance5 = countDown5 - now;

      if (distance1 < 0) {
        document.getElementById("headline").innerText = "Az esemény megtörtént!";
        clearInterval(x); 
      } else {
        document.getElementById("days").innerText = Math.floor(distance1 / day);
        document.getElementById("hours").innerText = Math.floor((distance1 % (day)) / (hour));
        document.getElementById("minutes").innerText = Math.floor((distance1 % (hour)) / (minute));
        document.getElementById("seconds").innerText = Math.floor((distance1 % (minute)) / second);
        if (distance1 <= 0) {
          document.getElementById("days").innerText = "0";
          document.getElementById("hours").innerText = "0";
          document.getElementById("minutes").innerText = "0";
          document.getElementById("seconds").innerText = "0";
          document.getElementById("eventEnd1").style.display = "block";
        }
      }

      if (distance2 < 0) {
        document.getElementById("headline2").innerText = "Az esemény megtörtént!";
      } else {
        document.getElementById("days2").innerText = Math.floor(distance2 / day);
        document.getElementById("hours2").innerText = Math.floor((distance2 % (day)) / (hour));
        document.getElementById("minutes2").innerText = Math.floor((distance2 % (hour)) / (minute));
        document.getElementById("seconds2").innerText = Math.floor((distance2 % (minute)) / second);
        if (distance2 <= 0) {
          document.getElementById("days2").innerText = "0";
          document.getElementById("hours2").innerText = "0";
          document.getElementById("minutes2").innerText = "0";
          document.getElementById("seconds2").innerText = "0";
          document.getElementById("eventEnd2").style.display = "block";
        }
      }

      if (distance3 < 0) {
        document.getElementById("headline3").innerText = "Az esemény megtörtént!";
      } else {
        document.getElementById("days3").innerText = Math.floor(distance3 / day);
        document.getElementById("hours3").innerText = Math.floor((distance3 % (day)) / (hour));
        document.getElementById("minutes3").innerText = Math.floor((distance3 % (hour)) / (minute));
        document.getElementById("seconds3").innerText = Math.floor((distance3 % (minute)) / second);
        if (distance3 <= 0) {
          document.getElementById("days3").innerText = "0";
          document.getElementById("hours3").innerText = "0";
          document.getElementById("minutes3").innerText = "0";
          document.getElementById("seconds3").innerText = "0";
          document.getElementById("eventEnd3").style.display = "block";
        }
      }

      if (distance4 < 0) {
        document.getElementById("headline4").innerText = "Az esemény megtörtént!";
      } else {
        document.getElementById("days4").innerText = Math.floor(distance4 / day);
        document.getElementById("hours4").innerText = Math.floor((distance4 % (day)) / (hour));
        document.getElementById("minutes4").innerText = Math.floor((distance4 % (hour)) / (minute));
        document.getElementById("seconds4").innerText = Math.floor((distance4 % (minute)) / second);
        if (distance4 <= 0) {
          document.getElementById("days4").innerText = "0";
          document.getElementById("hours4").innerText = "0";
          document.getElementById("minutes4").innerText = "0";
          document.getElementById("seconds4").innerText = "0";
          document.getElementById("eventEnd4").style.display = "block";
        }
      }

      if (distance5 < 0) {
        document.getElementById("headline5").innerText = "Az esemény megtörtént!";
      } else {
        document.getElementById("days5").innerText = Math.floor(distance5 / day);
        document.getElementById("hours5").innerText = Math.floor((distance5 % (day)) / (hour));
        document.getElementById("minutes5").innerText = Math.floor((distance5 % (hour)) / (minute));
        document.getElementById("seconds5").innerText = Math.floor((distance5 % (minute)) / second);
        if (distance5 <= 0) {
          document.getElementById("days5").innerText = "0";
          document.getElementById("hours5").innerText = "0";
          document.getElementById("minutes5").innerText = "0";
          document.getElementById("seconds5").innerText = "0";  
          document.getElementById("eventEnd5").style.display = "block";
        }
      }

    }, 1000)
}());
