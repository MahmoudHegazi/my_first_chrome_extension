// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

let tempspan = document.getElementById("demo");
let weaterbtn = document.getElementById("gettemp");
let updatetext = document.getElementById("lastupdate");



let getTemp = async () => {
  req = await fetch('https://api.openweathermap.org/data/2.5/weather?zip=66614,us&units=metric&appid=db6608063a9d72758e29ea323da07bd1');
  res = await req.json();
  let newdate = new Date();
  let full_date = (newdate.getMonth() + 1) + "-" + newdate.getDate() + "-" + newdate.getFullYear();
  let time = newdate.getHours() + ":" + newdate.getMinutes() + ":" + newdate.getSeconds();
  let lastupdate = newdate;
  tempspan.innerText = res.main.temp;
  updatetext.innerText =  full_date + " " + time;
}

weaterbtn.addEventListener("click", async () => {
   getTemp();
});




// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});




// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
