let onlineList=document.querySelector(".online-list");
socket.emit("userConnected",username);



socket.on("join",function(dataObj){

    let ChatDiv=document.createElement("div");
    ChatDiv.classList.add("chat");
    ChatDiv.classList.add("join");
    ChatDiv.textContent=`${dataObj.username} joined chat `;
    chatWindow.append(ChatDiv);
    addInOnlineList(dataObj);
})

socket.on("userDisconnect",function(dataObj){

    let ChatDiv=document.createElement("div");
    ChatDiv.classList.add("chat");
    ChatDiv.classList.add("leave");
    ChatDiv.textContent=`${dataObj.username} Left chat `;
    chatWindow.append(ChatDiv);
    deleteFromOnlineList(dataObj.id);

})
socket.on("chatLeft",function(chatObj){

    let ChatDiv=document.createElement("div");
    ChatDiv.classList.add("chat");
    ChatDiv.classList.add("left");
    ChatDiv.textContent= chatObj.username+":"+chatObj.chat;
    
    chatWindow.append(ChatDiv);

})

socket.on("online-list", function(userList){

    for( let i=0; i<userList.length;i++){
        if(userList[i].id!=socket.id){
            let userDiv =document.createElement("div");
            userDiv.classList.add("user");
             userDiv.setAttribute("id" , userList[i].id);



            userDiv.innerHTML =`<div class="user-image" >
            <img src="default.png"  alt="" >
            </div>
            <div class ="user-name" > ${userList[i].username }<div> `

            onlineList.append(userDiv);
        }
    }
})

function deleteFromOnlineList(id){

    document.querySelector(`#${id}`).remove();

   
}
function addInOnlineList(userObj){
       let userDiv =document.createElement("div");
            userDiv.classList.add("user");
             userDiv.setAttribute("id" , userObj.id);



            userDiv.innerHTML =`<div class="user-image" >
            <img src="default.png"  alt="" >
            </div>
            <div class ="user-name" > ${userObj.username }<div> `


            onlineList.append(userDiv);

}

