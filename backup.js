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
          alert("pushed");
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
      const headmeta = licard.lastElementChild.querySelector(".TitleOwner-limitHeight-2_Y").innerText.replace(/\r?\n|\r/g, ",").split(",")
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
   chrome.storage.sync.get("projectData", ({ projectData }) => {
    //alert(projectData.length);
     // function to make sure the data added is object Extra Protect

     let oldLength = 0;
     let newLength = 0;

        // Save All results apears on the page to projectData
     const saveResults = ()=> {
        const liCards = document.querySelectorAll(".ContentGrid-gridItem-2Ad.e2e-ContentGrid-item");
        oldLength = liCards.length;
        liCards.forEach( (licard)=>{
        const metadata = {title:'',owner:'',likes:''};
        const headmeta = licard.lastElementChild.querySelector(".TitleOwner-limitHeight-2_Y").innerText.replace(/\r?\n|\r/g, ",").split(",")
        metadata.title = headmeta[0];
        metadata.owner = headmeta[1];
        metadata.likes = licard.lastElementChild.querySelector(".Stats-stats-1iI span").innerText;
        // check the equal here ....boom Important but not filter yet
        // pushIt(metadata, projectData);
        });

        //console.log(projectData); last hope
        projectData = projectData;
        chrome.storage.sync.set({projectData:projectData}, function(){
         //  A data saved callback omg so fancy
        });



        console.log(projectData.length);
        console.log(projectData);
   };

   // Save All results apears on the page to projectData
   function saveSlice (cardsSlice) {
           oldLength = document.querySelectorAll(".ContentGrid-gridItem-2Ad.e2e-ContentGrid-item").length;
           cardsSlice.forEach( (SliceLicard)=>{
           const sliceMetaData = {title:'',owner:'',likes:''};
           const sliceHeadMeta = SliceLicard.lastElementChild.querySelector(".TitleOwner-limitHeight-2_Y").innerText.replace(/\r?\n|\r/g, ",").split(",");
           sliceMetaData.title = sliceHeadMeta[0];
           sliceMetaData.owner = sliceHeadMeta[1];
           sliceMetaData.likes = SliceLicard.lastElementChild.querySelector(".Stats-stats-1iI span").innerText;
           // check the equal here ....boom
           // pushIt(metadata, projectData);
       });

       //console.log(projectData);
       chrome.storage.sync.set({projectData:projectData}, function(){
        //  A data saved callback omg so fancy
       });

   };
   saveResults();
   function resaveResults() {
     let checkNewResults = document.querySelectorAll(".ContentGrid-gridItem-2Ad.e2e-ContentGrid-item").length;
     if (checkNewResults > oldLength) {
        let newCards1 = Array.from(document.querySelectorAll(".ContentGrid-gridItem-2Ad.e2e-ContentGrid-item"));
        let unqiue_cards1 = newCards1.slice(oldLength, newCards1.length);
        saveSlice(unqiue_cards1);
        console.log('new unique data saved');
      } else {
        return false;
      }
   }
   window.addEventListener("scroll", resaveResults);
   });
};
