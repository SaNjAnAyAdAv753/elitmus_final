const contactUs=document.getElementById('Contact_Form');
function redirectFunction(){
window.location.href = "camera.html";
}
contactUs.addEventListener('submit', function (e) {
//window.location.href = 'camera.html';
e.preventDefault();
const formData = new FormData(this);
console.log(formData);
const plainFormData = Object.fromEntries(formData.entries());
const jsondata = JSON.stringify(plainFormData);
localStorage.setItem("user_id",plainFormData.testPassword);
// console.log(plainFormData.testPassword);

const response = fetch(
'http://localhost:3000/main',
{
 method: 'post',
 headers: {
  'Content-Type': 'application/json',
  Accept: 'application/json',
},
body: jsondata,
}
)
.then((response) => {
console.log(response);
if (response.status === 200) {
console.log("data saved successfully in server")
};

console.log('Success');
//   dialogbox.classList.add('hidddden')
//   goBackBtn.classList.remove('hidddden')
redirectFunction()
})
.catch((err) => {
console.log('error in storing or fetching', err);
});
});
//document.getElementById("mainBtn");
// contactUs.addEventListener("submit", redirectFunction);
// function redirectFunction(){
// window.location.href = "camera.html";
//   }