//SECTION: all declared variables.

const intro = document.querySelector(".intro");
const introtext2 = document.querySelector(".introtext2");
const introtext1 = document.querySelector(".introtext1");
const EvidenceBoard = document.querySelector(".EvidenceBoard");
const night = document.querySelector(".night");
const dim = document.querySelector(".darksheet");
const blacksheet = document.querySelector(".blacksheet");
const exit = document.querySelector(".exit");
 const cord = document.querySelector(".cord");
 const light = document.querySelector(".light");
const cross = document.querySelector(".cross");
const svg = document.querySelector(".svgcanvas");
 let lightstate="off";
 let bookopenindex=null;
 let cardstate="notClicked";





//SECTION: intro screen.

introtext1.addEventListener("animationend", (e) => {
    if (e.animationName === "IntroFade") {
        introtext2.style.visibility = "visible";
        introtext2.classList.add("flicker");
    }
})




//SECTION: Case data creating and storing.

const CaseDataArr=[]
const CaseCardDivArr=[]
const CaseNameArr=["A Scandal in Bohemia", "The Adventure of the Empty House", "The Final Problem", "The Hound of the Baskervilles", "The Red Headed League", "The Sign of the Four", "The Adventure of the Six Napoleons", "The Adventure of the Speckled Band", "A Study in Scarlet", "The Valley of Fear"]
const CaseClassArr=["A_Scandal_in_Bohemia", "The_Adventure_of_the_Empty_House", "The_Final_Problem", "The_Hound_of_the_Baskervilles", "The_Red_Headed_League", "The_Sign_of_the_Four", "The_Adventure_of_the_Six_Napoleons", "The_Adventure_of_the_Speckled_Band", "A_Study_in_Scarlet", "The_Valley_of_Fear"]
const CaseImageArr=["assets/covers/A_Scandal_in_Bohemia.jpg", "assets/covers/Empty_House.jpg", "assets/covers/final_problem.jpg", "assets/covers/Hound_of_Baskervilles.jpg", "assets/covers/red_headed_league.jpg", "assets/covers/Sign_of_four.jpg", "assets/covers/Six_Napoleons.jpg", "assets/covers/Speckled_Band.jpg", "assets/covers/Study_in_Scarlet.jpg", "assets/covers/The_Valley_of_Fear.jpg"]
const PushpinClassArr=["pushpin1", "pushpin2", "pushpin3", "pushpin4", "pushpin5", "pushpin6", "pushpin7", "pushpin8", "pushpin9", "pushpin10", "pushpin11"]
const CaseStoryTextArr=Array.from({length:CaseNameArr.length}, ()=>[])
const CaseStoryPathArr=["/assets/stories/scandalinbohemia.txt", "/assets/stories/emptyhouse.txt", "/assets/stories/finalproblem.txt", "/assets/stories/houndofbaskervilles.txt", "/assets/stories/red-headedleague.txt", "/assets/stories/signoffour.txt", "/assets/stories/sixnapoleans.txt", "/assets/stories/speckledband.txt", "/assets/stories/studyinscarlet.txt", "/assets/stories/valleyoffear.txt"]
for (let i = 0; i <10; i++) { 
    let Div= document.createElement("div")

Div.classList.add("card-div")
Div.classList.add(CaseClassArr[i])
EvidenceBoard.appendChild(Div)
CaseCardDivArr.push(Div)
let name= document.createElement("p")
name.textContent=CaseNameArr[i]
name.classList.add("casename")
Div.appendChild(name)
let image= document.createElement("img")
image.setAttribute("src", CaseImageArr[i])
image.classList.add("caseimg")
Div.appendChild(image)
let pushpin= document.createElement("img")
pushpin.classList.add("pushpin")
pushpin.classList.add(PushpinClassArr[i])
pushpin.setAttribute("src", "/assets/misc/pushpin.webp")
EvidenceBoard.appendChild(pushpin)
let book= document.createElement("div")
book.classList.add("book")
document.body.appendChild(book)
let frontcover= document.createElement("img");
frontcover.src="/assets/covers/frontcover.png";
frontcover.style.width=window.innerWidth*0.5 + 'px';
frontcover.style.height=window.innerHeight + 'px';
let backcover= document.createElement("img");
backcover.src="/assets/covers/backcover.png";
backcover.style.width=window.innerWidth*0.5 + 'px';
backcover.style.height=window.innerHeight + 'px';
let CaseData= {
    "NAME": CaseNameArr[i],
    "IMAGE": CaseImageArr[i],
    "PUSHPIN_SRC": pushpin.getAttribute("src"),
    "DIV": CaseCardDivArr[i],
    "ID": i,
    "PUSHPIN": pushpin,
    "BOOK": book,
    "FRONTCOVER": frontcover,
    "BACKCOVER": backcover,
    "STORYTEXT": CaseStoryTextArr[i],
    "STORYPATH": CaseStoryPathArr[i],
    "PAGEFLIP": null
} 
CaseDataArr.push(CaseData)
}







//SECTION: Drawing threads between pushpins.


const patharr = [];
for (let i = 0; i < CaseDataArr.length; i++) {
let path= document.createElementNS("http://www.w3.org/2000/svg", "path");

path.setAttribute("stroke", "rgb(128, 0, 0,1)");
path.setAttribute("fill", "transparent");
path.setAttribute("stroke-width", "3.6");
patharr.push(path);
svg.appendChild(path); 
}

const drawThreads = () => {
const points = [];
CaseDataArr.forEach((caseData) => {
    let pinx = caseData.PUSHPIN.getBoundingClientRect().x;
    let piny = caseData.PUSHPIN.getBoundingClientRect().y;
points.push({x: pinx, y: piny});

});
if (points.length >= 10) {
    
    const pathdata = [`M${points[0].x+30} ${points[0].y+30} Q${(points[0].x + points[1].x) / 2} ${ (points[0].y + points[1].y) / 2 + 70} ${points[1].x+40} ${points[1].y+45}`,
     `M${points[0].x+30} ${points[0].y+30} Q${(points[0].x + points[5].x) / 2} ${ (points[0].y + points[5].y) / 2 + 50} ${points[5].x+40} ${points[5].y+40}`,
   `M${points[0].x+20} ${points[0].y+20} Q${(points[0].x + points[8].x) / 2+70} ${ (points[0].y + points[8].y) / 2 + 70} ${points[8].x+40} ${points[8].y+35}`,
     `M${points[3].x+20} ${points[3].y+20} Q${(points[3].x + points[7].x) / 2+70} ${ (points[3].y + points[7].y) / 2 + 50} ${points[7].x+37} ${points[7].y+35}`,
     `M${points[6].x+43} ${points[6].y+40} Q${(points[6].x + points[3].x) / 2} ${ (points[6].y + points[3].y) / 2 + 50} ${points[3].x+18} ${points[3].y+40}`,
     `M${points[6].x+20} ${points[6].y+20} Q${(points[6].x + points[1].x) / 2} ${ (points[6].y + points[1].y) / 2 + 50} ${points[1].x+40} ${points[1].y+40}`,
   `M${points[7].x+20} ${points[7].y+50} Q${(points[7].x + points[9].x) / 2} ${ (points[7].y + points[9].y) / 2 + 50} ${points[9].x+30} ${points[9].y+40}`,
     `M${points[4].x+20} ${points[4].y+50} Q${(points[4].x + points[3].x) / 2} ${ (points[4].y + points[3].y) / 2 + 50} ${points[3].x+40} ${points[3].y+40}`,
     `M${points[2].x+45} ${points[2].y+40} Q${(points[2].x + points[4].x) / 2} ${ (points[2].y + points[4].y) / 2 + 50} ${points[4].x+20} ${points[4].y+40}`
]
 for (let i = 0; i < patharr.length; i++) {

    patharr[i].setAttribute("d", pathdata[i]);
    }}}
    
    setTimeout(() => { drawThreads();
        setTimeout(() => { patharr.forEach((path) => {
            path.classList.remove("draw");
            path.style.strokeDasharray = "";
            path.style.strokeDashoffset = "";
        }); }, 2800);
    }, 8000);
    
    for (let i = 0; i < patharr.length; i++) { 
        setTimeout(() => {     patharr[i].style.strokeDasharray = patharr[i].getTotalLength();
    patharr[i].style.strokeDashoffset = patharr[i].getTotalLength();}, 8000);
        setTimeout(() => { patharr[i].classList.add("draw");
        }, 9000);
    }

   EvidenceBoard.addEventListener("scroll", drawThreads);






//SECTION: forEach loop on CaseDataArr.
 


CaseDataArr.forEach((card, index) => {

//ANCHOR - Clicking the card.

card.DIV.addEventListener("click", () => {
if (cardstate==="notClicked") {
const rect = card.DIV.getBoundingClientRect();
card.DIV.style.top = `${rect.top}px`;
card.DIV.style.left = `${rect.left}px`;
card.DIV.style.right = "auto";
card.DIV.style.position = "fixed";
document.body.appendChild(card.DIV);
card.DIV.classList.add("cardclicked");
dim.style.display = "block"; cardstate="animating";}});




//ANCHOR - hovering the card when its scaled.

card.DIV.addEventListener("mouseover", () => {
        if (cardstate ==="clicked") {
            card.DIV.classList.add("scaledhover");
            card.DIV.style.cursor = "pointer";}});
card.DIV.addEventListener("mouseleave", () => {
        if (cardstate ==="clicked") {
            card.DIV.classList.remove("scaledhover");}});




//ANCHOR - hovering the card when its animating.

card.DIV.addEventListener("mouseover", () => {
    if (cardstate ==="animating") {
            card.DIV.style.cursor = "none";}});




//ANCHOR - setting the cardstate=clicked after animating.

 card.DIV.addEventListener("animationend", (e) => {
    if (e.animationName === "click") {cardstate="clicked";}})




//ANCHOR - clicking card when its fully scaled.

card.DIV.addEventListener("click", () => {
    if (cardstate === "clicked") {
        
        EvidenceBoard.appendChild(card.DIV);
        blacksheet.style.display = "block";
        
        EvidenceBoard.style.display = "none";
        cord.style.display = "none";
        light.style.display = "none";
        bookopenindex=index;
    dim.style.display = "none";}})


});




//SECTION - clicking the dim to close the card.

    dim.addEventListener("click", () => {
    if (cardstate ==="clicked") {
CaseDataArr.forEach((card) => {
        card.DIV.classList.remove("cardclicked");
         card.DIV.style.position = "absolute";
         document.body.appendChild(card.DIV);
         card.DIV.style.top = "";
         card.DIV.style.left = "";
         card.DIV.style.right = "";
        dim.style.display = "none";
        
        cardstate="notClicked";})}});





 
//SECTION: book creation and pageflip initialization.




async function bookCreate() {
 for (const card of CaseDataArr) {
    try {const promise= await fetch(card.STORYPATH);
        if (!promise.ok) {throw new Error(`HTTP error! status: ${promise.status}`);}
    const response= await promise.text();
    card.STORYTEXT=(response.split(" "));
     addPages(card);
     initializePageFlip(card);}
     catch (error) {console.error(`Error fetching story for ${card.NAME}:`, error);
    }}}
     
const addPages = (card) => {
    card.BOOK.innerHTML = "";
    let length=0;
    let pagestart=0;
    card.STORYTEXT.forEach((word, index) => {length+=word.length;
if (length>=1655) {
    let page = document.createElement("div");
    page.classList.add("page");
    page.dataset.density = "soft";
    page.textContent=card.STORYTEXT.slice(pagestart, index).join(" ");
    card.BOOK.appendChild(page);
    length=0;
    pagestart=index;}})
if (pagestart < card.STORYTEXT.length) {
    let page = document.createElement("div");
    page.classList.add("page");
    page.dataset.density = "soft";
    page.textContent = card.STORYTEXT.slice(pagestart).join(" ");
    card.BOOK.appendChild(page);}
let frontcover= document.createElement("div");
frontcover.classList.add("cpage");
frontcover.dataset.density = "hard";
frontcover.appendChild(card.FRONTCOVER);
card.BOOK.insertBefore(frontcover, card.BOOK.firstChild);
let backcover= document.createElement("div");
backcover.classList.add("cpage");
backcover.dataset.density = "hard";
backcover.appendChild(card.BACKCOVER);
card.BOOK.appendChild(backcover);

let allpages = card.BOOK.querySelectorAll(".page, .cpage");
if (allpages.length % 2 === 0) {  
    let frontblankpage = document.createElement("div");
    frontblankpage.classList.add("cpage");
    frontblankpage.dataset.density = "hard";
    card.BOOK.insertBefore(frontblankpage, card.BOOK.children[1]);
    let backblankpage = document.createElement("div");
    backblankpage.classList.add("cpage");
    backblankpage.dataset.density = "hard";
    card.BOOK.insertBefore(backblankpage, card.BOOK.lastChild);
}
else {
    let frontblankpage = document.createElement("div");
    frontblankpage.classList.add("cpage");
    frontblankpage.dataset.density = "hard";
    card.BOOK.insertBefore(frontblankpage, card.BOOK.children[1]);
    let backblankpage2 = document.createElement("div");
    backblankpage2.classList.add("cpage");
    backblankpage2.dataset.density = "hard";
    card.BOOK.insertBefore(backblankpage2, card.BOOK.lastChild);
    let backblankpage = document.createElement("div");
    backblankpage.classList.add("cpage");
    backblankpage.dataset.density = "hard";
    card.BOOK.insertBefore(backblankpage, card.BOOK.children[card.BOOK.children.length-1]);

}}


const initializePageFlip = (card) => {card.PAGEFLIP = new St.PageFlip(card.BOOK, {
    showCover: true,
    width: window.innerWidth*0.5,
height: window.innerHeight, 
size: "stretch",
minHeight: window.innerHeight,
});
card.PAGEFLIP.loadFromHTML(card.BOOK.querySelectorAll(".page, .cpage"))}

bookCreate();


//SECTION: book opening functionality.


blacksheet.addEventListener("animationend", (e) => {if(e.animationName === "fadeinblack") {
    CaseDataArr[bookopenindex].BOOK.style.top = "0";
 blacksheet.style.opacity="0"; exit.style.display="block"; CaseDataArr[bookopenindex].BOOK.style.animation="fadeinblack 1s ease forwards"; }})




 //SECTION: light cord functionality.
   

cord.addEventListener("click", () => {
    cord.classList.add("cordpulled");
if (lightstate==="on") {
        night.style.display = "block";
        light.classList.add("lightflickeroff");
        lightstate="off";
    }
    else {
        night.style.display = "none";
        light.style.display = "block";
        light.classList.add("lightflickeron");
        lightstate="on";
    }})
    cord.addEventListener("animationend", (e) => {
        if (e.animationName === "pullcord") {
            cord.classList.remove("cordpulled");
        }  
    })

light.addEventListener("animationend", (e) => {
    if (e.animationName === "lightflickeroff") {
        light.classList.remove("lightflickeroff");
        light.style.display = "none";
    }
    else if (e.animationName === "lightflickeron") {
        light.classList.remove("lightflickeron");
        night.style.display = "none";
    }})

    


//SECTION: cross functionality


cross.addEventListener("mouseover", () => {
        cross.classList.add("crosshover");
        document.querySelector(".circle").classList.add("circlehover");
    });
    cross.addEventListener("mouseout", () => {
        cross.classList.remove("crosshover");
        document.querySelector(".circle").classList.remove("circlehover");
    });
   cross.addEventListener("click", () => {
        exit.style.display = "none";
        CaseDataArr[bookopenindex].BOOK.style.top = "";
        EvidenceBoard.style.display = "block";
        blacksheet.style.display = "none";
        cord.style.display = "block";
       EvidenceBoard.style.animation="none";
       CaseDataArr[bookopenindex].DIV.style.animation="";
       CaseDataArr[bookopenindex].DIV.classList.remove("cardclicked");
      CaseDataArr[bookopenindex].DIV.style.position = "absolute";
      CaseDataArr[bookopenindex].DIV.style.top = "";
      CaseDataArr[bookopenindex].DIV.style.left = "";
      CaseDataArr[bookopenindex].DIV.style.right = "";
      dim.style.display = "none";
       cardstate="notClicked";
       bookopenindex=null;
       
    })
    