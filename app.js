
// express => express is a framework based on nodeJS
// nodemon => dev dependency => dependency which is only used during development not in production code
// socket.io => socket implemented

const express=require("express");
const{Server}=require("socket.io");
const app=express();
const http=require("http");

const server=http.createServer(app);

const io=new Server(server);

app.use(express.static("public"));

let userList=[];

io.on("connection",function(socket){
    console.log("User connected");

    socket.on("userConnected",function(username){
        let userObject={id:socket.id,username:username};
        userList.push(userObject);
        // console.log(userObject);

        socket.emit("online-list",userList);

        socket.broadcast.emit("join",userObject);

        
    })

    socket.on("chat",function(chatObj){
        socket.broadcast.emit("chatLeft",chatObj);
    })



    socket.on("disconnect",function(){
        let LeftUserObj;
        let remainingUsers=userList.filter(function(userObject){
            if(userObject.id==socket.id){
                LeftUserObj=userObject;
                return false;
            }
            return true;
        })
        userList=remainingUsers;
        socket.broadcast.emit("userDisconnect",LeftUserObj);


    });
});


server.listen(5500,function(){
    console.log("server started");
});