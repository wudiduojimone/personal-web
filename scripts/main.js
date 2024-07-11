let myHeading = document.querySelector("h1");
myHeading.textContent = "还有诗和远方";


let myImage = document.querySelector("img");
myImage.onclick = function () {
// alert("别戳我，我怕疼。");
let mySrc = myImage.getAttribute("src");
if (mySrc === "images/测试.png") {
    myImage.setAttribute("src", "images/测试.jpeg");
} else {
    myImage.setAttribute("src", "images/测试.png");
}
};


let myButton = document.querySelector("button");

function setUserName() {
    let myName = prompt("请输入你的名字。");
    if(!myName){
        setUserName();
    }else{
        localStorage.setItem("name", myName);
        myHeading.textContent = myName + ",欢迎光临";
    }
    
  }

if (!localStorage.getItem("name")) {
    setUserName();
} else {
    let storedName = localStorage.getItem("name");
    myHeading.textContent = storedName + ",欢迎光临";
}

myButton.onclick = function () {
    setUserName();
};
  

