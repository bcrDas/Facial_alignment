// Type in browser : http://localhost:3000/

const express = require('express')
const spawn = require('child_process').spawn;
const app = express()
const port = 3000

app.get('/', (req, res) => {
 var dataToSend;
 // spawn new child process to call the python script
 const python = spawn('python', ['quality_image_facial_alignment.py','--shape_predictor','./models/shape_predictor_5_face_landmarks.dat','--position_left_eye_X','0.3','--position_left_eye_Y','0.47','--image_width','600','--image_height','780','--input_path','images/*.*','--aligned_faces_path','aligned_faces/','--undetected_faces_path', 'face_not_detected/']);
 // collect data from script
 python.stdout.on('data', function (data) {
  console.log('Pipe data from python script ...');
  dataToSend = data.toString();
 });
 // in close event we are sure that stream from child process is closed
 python.on('close', (code) => {
 console.log(`child process close all stdio with code ${code}`);
 // send data to browser
 res.send(dataToSend)
 });
 
})
app.listen(port, () => console.log(`Example app listening on port 
${port}!`))
