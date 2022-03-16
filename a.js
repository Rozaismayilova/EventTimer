const left = document.querySelector('.left')
const btn = document.querySelector('button')
const title = document.querySelector('.title')
const description = document.querySelector('.description')
const date = document.querySelector('#date')
const time = document.querySelector('#time')
const formHeading = document.querySelector('.formHeading')
const form = document.querySelector('#myForm')
eventData = []

window.onload = function checkData(){
    if(localStorage.getItem("eventStorage") === null){
        eventData = [];
    } else{
        eventData = JSON.parse(localStorage.getItem("eventStorage"))
    }
    renderEvents()
}
console.log(eventData)

const checkValidate = function(){
    if((title.value && description.value && time.value && date.value) == ""){
        formHeading.textContent = "Fill the gaps please"
        formHeading.style.color = "red"
        return false
    }else{
        formHeading.textContent = "Create new event"
        formHeading.style.color = "white"
        return true
    }
    
}


btn.addEventListener('click', function(e){
    e.preventDefault()
    checkValidate()
    if(!checkValidate()){
        return
    }
    const eventValues = {
        title: title.value,
        description: description.value,
        date: `${date.value} , ${time.value}`,
    }
    eventData.push(eventValues)
    localStorage.setItem("eventStorage", JSON.stringify(eventData))
    title.value = ""
    description.value = ""
    date.value = ""
    time.value = ""
    renderEvents()

})


let renderEvents = () => {
    left.textContent = ""
    eventData.map((obj,index) => {
    let card = document.createElement('div');
    let time = document.createElement('div');
    let titleDes = document.createElement('div');
    let deleteBtn = document.createElement('button');

    deleteBtn.className = 'deleteBtn';
    card.className = "card";
    time.className = "time";
    titleDes.className = "titleDes";
    card.setAttribute("draggable", true)

    deleteBtn.textContent = 'Delete'
    titleDes.textContent = obj.title, obj.description;
    time.textContent = obj.date;
    left.append(card);
    card.append(time, titleDes);
    titleDes.append(deleteBtn);
    card.setAttribute("id" , index);
    deleteBtn.addEventListener('click', (e)=>{
        e.preventDefault()    
        deleteEvent(index)
    })
    localStorage.setItem("eventStorage", JSON.stringify(eventData))
    })

}

const deleteEvent = (index)=>{
    eventData.splice(index , 1)
    renderEvents()
}
