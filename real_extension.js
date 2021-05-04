// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");


let searchFilterBtn = document.getElementById("searchFilter");



let testdata = document.getElementById("test1");

let old_posts = [];



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
  chrome.storage.sync.get("projectData", ({ projectData }) => {
    // document.body.style.backgroundColor = color;
    // document.body.style.color = "gold";
    //projectData.push('good job without read');

    // check if in db
    const ObjectInDB = (dataBase, miniObject)=> {
       let indb = false;
       for (var i=0; i<dataBase.length; i++) {
          let dbObject = dataBase[i];

          if (dbObject.title == miniObject.title && dbObject.owner == miniObject.owner && dbObject.likes == miniObject.likes) {
             indb = true;
             break;
             return true;
          }
       }
       return indb;

     };


     function pushIt(it, projectData){
       let checkeexist = ObjectInDB(projectData, it);
       console.log("Database was: ", projectData.length);
       if (checkeexist == false){
          //alert("pushed");
          projectData.push(it);
          console.log(projectData);
          console.log("Database Now: ", projectData.length, "something added");
          return true;
       }
        console.log("Database Now: ", projectData.length, "nothing added");
        return false;

     }
    console.log(projectData);


    const liCards = document.querySelectorAll(".ContentGrid-gridItem-2Ad.e2e-ContentGrid-item");
    liCards.forEach( (licard)=>{
      const metadata = {title:'',owner:'',likes:''};
      const headmeta = licard.lastElementChild.querySelector(".TitleOwner-limitHeight-2_Y").innerText.replace(/\r?\n|\r/g, ",").split(",")[0]
      metadata.title = headmeta[0];
      metadata.owner = headmeta[1];
      metadata.likes = licard.lastElementChild.querySelector(".Stats-stats-1iI span").innerText;
      pushIt(metadata, projectData);
    });
    chrome.storage.sync.set({projectData:projectData});
    let index_const = 0;
    const append_btn = (elm)=>{
       const newbtn = document.createElement("button");
       newbtn.setAttribute("class", "awesome_btn");
       letcard = elm;
       newbtn.addEventListener("click", ()=>{
          elm.parentElement.remove();
       });
       newbtn.innerText = "Remove Card";
       newbtn.style = "height: 40px;width: 150px;border: 2px solid #BFC0C0;margin: 20px 20px 20px 20px;color: #BFC0C0;text-transform: uppercase;text-decoration: none;font-size: .8em;letter-spacing: 1.5px;align-items: center;justify-content: center;overflow: hidden;background: brown;cursor: pointer;color: #BFC0C0;";
       elm.appendChild(newbtn);
    }
    const advanced_get1 = ()=> {
     if (index_const == 0){
        let allcards = document.querySelectorAll(".Projects-cover-1nk");
        index_const = document.querySelectorAll(".Projects-cover-1nk").length;

        // this case is first normal case
        allcards.forEach( (card, index)=>{
          append_btn(card);
        });
        console.log(index_const);
     } else {
       let newcheck = document.querySelectorAll(".Projects-cover-1nk").length;

       if (newcheck > index_const){
         let new_cards = Array.from(document.querySelectorAll(".Projects-cover-1nk"));
         let start_point = newcheck - index_const;
         console.log(start_point);
         // here we need use last index
         let unqiue_cards = new_cards.slice(index_const, new_cards.length);

         unqiue_cards.forEach( (card, index)=>{
          append_btn(card);
         });
         index_const = newcheck;
         console.log(index_const);
       } else{
           return false;
       }
     }

    }
    window.addEventListener("load", advanced_get1);
    window.addEventListener("scroll", advanced_get1);
    advanced_get1();

  });
}







// When the button is clicked, filter search result
searchFilterBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: removeOldSearchResults,
  });
});

function removeOldSearchResults() {




  // Retrieve the the stored value, defaulting to an empty array.
  chrome.storage.local.get({'storedArray': []}, function(data) {

    let oldIndex = 0;
    function functionTime() {
    let fullArray = [];
    let oldData = Array.from(data.storedArray);

    /*
    oldData.forEach( (something)=> {
      if (fullArray.includes(something) == false   ){
         console.log(fullArray);
         console.log( "include" + something + fullArray.includes(something));
         fullArray.push(something); Projects-cover-1nk
      }
    });
    */
    let liCards = document.querySelectorAll(".Projects-cover-1nk");
    if (liCards.length > oldIndex) {
      oldIndex = liCards.length;
    for (var i=0; i<liCards.length; i++){
      let title = liCards[i].lastElementChild.querySelector(".TitleOwner-limitHeight-2_Y").innerText.replace(/\r?\n|\r/g, ",").split(",")[0];
      let owner = liCards[i].lastElementChild.querySelector(".TitleOwner-limitHeight-2_Y").innerText.replace(/\r?\n|\r/g, ",").split(",")[1];
      let likes = liCards[i].lastElementChild.querySelector(".Stats-stats-1iI span").innerText;
      let boom = title + ',' + owner + ',' + likes;
      if (oldData.includes(boom) == false){
         //console.log(oldData);
         //console.log( "include" + boom +  oldData.includes(boom));
         oldData.push(boom);
        }
      };
      chrome.storage.local.set({'storedArray': oldData}, function() {
        //console.log(oldData);
        console.log(`storedArray now contains ${oldData.length}.`);
      });
    }


    }
    functionTime();
    window.addEventListener("scroll", functionTime);
  });

  /*
   chrome.storage.sync.get("projectData", ({ projectData }) => {

      let oldlength = 0;
      function nothingSampleMoreThanThisNoobCode(Noob){
        if (Noob.length > oldlength){
         oldlength = Noob.length;
      console.log("projectData was:", projectData.length);
      //let liCards = document.querySelectorAll(".ContentGrid-gridItem-2Ad.e2e-ContentGrid-item");
      Noob.forEach( (zftttttttttttttttttttt)=> {
      let zft = zftttttttttttttttttttt.lastElementChild.querySelector(".TitleOwner-limitHeight-2_Y").innerText.replace(/\r?\n|\r/g, ",").split(",")[0]
      if (projectData.includes(zft) == false){
        projectData.push(zft);

      }

      });
      chrome.storage.sync.set({projectData:projectData});
      console.log('last', projectData.length);
       } else {
         return false;
       }
      }

      nothingSampleMoreThanThisNoobCode(document.querySelectorAll(".ContentGrid-gridItem-2Ad.e2e-ContentGrid-item"));
      window.addEventListener("scroll", ()=> {nothingSampleMoreThanThisNoobCode(document.querySelectorAll(".ContentGrid-gridItem-2Ad.e2e-ContentGrid-item"))});
   });
   */
};
