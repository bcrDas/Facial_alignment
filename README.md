# PonderImageCuration

PonderImageCuration is an image processing pipeline which can take images as input and give the aligned faces as output along with put the images into a seperate folder in which face was undetected.

## Table of contents
* [General info](#general-info)
* [Dependencies](#dependencies)
* [Installation](#installation)
* [Model](#model)
* [Script_execution](#script_execution)
* [Contributing](#contributing)
* [License](#license)


## General info
### `Folder details`:
* `facial_alignment_python` -> Only some image folder inside,nothing else.
* `quality_image_emotion_detection_facial_alignment` -> Facial alignment along with image quality control and emotion                                                               detection. 
* `img_upload_with_login_auth_Firebase` -> Image upload(from local to firebase) portal with authentication.
* `images` -> Input image folder.
* `aligned_faces` -> Output image folder for aligned faces.
* `face_not_detected` -> Output image folder for undetected faces.


### `Brief introduction regarding the prameters/arguments`:
The following functions are supported:
* `predictor` : Download and use the appropriate facial landmark predictor model.

* `desiredLeftEye` : Coordinate of the left eye's position on the output aligned facial images.This controls how much face will be visible after the alignment process,menas used for zoomed in and out of the faces.
General range - 0-1,(<20% -> Zoomed in faces, >20% -> Zoomed out faces).

* `desiredFaceWidth` : Image width of the output aligned faces in pixels.

* `desiredFaceHeight` : Image height of the output aligned faces in pixels.

* `input_path` : You can select the path from which you are going to take the input images.

* `aligned_faces_path` : You can select the path in which you are going to save the aligned faces(output).

* `undetected_faces_path` : You can select the path in which you are going to save the images in which face was not detected(output).

## Dependencies

```bash
Python 3.5.2
OpenCV 4.0.0
Dlib 19.19.0
NodeJS v12.16.2 + NPM 6.14.4
```

## Installation
Before using the code must install the following packge - 

```bash
$ pip install imutils
```

## Model

* You can download the facial landmark model from the link below(choose which one you want to use,here I used 'shape_predictor_5_face_landmarks.dat') -

   https://drive.google.com/open?id=1fEjqYSoL7XTlhvyBMqG8w3vZtT5x7d1q
 
 * You can download the emotion detection model from the link below -
 
    https://drive.google.com/open?id=1cGCmVKrCXPu1HzRLReLJHtB_she16Aa1

	
## Script_execution
#### 1. When working with python version of facial alignment(with image quality control and emotion recognition) only : - 

```bash
$ cd quality_image_emotion_detection_facial_alignment
```
For running the script for image quality control(the images must be of high quality,dimension > 800*800,othrewise the algotithm will reject it automatically) -
```bash
$ python quality_image_facial_alignment.py --shape_predictor ./models/shape_predictor_5_face_landmarks.dat 
--position_left_eye_X 0.3 --position_left_eye_Y 0.47 --image_width 600 --image_height 780 --input_path 'images/*.*' 
--aligned_faces_path 'aligned_faces/' --undetected_faces_path 'face_not_detected/'
```
For running the script for image quality control through Node -
```bash
$ npm install
$ node pyrun.js
```
If you want to tweak the command line parameters when running the Python code through NodeJS then edit the arguments as per your convenient in the "pyrun.js" - 
```Node
const python = spawn('python', ['quality_image_facial_alignment.py','--shape_predictor','./models/shape_predictor_5_face_landmarks.dat',
'--position_left_eye_X','0.3','--position_left_eye_Y','0.47','--image_width','600','--image_height','780',
'--input_path','images/*.*','--aligned_faces_path','aligned_faces/','--undetected_faces_path', 'face_not_detected/']);
```
For running the script for image quality control along with emotion detection(experimental only) -
```bash
$ python quality_image_emotion_detection_facial_alignment.py --shape_predictor ./models/shape_predictor_5_face_landmarks.dat --position_left_eye_X 0.3 --position_left_eye_Y 0.47 --image_width 600 --image_height 780 --input_path 'images/*.*' 
--aligned_faces_path 'aligned_faces/' --undetected_faces_path 'face_not_detected/'
```


#### 2. Working with image upload(from local to firebase) portal with authentication -
      Just open the `index.html` through any browser,then log in and upload
  
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Always make sure to update the script execution command as well.

## License
N/A

