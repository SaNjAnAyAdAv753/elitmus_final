# elitmus_final# elitmus
#Set-Up
###1.Download backend
###2.Run npm
###3.npm start to start the server
###For frontend
###4.Download and open all frontend files
###5.For frontend manifest.json is used to create the chrome extension
###6.Go to google chrome ->more tools->extensions->switch on developers mode->load unpack the frontend folder
###your extension is ready to run
##Frontend
###The frontend has been designed using html, css, javascript and json. Main file is manifest.json which is used to create a chrome extension. manifest.jason is linked with popup.html which is used take input from the user through a form.
###popup.html has a javascript file and css file to handle backend data and to style the page.
###popup.html is then linked to camera.html which opens when on submit.camera.html requires camera access and audio access. It also previews the users video and allows to click and preview the snapshot
###Then click start test. This will start the timer and images will be captured automatically in every 5secs(configurable) and are sent to the firebase storage via backend.
##Backend
###The backend is made using node.js.
##Cloud
###For cloud firebase is used. The enteries from the frontend form are stored in cloud firestore and images are stored in storage.
##Admin Dashboard
###Admin dashboard has been created to display all the data stored in the cloud.
