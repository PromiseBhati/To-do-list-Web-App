//all required element
const inputBox=document.querySelector(".inputField input");
const addBtn=document.querySelector(".inputField button");
const pro=document.querySelector(".pro");
const deleteAllBtn= document.querySelector(".footer button")
inputBox.onkeyup =()=>{
	let userData= inputBox.value;//taking input
	if(userData.trim()!=0){//if user enter some words value 
	addBtn.classList.add("active");//add button activated if user input something
 }
 else{
 addBtn.classList.remove("active");//unactive add button
 }
}
showTasks();
//if user click on add button
addBtn.onclick = ()=>{
	let userData= inputBox.value;//getting entered value
	let getLocalStorage =localStorage.getItem("New Todo");//getting local storage
	if(getLocalStorage==null){listArr=[]//creteing a null array.
	}else{
		listArr=JSON.parse(getLocalStorage);//transforming json string into  json object
	}
	listArr.push(userData);//adding user data
    localStorage.setItem("New Todo",JSON.stringify(listArr));//transforming js object into a json string 
    showTasks();//calling function
    addBtn.classList.remove("active");//unactive add button
}
//function to add task list in ul 
function showTasks(){
    let getLocalStorage =localStorage.getItem("New Todo");//getting local storage
    if(getLocalStorage==null){listArr=[]//creteing a null array.
	}
	else{
		listArr=JSON.parse(getLocalStorage);//transforming json object into  json string
	}
	const taskPending=document.querySelector(".taskPending");
	taskPending.textContent=listArr.length;//passing length of arr to pendingno.
	if(listArr.length>0){//if task present i todolist
		deleteAllBtn.classList.add("active");//active clear all button
	}
	else{//if no element in to do list
		deleteAllBtn.classList.remove("active");//unactive clear all button.
	}
	let newLiTag='';
	listArr.forEach((element,index)=>{
		newLiTag += ` <li> ${element} <span onclick="deleteTask(${index})";> <i class="fas fa-trash"></i></span></li>`;
	});
	pro.innerHTML  = newLiTag;//adding new li ta inside ui tag
	inputBox.value="";//blank input field after adding one item
}
//delete a specific task
function deleteTask(index){
	let getLocalStorage=localStorage.getItem("New Todo");
	listArr=JSON.parse(getLocalStorage);
	listArr.splice(index,1);//removing a particular index
	//after removing li index again update local storage
	localStorage.setItem("New Todo",JSON.stringify(listArr));//transforming js object into a json string 
    showTasks();//calling function

}
//deleting all tasks at once
deleteAllBtn.onclick =()=>{
	listArr=[];//empty array
	//after delete all tasks again update local storage
	localStorage.setItem("New Todo",JSON.stringify(listArr));//transformin json object into jsn string
	showTasks();//calling function
}

