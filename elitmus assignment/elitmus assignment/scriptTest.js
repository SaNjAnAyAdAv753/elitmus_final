const captureButton = document.querySelector('#captureButton');
const myVideo = document.querySelector('#myVideo');

let stream;
let imageCapture;

const myInterval = setInterval(myTimer, 1000);
const reqInterval = setInterval(reqTimer, 10000);

function myStopFunction() {
  clearInterval(myInterval);
  clearInterval(reqInterval);
}

async function reqTimer(){
    if (!stream) {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        myVideo.srcObject = stream;
        imageCapture = new ImageCapture(stream.getVideoTracks()[0]);
      }
      console.log("stream=>",stream)
      // captureButton.addEventListener('click', async () => {
        
          const photoBlob = await imageCapture.takePhoto();
          const photoFile = new File([photoBlob], 'photo.jpeg', { type: 'image/jpeg' });
        
        var formdata = new FormData();
        formdata.append("file", photoFile);
        var myId = localStorage.getItem('user_id')
        formdata.append("user_id", myId);
        
        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };
        
        fetch("http://localhost:3000/images", requestOptions)
          .then(response => response.text())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
          
        //   const formData = new FormData();
        //   formData.append('myFile', photoFile);
        
        //   const response = await fetch('http://localhost:3000/images', {
        //     method: 'POST',
        //     body: formData
        //   });
      //   });
}

var minute = 179
var second = 59
function myTimer() {
if(minute == 0 && second == 0){
        myStopFunction()
    }
    if(second == 0){
        second = 59
        minute-=1
    }
    second--;
  captureButton.innerHTML = `${minute} : ${second}`
  console.log(minute+":"+second);
}


