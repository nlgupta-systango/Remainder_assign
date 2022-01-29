
let utime = document.getElementById("timer");
let subBtn = document.getElementById("subBtn");
let uMsg = document.getElementById("uMsg");
let temp;
let stop;
let arr=[];
console.log("linked");
subBtn.addEventListener('click', function () {
    let msg=uMsg.value;
    temp = utime.value;
    if(msg==""){
        alert("please enter message");
    }else{

        let allTask=localStorage.getItem("tasks");
        let allTime=localStorage.getItem("allTime");
        if(allTask==null && allTime==null ){
            remainderTask=[];
            remainderTime=[];
        }else{
            remainderTask=JSON.parse(allTask);
            remainderTime=JSON.parse(allTime);
        }
        remainderTask.push(msg);
        remainderTime.push(temp);
        localStorage.setItem("tasks",JSON.stringify(remainderTask));
        localStorage.setItem("allTime",JSON.stringify(remainderTime));


    newRemainder(msg,temp)
    uMsg.value="";
    }
});
function paraText(m) {

    let today = new Date();
    let h = today.getHours();
    let mi = today.getMinutes();
    let s = today.getSeconds();
    let p = document.createElement("p");
    let txtNode = document.createTextNode(m + "  " + h + ":" + mi + ":" + s);
    p.appendChild(txtNode)
    document.getElementById("box1").appendChild(p)
}
function newRemainder(msg=null,temp=true) {
    if(msg == null){
        let myList = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []
        myList.push({
            text: msg
        });
        localStorage.setItem("myList", JSON.stringify(myList))
    }


    if(temp){
    stop = setInterval(() => {
        paraText(msg);
    }, temp * 1000);
    arr.push(stop);
}
    let li = document.createElement("li")
    let txtNode1 = document.createTextNode(msg);
    li.appendChild(txtNode1);

    document.getElementById("myUl").appendChild(li);

    let span = document.createElement("SPAN");
    let txt = document.createTextNode("❌");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);

    removeTask(span);
   
}
let storedItem = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []
let storedTime = localStorage.getItem("allTime") ? JSON.parse(localStorage.getItem("allTime")) : []
for(let nodeCnt = 0; nodeCnt < storedItem.length; nodeCnt++){
    newRemainder(storedItem[nodeCnt],false);
}
function removeTask(span){
    for(let i =0 ; i< arr.length ; i++)
    {
        span.addEventListener("click" , function(){
            let div = this.parentElement;

            div.style.display = "none";
       
            clearInterval(arr[i]);  
            
        });

}

}