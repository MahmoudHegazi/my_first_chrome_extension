# my_first_chrome_extension
Simple extension to get the weather and to change the current page background color


https://developer.chrome.com/docs/extensions/mv3/getstarted/




![screenshot](simple.JPG)

# function to get unique cards with preformance:

```javascript
let index_const = 0;
const append_btn = (elm)=>{
   const newbtn = document.createElement("button");
   newbtn.setAttribute("class", "awesome_btn");
   newbtn.innerText = "Remove Card";
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
window.addEventListener("scroll", advanced_get1);
advanced_get1();

```
