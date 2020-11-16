let startbutton = document.getElementById('gamebutton')
startbutton.addEventListener('click', startGame)

let howtobutton = document.getElementById('howtobutton')
howtobutton.addEventListener('click', howToPlay)

let aboutbutton = document.getElementById('aboutbutton')
aboutbutton.addEventListener('click', about)

let cancelbutton = document.getElementById('cancelbutton')
cancelbutton.addEventListener('click', cancel)

let aboutcancelbutton = document.getElementById('aboutcancelbutton')
aboutcancelbutton.addEventListener('click', aboutcancel)

let drawcards = document.getElementById('drawcards')
let wincards = document.getElementById('wincards')
let playcards = document.getElementById('playcards')

let drawStack = []
let endStacks = [false, false, false, false, false, false, false, false]
let tableStacks = [[],[],[],[],[],[],[],[],[],[]]

let pushTo = 0
let pushFrom = 0

let gotToChange = false
let changeElement = 0
let transportableArray = []

let holder = document.createElement('div')
holder.setAttribute('id', "holder")

let placedInto = 0
let placedFrom = 0

let stopper = false
let currentWinstack = 7
 
function drawStacks(){
    let drawDiv = document.createElement("div")
    drawDiv.setAttribute('id', 'cardDrawingPlace')
    drawcards.appendChild(drawDiv)
    
    for(let i = 0; i<8; i++){
        let winStacks = document.createElement("div")
        winStacks.setAttribute('class', 'winstack')
        wincards.appendChild(winStacks)
    }
    
    for(let i = 0; i<10; i++){
        let playStacks = document.createElement("div")
        playStacks.setAttribute('class', 'playstack')
        playStacks.setAttribute('id', i + 'playstack')
        playStacks.setAttribute('ondrop', 'drop(event)')
        playStacks.setAttribute('ondragover', 'allowDrop(event)')
        playcards.appendChild(playStacks)
    }
}

function drawImages(){
    let cardimage = document.createElement('img')
    cardimage.setAttribute('src', drawStack[0][0].image)
    cardimage.setAttribute('class', 'bigDraw')
    cardimage.style.marginTop = 40+'px'
    cardimage.setAttribute('draggable', false)
    cardimage.setAttribute('id', drawStack[0][0].id)

    for(let i=0; i<4; i++){
        let cardImageBack = document.createElement('img')
        cardImageBack.setAttribute('src', './cardback.png')
        cardImageBack.setAttribute('class', 'bigDraw')
        document.getElementById('cardDrawingPlace').appendChild(cardImageBack)
        cardImageBack.style.marginTop = ((10*i) +'px')
    }
    document.getElementById('cardDrawingPlace').appendChild(cardimage)
    
    for(let i = 0; i<document.querySelectorAll(".playstack").length; i++){
        for(let j=0; j<tableStacks[i][0].length -1; j++){
            let cardImageBack = document.createElement('img')
            cardImageBack.setAttribute('src', './cardback.png')
            cardImageBack.setAttribute('class', 'drawACard')
            document.querySelectorAll(".playstack")[i].appendChild(cardImageBack)
            cardImageBack.style.marginTop = ((10*j) +'px')
        }
        let playcardimage = document.createElement('img')
        playcardimage.setAttribute('src', tableStacks[i][0][0].image)
        playcardimage.setAttribute('class', 'card')
        playcardimage.setAttribute('draggable', true)
        playcardimage.setAttribute('ondragstart', 'drag(event)')
        playcardimage.setAttribute('ondrop', 'drop(event)')
        playcardimage.setAttribute('ondragover', 'allowDrop(event)')
        playcardimage.setAttribute('id', tableStacks[i][0][0].id)
        playcardimage.setAttribute('value', tableStacks[i][0][0].value)
        playcardimage.setAttribute('suit', tableStacks[i][0][0].suit)
        if(tableStacks[i][0][0].value == 'JACK'){
           playcardimage.setAttribute('value', 11)
        }else if(tableStacks[i][0][0].value == 'QUEEN'){
            playcardimage.setAttribute('value', 12)
        }else if(tableStacks[i][0][0].value == 'KING'){
            playcardimage.setAttribute('value', 13)
        }else if(tableStacks[i][0][0].value == 'ACE'){
            playcardimage.setAttribute('value', 1)
        }
        document.querySelectorAll(".playstack")[i].appendChild(playcardimage)
        if(i<4){
            playcardimage.style.marginTop = 40+'px'
        }else{
            playcardimage.style.marginTop = 30+'px'
        }
    }
}

function allowDrop(event){
    event.preventDefault()
}

function drag(event){
    
    pushFrom = parseInt(event.target.parentElement.id)
     if(event.target == event.target.parentElement.firstElementChild){
         gotToChange = false
         changeElement = 0
     }else if(!event.target.previousElementSibling.id){
         gotToChange = true
         changeElement = event.target.previousElementSibling
     }
    let lookIntoArray = 0
    switch(event.target.parentElement.id){
           case "0playstack":
            lookIntoArray = 0
            break;
            case "1playstack":
            lookIntoArray = 1
            break;
            case "2playstack":
            lookIntoArray = 2
            break;
            case "3playstack":
            lookIntoArray = 3
            break;
            case "4playstack":
            lookIntoArray = 4
            break;
            case "5playstack":
            lookIntoArray = 5
            break;
            case "6playstack":
            lookIntoArray = 6
            break;
            case "7playstack":
            lookIntoArray = 7
            break;
            case "8playstack":
            lookIntoArray = 8
            break;
            case "9playstack":
            lookIntoArray = 9
            break;
        default:
            lookIntoArray = 0;
    }
    
    //find the position of the element
    let positionOfCurrentElement = 0
    for(let i = 0; i<tableStacks[lookIntoArray][0].length; i++){
        if(event.target.id == tableStacks[lookIntoArray][0][i].id){
            positionOfCurrentElement = i
        }
    }
    
    //find if other elements have the same coat AND are less value
   
    for(let i = positionOfCurrentElement ; i >=0; i--){
        let nextValue = tableStacks[lookIntoArray][0][i].value
        switch(nextValue){
            case "JACK":
                nextValue = 11
                break;
            case "QUEEN":
                nextValue = 12
                break;
            case "KING":
                nextValue = 13
                break;
            case "ACE":
                nextValue = 1
                break;
        }
        let currentValue = tableStacks[lookIntoArray][0][positionOfCurrentElement].value
        switch(currentValue){
            case "JACK":
                currentValue = 11
                break;
            case "QUEEN":
                currentValue = 12
                break;
            case "KING":
                currentValue = 13
                break;
            case "ACE":
                currentValue = 1
                break;
        }
        if(nextValue <= currentValue && tableStacks[lookIntoArray][0][i].suit == tableStacks[lookIntoArray][0][positionOfCurrentElement].suit){
            transportableArray.push(tableStacks[lookIntoArray][0][i])
            console.log(transportableArray)
            console.log('Array transport allowed')
        }else{
            transportableArray = []
            console.log('Array transport denied')
            event.preventDefault()
            stopper = true
        }
    } 
    
    //do it for DOM elements
    if(!stopper){
    let targetsPosition = 0
    for(let i = 0; i<event.target.parentElement.childElementCount; i++){
        if(event.target.parentElement.children.item(i).id == event.target.id){
           targetsPosition = i 
           }
    }
    
    event.target.parentElement.appendChild(holder)
    document.getElementById('holder').appendChild(event.target)
    event.dataTransfer.setData('text', 'holder')
    
    
    for(let i = targetsPosition; i<=event.target.parentElement.parentElement.childElementCount - 1; i++){
        if(event.target.parentElement.parentElement.children.item(i).getAttribute("suit") === event.target.getAttribute("suit") && event.target.parentElement.parentElement.children.item(i).getAttribute("value") < event.target.getAttribute("value")){
            console.log("Element transport allowed")
            //transfer all correct cards to drop event
           console.log(event.target.parentElement.parentElement.children.item(i))
            holder.appendChild(event.target.parentElement.parentElement.children.item(i))
        }else{
            console.log('Element trasport denied')
        }
    }
    }
    placedFrom = event.target.parentElement.parentElement
    stopper = false
    
    
    ///makeing dragimage
    let dragimages = document.createElement('div')
    document.getElementById('header').appendChild(dragimages)
    dragimages.setAttribute('id', 'dragimages')
    //how many elements are dragged 
    console.log(transportableArray.length)
    for(let i = 0; i< transportableArray.length; i++){
        let image = document.createElement('img')
        image.setAttribute('src', transportableArray[i].image)
        image.style.position = 'absolute'
        image.setAttribute('class', 'indragimagecontiner')
        if(dragimages.childElementCount == 0){
            image.style.marginTop = 0 + 'px'
        }else{
            image.style.marginTop = parseInt(dragimages.lastElementChild.style.marginTop) + 10 + 'px'
        }
        dragimages.appendChild(image)
        console.log(dragimages)
    }
    event.dataTransfer.setDragImage(dragimages, 0,0)
    
}

function drop(event){
    
    placedInto = event.target.parentElement.parentElement
    let oldElement = event.target.parentElement.lastElementChild
    let newElement = document.getElementById('holder').firstElementChild
    
    //checks if element is dropped outside of playable zone
    if(event.target == document.getElementById('gamediv') || event.target == document.getElementById('topcontainer') || event.target == document.getElementById("playcards")){
        for(let i = 0; i<document.getElementById('holder').childElementCount; i++){
        placedFrom.appendChild(document.getElementById('holder').children.item(i))
        }
        if(document.getElementById('holder').childElementCount == 0){
        document.getElementById('holder').remove()
        }
        event.preventDefault()
        gotToChange = false
    }
   
    //checks if element is dropped into a new place (NOT IN THE SAME PLACE)
    if(placedFrom !== placedInto){
    //checks if element is lesser value
    if(event.target.parentElement.id == 'playcards'){
        event.target.appendChild(document.getElementById(event.dataTransfer.getData('text')))
        for(let i = 0; i<=document.getElementById('holder').childElementCount; i++){
        event.target.appendChild(document.getElementById('holder').firstElementChild)
            newElement.style.marginTop = 0 + 'px'
        }
        if(document.getElementById('holder').childElementCount == 0){
        document.getElementById('holder').remove()
        }
    //check if it is an empty stack
    }else if(parseInt(oldElement.getAttribute("value")) == parseInt(newElement.getAttribute("value")) + 1){
        event.target.parentElement.appendChild(document.getElementById(event.dataTransfer.getData('text')))
    for(let i = 0; i<=document.getElementById('holder').childElementCount; i++){
        event.target.parentElement.appendChild(document.getElementById('holder').firstElementChild)
        newElement.style.marginTop = parseInt(oldElement.style.marginTop) + 10 +'px'
    }
    console.log(document.getElementById('holder').childElementCount)
    if(document.getElementById('holder').childElementCount == 0){
        document.getElementById('holder').remove()
        }
       //if it is NOT one less value    
    }else{
        gotToChange = false
        for(let i = 0; i<document.getElementById('holder').childElementCount; i++){
        placedFrom.appendChild(document.getElementById('holder').children.item(i))
        }
        if(document.getElementById('holder').childElementCount == 0){
        document.getElementById('holder').remove()
        }
    }
    
    pushTo = parseInt(event.target.parentElement.id)
    
    if(event.target.parentElement.id == 'playcards' ){
        pushTo = parseInt(event.target.id)
    }
        
        
        
    //STACK X, ELEMENT 0 - MOVE TO STACK Y, TO LAST POSITION
    for(let i = 0; i<transportableArray.length; i++){
        tableStacks[pushTo][0].unshift(transportableArray[i])
    }
    //DELETE ELEMENT AT PREVIOUS STACK
    tableStacks[pushFrom][0].splice(0, transportableArray.length)
    
    }else{
        //if element is dropped on itself
        gotToChange = false
        for(let i = 0; i<document.getElementById('holder').childElementCount; i++){
        event.target.parentElement.parentElement.appendChild(document.getElementById('holder').children.item(i))
        }
        if(document.getElementById('holder').childElementCount == 0){
        document.getElementById('holder').remove()
        }
         
    }
    
    if(gotToChange){
        changeElement.setAttribute('src', tableStacks[parseInt(changeElement.parentElement.id)][0][0].image )
        changeElement.setAttribute('id', tableStacks[parseInt(changeElement.parentElement.id)][0][0].id)
        changeElement.setAttribute('class', 'card')
        changeElement.setAttribute('draggable', true)
        changeElement.setAttribute('ondragstart', 'drag(event)')
        changeElement.setAttribute('ondrop', 'drop(event)')
        changeElement.setAttribute('ondragover', 'allowDrop(event)')
        changeElement.setAttribute('value', tableStacks[parseInt(changeElement.parentElement.id)][0][0].value)
        changeElement.setAttribute('suit', tableStacks[parseInt(changeElement.parentElement.id)][0][0].suit)
        if(tableStacks[parseInt(changeElement.parentElement.id)][0][0].value == 'JACK'){
           changeElement.setAttribute('value', 11)
        }else if(tableStacks[parseInt(changeElement.parentElement.id)][0][0].value == 'QUEEN'){
            changeElement.setAttribute('value', 12)
        }else if(tableStacks[parseInt(changeElement.parentElement.id)][0][0].value == 'KING'){
            changeElement.setAttribute('value', 13)
        }else if(tableStacks[parseInt(changeElement.parentElement.id)][0][0].value == 'ACE'){
            changeElement.setAttribute('value', 1)
        }
    gotToChange = false
    }
   transportableArray = []
    checkWin()
}

function checkWin(){
    let winableArray = []
    winableArray.push(tableStacks[pushTo][0][0])
    for(let i = 0; i<tableStacks[pushTo][0].length; i++){
        let currentItemValue = tableStacks[pushTo][0][i].value
        let currentSuit = tableStacks[pushTo][0][i].suit
        switch(currentItemValue){
            case "JACK":
                currentItemValue = 11
                break;
            case "QUEEN":
                currentItemValue = 12
                break;
            case "KING":
                currentItemValue = 13
                break;
            case "ACE":
                currentItemValue = 1
                break;
        }
        let nextItemValue = 0
        let nextSuit = 0
        if(i != tableStacks[pushTo][0].length - 1){
            nextItemValue = tableStacks[pushTo][0][i+1].value
            nextSuit = tableStacks[pushTo][0][i+1].suit
        }
        
        switch(nextItemValue){
            case "JACK":
                nextItemValue = 11
                break;
            case "QUEEN":
                nextItemValue = 12
                break;
            case "KING":
                nextItemValue = 13
                break;
            case "ACE":
                nextItemValue = 1
                break;
        }
        if(winableArray.length == 0 || (currentItemValue == nextItemValue - 1 && currentSuit == nextSuit)){
            winableArray.push(tableStacks[pushTo][0][i+1])
        }
    }
    
    if(winableArray.length == 13){
        let completeStackImage = document.createElement('img')
        completeStackImage.setAttribute('src', winableArray[0].image)
        completeStackImage.setAttribute('class', 'card')
        wincards.children.item(currentWinstack).appendChild(completeStackImage)
        endStacks[currentWinstack] = true
        currentWinstack = currentWinstack - 1
        tableStacks[pushTo][0].splice(0, 13)
        for(let i = 13; i <0 ; i--){
            document.getElementById('playcards').children.item(pushTo).children.item(i).remove
        }
        //check if all endstacks are true => launch win function
        function checkIfTrue(item){
            return item == true
        }
        if(endStacks.every(checkIfTrue)){
            console.log('do the win sequance')
            winGame()
        }
    }
}

function winGame(){
    console.log('u win this game!!!')
    document.getElementById('gamediv').setAttribute('class', 'animate__zoomOut animate__animated animate__faster')
    setTimeout(function(){document.getElementById('gamediv').style.display = 'none'}, 500)
    document.getElementById('winmessage').style.display = 'inline'
    document.getElementById('winmessage').setAttribute('class', 'animate__zoomIn animate__animated animate__faster')
    
}
function startGame(){
    
    document.getElementById('maindiv').setAttribute('class', 'animate__zoomOutDown animate__animated animate__faster')
    setTimeout(function(){document.getElementById('maindiv').style.display = 'none'}, 500)
    
    document.getElementById('loader').style.visibility = 'visible'
    document.getElementById('loader').setAttribute('class', 'animate__zoomIn animate__animated animate__faster lds-ring')
    
    
    let data
    let request = new XMLHttpRequest()
    request.open('GET', 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2', true)
    request.send()
    request.onload = function(){
        data = JSON.parse(this.response)
        let drawcards = new XMLHttpRequest()
        drawcards.open('GET', "https://deckofcardsapi.com/api/deck/" +data.deck_id + "/draw/?count=104")
        drawcards.send()
        drawcards.onload = function(){
        let cards = JSON.parse(this.response)
        for(i=0; i<cards.cards.length; i++){
            cards.cards[i].id = i
        }
        //50 to draw stack -54 left
        drawStack.push(cards.cards.slice(0,50))

        // 5 to 4 play stacks
        tableStacks[0].push(cards.cards.slice(51,56))
        tableStacks[1].push(cards.cards.slice(57,62))
        tableStacks[2].push(cards.cards.slice(63,68))
        tableStacks[3].push(cards.cards.slice(69,74))
        // 4 to 6 play stacks
        tableStacks[4].push(cards.cards.slice(75,79))
        tableStacks[5].push(cards.cards.slice(80,84))
        tableStacks[6].push(cards.cards.slice(85,89))
        tableStacks[7].push(cards.cards.slice(90,94))
        tableStacks[8].push(cards.cards.slice(95,99))
        tableStacks[9].push(cards.cards.slice(100,104))
        
        drawStacks()
        drawImages()
            
            
        let drawerStack = document.querySelectorAll(".bigDraw")
                for(let i = 0; i<drawerStack.length; i++){
                drawerStack[i].addEventListener('click', drawNewCards)
                    }
    }
    }
    
    setTimeout(function(){
        document.getElementById('loader').setAttribute('class', 'animate__zoomOut animate__animated animate__faster lds-ring')
        setTimeout(function(){document.getElementById('loader').style.visibility = 'hidden'}, 500)
    }, 800)
    setTimeout(function(){
        document.getElementById('gamediv').style.display = 'inherit'
        document.getElementById('gamediv').setAttribute('class', 'animate__zoomInUp animate__animated animate__faster')
    }, 900)
    
}

function drawNewCards(){
    for(i=0; i<tableStacks.length; i++){
        tableStacks[i][0].unshift(drawStack[0][0])
        drawStack[0].shift()
    }
    //REMOVE TOP CARD
    document.getElementById('cardDrawingPlace').lastElementChild.remove()
    //DRAW NEW TOP CARD
    if(document.getElementById('cardDrawingPlace').childElementCount != 0){
        document.getElementById('cardDrawingPlace').lastElementChild.setAttribute('src', drawStack[0][0].image)
    }
    
    //DRAW CARS ON PLAYSTACKS
   for(let i=0; i<document.querySelectorAll(".playstack").length; i++){
       let newCard = document.createElement('img')
        newCard.setAttribute('src', tableStacks[i][0][0].image)
        newCard.setAttribute('class', 'card')
        newCard.setAttribute('draggable', true)
        newCard.setAttribute('ondragstart', 'drag(event)')
        newCard.setAttribute('ondrop', 'drop(event)')
        newCard.setAttribute('ondragover', 'allowDrop(event)')
        newCard.setAttribute('id', tableStacks[i][0][0].id)
        newCard.setAttribute('value', tableStacks[i][0][0].value)
        newCard.setAttribute('suit', tableStacks[i][0][0].suit)
        if(tableStacks[i][0][0].value == 'JACK'){
           newCard.setAttribute('value', 11)
        }else if(tableStacks[i][0][0].value == 'QUEEN'){
            newCard.setAttribute('value', 12)
        }else if(tableStacks[i][0][0].value == 'KING'){
            newCard.setAttribute('value', 13)
        }else if(tableStacks[i][0][0].value == 'ACE'){
            newCard.setAttribute('value', 1)
        }
        document.querySelectorAll(".playstack")[i].appendChild(newCard)
        newCard.style.marginTop = parseInt(newCard.previousElementSibling.style.marginTop) + 10 + 'px'
       
   }
}


function howToPlay(){
    document.getElementById('howtoplaydiv').setAttribute('class', "animate__animated animate__zoomIn animate__faster")
    document.getElementById('howtoplaydiv').style.display = 'flex'
}

function cancel(){
    document.getElementById('howtoplaydiv').setAttribute('class', "animate__animated animate__zoomOut animate__faster")
    
     setTimeout(function(){document.getElementById('howtoplaydiv').style.display = 'none'}, 500)
}

function about(){
    document.getElementById('aboutdiv').setAttribute('class', "animate__animated animate__zoomIn animate__faster")
    document.getElementById('aboutdiv').style.display = 'flex'
}

function aboutcancel(){
    document.getElementById('aboutdiv').setAttribute('class', "animate__animated animate__zoomOut animate__faster")
    
     setTimeout(function(){document.getElementById('aboutdiv').style.display = 'none'}, 500)
}
