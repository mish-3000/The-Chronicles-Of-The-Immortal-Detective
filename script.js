//SECTION: all declared variables.

const intro = document.querySelector(".intro");
const introtext = document.querySelectorAll(".introtext");
const EvidenceBoard = document.querySelector(".EvidenceBoard");
const night = document.querySelector(".night");
const dim = document.querySelector(".darksheet");
const blacksheet = document.querySelector(".blacksheet");
const exit = document.querySelector(".exit");
 const cord = document.querySelector(".cord");
 const light = document.querySelector(".light");
const svg = document.querySelector(".svgcanvas");
 const ribbon = document.querySelector(".ribbon");
 const pin = document.querySelector(".pin");
let loadingtext=document.createElement("p") 






//SECTION: states.
let lightstate="off";
 let bookopenindex=null;
 let cardstate="notClicked";
let bookopened=false;




//SECTION: loading screen.
loadingtext.textContent="the case is loading..." 
loadingtext.classList.add("loadingtext") 
document.body.appendChild(loadingtext) 





//SECTION: intro screen.

introtext[0].addEventListener("animationend", (e) => {
    if (e.animationName === "IntroFade") {
        introtext[1].style.visibility = "visible";
        introtext[1].classList.add("flicker");
    }})
introtext[1].addEventListener("animationend", (e) => {
    if (e.animationName === "flicker") {introtext[0].classList.add("introtextfadeout"); introtext[1].classList.add("introtextfadeout");}
})
introtext[1].addEventListener("animationend", (e) => {if (e.animationName === "introtextfadeout") {intro.classList.add("introfadeout"); EvidenceBoard.style.visibility = "visible"; }})
intro.addEventListener("animationend", (e) => {
    if (e.animationName === "introfadeout") {intro.style.display = "none";  cord.style.display = "block"; night.style.display = "block";}})

 


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
pushpin.setAttribute("src", "/assets/misc/pushpin.png")
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
let pageno=null;
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
    "PAGEFLIP": null,
    "BOOKMARK": pageno,
      "LOADED": false,
    "buildPromise": null
}    
CaseDataArr.push(CaseData)
}







//SECTION: Drawing threads between pushpins.


const patharr = [];
for (let i = 0; i <=7; i++) {
let path= document.createElementNS("http://www.w3.org/2000/svg", "path");

path.setAttribute("stroke", "rgb(136, 8, 8,1)");
path.setAttribute("fill", "transparent");
path.setAttribute("stroke-width", "clamp(0.15rem, 0.22vw, 0.4rem)");
patharr.push(path);
svg.appendChild(path); 
}

const drawThreads = () => {
    if (EvidenceBoard.style.display === "none") {return}
const points = [];
const pincentre=[];
CaseDataArr.forEach((caseData) => {
    let coordinates=caseData.PUSHPIN.getBoundingClientRect();
points.push(coordinates); 
})
points.forEach((point) => {
    let x = point.left + point.width*0.7;
    let y = point.top + point.height*0.7;
    pincentre.push({ m:x, n:y });
});
if (points.length >= 10) {
    
    const pathdata =  [`M${pincentre[0].m} ${pincentre[0].n} Q${(points[0].x + points[1].x) / 2} ${ (points[0].y + points[1].y) / 2 + 70} ${pincentre[1].m} ${pincentre[1].n}`,
     `M${pincentre[0].m} ${pincentre[0].n} Q${(points[0].x + points[5].x) / 2} ${ (points[0].y + points[5].y) / 2 + 50} ${pincentre[5].m} ${pincentre[5].n}`,
   `M${pincentre[0].m} ${pincentre[0].n} Q${(points[0].x + points[8].x) / 2+70} ${ (points[0].y + points[8].y) / 2 + 70} ${pincentre[8].m} ${pincentre[8].n}`,
     `M${pincentre[4].m} ${pincentre[4].n} Q${points[4].x} ${ (points[4].y + points[7].y) / 2 } ${pincentre[7].m} ${pincentre[7].n}`,
     `M${pincentre[6].m} ${pincentre[6].n} Q${(points[6].x + points[3].x) / 2} ${ (points[6].y + points[3].y) / 2 + 50} ${pincentre[3].m} ${pincentre[3].n}`,
     `M${pincentre[6].m} ${pincentre[6].n} Q${(points[6].x + points[1].x) / 2} ${ (points[6].y + points[1].y) / 2 + 50} ${pincentre[1].m} ${pincentre[1].n}`,
   `M${pincentre[7].m} ${pincentre[7].n} Q${(points[7].x + points[9].x) / 2} ${ points[9].y+80} ${pincentre[9].m} ${pincentre[9].n}`,
     `M${pincentre[2].m} ${pincentre[2].n} Q${(points[2].x + points[4].x) / 2} ${ (points[2].y + points[4].y) / 2 + 50} ${pincentre[4].m} ${pincentre[4].n}` ]




patharr.forEach((path, index) => {
    path.setAttribute("d", pathdata[index]);
    path.setAttribute("stroke-dasharray", path.getTotalLength());
path.setAttribute("stroke-dashoffset", path.getTotalLength());
})
}

}

    intro.addEventListener("animationend", (e) => {if (e.animationName === "introfadeout") { drawThreads(); setTimeout(() => {patharr.forEach((path) => {path.classList.add("draw"); })}, 500); }})

patharr.forEach((path) => {path.addEventListener("animationend", (e) => {if (e.animationName === "draw") {path.classList.remove("draw"); path.style.strokeDasharray = "0"; path.style.strokeDashoffset = "0"; path.classList.add("threadglow");}
else if (e.animationName === "threadglow") {path.classList.remove("threadglow")}
})})

   EvidenceBoard.addEventListener("scroll", drawThreads);
   window.addEventListener("resize", drawThreads);






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
        card.buildPromise = buildBook(card);
        loadingtext.style.display="block";
        night.style.display = "none";
    dim.style.display = "none";}})



})



//SECTION - clicking the dim to close the card.

    dim.addEventListener("click", () => {
    if (cardstate ==="clicked") {
CaseDataArr.forEach((card) => {
        card.DIV.classList.remove("cardclicked");
         card.DIV.style.position = "absolute";
         EvidenceBoard.appendChild(card.DIV);
         card.DIV.style.top = "";
         card.DIV.style.left = "";
         card.DIV.style.right = "";
        dim.style.display = "none";
        
        cardstate="notClicked";})}})





 
//SECTION: book creation and pageflip initialization.


async function buildBook(card) {
    if (card.LOADED) return;
    try {
        await document.fonts.ready;
        const res = await fetch(card.STORYPATH);
        if (!res.ok) { throw new Error(`HTTP error! status: ${res.status}`); }
        const text = await res.text();
        card.STORYTEXT = text.split(" ");
        if (card.PAGEFLIP) { card.PAGEFLIP.destroy(); card.PAGEFLIP = null; }
        addPages(card);
        initializePageFlip(card);
        card.LOADED = true;
    } catch (error) {
        console.error(`Error fetching story for ${card.NAME}:`, error);
    }
}



     
const addPages = (card) => {
    card.BOOK.innerHTML = "";
let length = card.STORYTEXT.length;
  let pageStartIndex = 0;
    let totalLength = card.STORYTEXT.length;
let measurePage = document.createElement("div");
    measurePage.classList.add("page");
    card.BOOK.appendChild(measurePage);
  
const compStyle = getComputedStyle(measurePage);
    const availHeight = measurePage.clientHeight- parseFloat(compStyle.paddingTop)- parseFloat(compStyle.paddingBottom);
   
let textMeasure = document.createElement("div");
    measurePage.appendChild(textMeasure);
const fitsOnPage = (start, count) => {
        textMeasure.textContent = card.STORYTEXT.slice(start, start + count).join(" ");
        return textMeasure.offsetHeight <= availHeight;
    };
const pagesContent = [];
    while (pageStartIndex < totalLength) {
        
let low = 1;
 let high = totalLength - pageStartIndex;
 let bestFit = 1;
        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            if (fitsOnPage(pageStartIndex, mid)) {
                bestFit = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
  pagesContent.push(card.STORYTEXT.slice(pageStartIndex, pageStartIndex + bestFit).join(" "));
        pageStartIndex += bestFit;
    }
   
    card.BOOK.removeChild(measurePage);

    pagesContent.forEach((text) => {
        let page = document.createElement("div");
        page.classList.add("page");
        page.dataset.density = "soft";
        page.textContent = text;
        card.BOOK.appendChild(page);
    });
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
    frontblankpage.dataset.density = "soft";
    card.BOOK.insertBefore(frontblankpage, card.BOOK.children[1]);
    let backblankpage = document.createElement("div");
    backblankpage.classList.add("cpage");
    backblankpage.dataset.density = "soft";
    card.BOOK.insertBefore(backblankpage, card.BOOK.lastChild);
}
else {
    let frontblankpage = document.createElement("div");
    frontblankpage.classList.add("cpage");
    frontblankpage.dataset.density = "soft";
    card.BOOK.insertBefore(frontblankpage, card.BOOK.children[1]);
    let backblankpage2 = document.createElement("div");
    backblankpage2.classList.add("cpage");
    backblankpage2.dataset.density = "soft";
    card.BOOK.insertBefore(backblankpage2, card.BOOK.lastChild);
    let backblankpage = document.createElement("div");
    backblankpage.classList.add("cpage");
    backblankpage.dataset.density = "soft";
    card.BOOK.insertBefore(backblankpage, card.BOOK.children[card.BOOK.children.length-1]);

}}


const initializePageFlip = (card) => {
card.FRONTCOVER.style.width=window.innerWidth*0.5 + 'px'
card.FRONTCOVER.style.height=window.innerHeight + 'px'
card.BACKCOVER.style.width=window.innerWidth*0.5 + 'px'
card.BACKCOVER.style.height=window.innerHeight + 'px'
    card.PAGEFLIP = new St.PageFlip(card.BOOK, {
    showCover: true,
    width: window.innerWidth*0.5,
height: window.innerHeight, 
size: "stretch",
minHeight: window.innerHeight,
});
card.PAGEFLIP.loadFromHTML(card.BOOK.querySelectorAll(".page, .cpage"))
}




//SECTION - resize handling.
let resizetimer
window.addEventListener("resize", () => {
clearTimeout(resizetimer)
resizetimer=setTimeout(() => {
CaseDataArr.forEach((card) => {card.LOADED=false})
}, 300)
})



//SECTION: book opening functionality.


blacksheet.addEventListener("animationend", async (e) => {if(e.animationName === "fadeinblack") {
   await CaseDataArr[bookopenindex].buildPromise;
    loadingtext.style.display="none";
    exit.style.display="block";
    CaseDataArr[bookopenindex].BOOK.style.top = "0";
 blacksheet.style.opacity="0"; CaseDataArr[bookopenindex].BOOK.style.animation="fadeinblack 1s ease forwards"; bookopened=true; }})




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

    


//SECTION - exit functionality.

exit.addEventListener("click", () => {
    const currentCase = CaseDataArr[bookopenindex];

    currentCase.BOOK.style.top = "-9999px";
    currentCase.BOOK.style.animation = "";

    EvidenceBoard.style.display = "block";
    EvidenceBoard.style.visibility = "visible";
    drawThreads();

    cord.style.display = "block";

    if (lightstate === "on") {
        light.style.display = "block";
        night.style.display = "none";
    } else {
        light.style.display = "none";
        night.style.display = "block";
    }

    currentCase.DIV.classList.remove("cardclicked", "scaledhover");
    currentCase.DIV.style.position = "absolute";
    currentCase.DIV.style.top = "";
    currentCase.DIV.style.left = "";
    currentCase.DIV.style.right = "";

    EvidenceBoard.appendChild(currentCase.DIV);

    dim.style.display = "none";
    blacksheet.style.display = "none";
    blacksheet.style.opacity = "";

    exit.style.display = "none";
    loadingtext.style.display = "none";

    bookopened = false;
    bookopenindex = null;
    cardstate = "notClicked";

});



