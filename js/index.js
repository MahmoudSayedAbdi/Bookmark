var siteName = document.getElementById("siteName")
var siteURL = document.getElementById("siteURL")
var submitBtn = document.getElementById("submitBtn")

var outputSite = document.querySelector(".outputs tbody")
var iVaildUrl  =document.querySelector(".body-Bookmark .vaildUrl i")
var iVaildName  =document.querySelector(".body-Bookmark .vaildName i")
var closeElement = document.querySelector(".alert .item .circles i")
var alertDiv    =  document.querySelector(".alert")
var siteList = [];
if(localStorage.getItem("sites")!= null)
{
    siteList = JSON.parse(localStorage.getItem("sites"))
}

// addSite
function addSite(){
    validateForm()
    var site = {
        title : siteName.value ,
        url : siteURL.value ,
    };
    siteList.push(site);
    clearForm()
    display()
    localStorage.setItem("sites" , JSON.stringify(siteList))
}
submitBtn.addEventListener("click" , addSite)

// clearForm
function clearForm() {
    siteName.value = "";
    siteURL.value = "";
}

// display
function display(){
    temp = "";
    for(var i = 0 ; i< siteList.length ; i++){
        temp += `        <tr>
                            <td>${i+1}</td>
                            <td>${siteList[i].title}</td>
                            <td><a href="${siteList[i].url}" target="_blank"><button class="btn btn-success text-white"><i class="fa-solid fa-eye me-2"></i>Visit</button></a></td>
                            <td><button  onclick="deleteSite(${i})" class="btn btn-danger text-white"><i class="fa-solid fa-trash-can me-2"></i>Delete</button></td>
                        </tr>`
    }
    outputSite.innerHTML = temp ;
}

// deleteSite
function deleteSite(index){
    siteList.splice(index , 1);
    display()
    localStorage.setItem("sites" , JSON.stringify(siteList))
}

// validateForm

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (err) {
        return false;
    }
}

siteURL.addEventListener("keyup", function(){
    var x = isValidUrl(siteURL.value)
    if(x == false) {
        iVaildUrl.classList.replace("d-none","d-block")
        siteURL.style.boxShadow = "0px 0px 0  0.25rem  rgba(255, 0, 0, 0.3)"
    }
    else{
        iVaildUrl.classList.replace("d-block","d-none")
        siteURL.style.boxShadow = "0px 0px 0  0.25rem  rgb(181, 172, 73 , 0.3)"
    }
})

siteName.addEventListener("keyup",function(){
    if(siteName.value.length<3){
        iVaildName.classList.replace("d-none","d-block")
        siteName.style.boxShadow = "0px 0px 0  0.25rem  rgba(255, 0, 0, 0.3)"
    }
    else{
        iVaildName.classList.replace("d-block","d-none")
        siteName.style.boxShadow = "0px 0px 0  0.25rem  rgb(181, 172, 73 , 0.3)"
    }
})

function validateForm(event) {
    if (siteName.value.length < 3 || siteURL.value == "" || isValidUrl(siteURL.value) == false) {
        alertDiv.classList.replace("d-none","d-flex")
        event.preventDefault();
    }

}
// closeElement

closeElement.addEventListener("click", closeFuc)

function closeFuc(){
    alertDiv.classList.replace("d-flex","d-none")
}

document.addEventListener("click",function(event){

    if(event.target == alertDiv){
        closeFuc()
    }
})


document.addEventListener("keyup",function(event){
    console.log(event.key)
    if(event.key == "Escape"){
        closeFuc()
    }
})