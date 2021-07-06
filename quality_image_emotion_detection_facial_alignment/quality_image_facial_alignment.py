### Working well for all(tuned parameters) : python quality_image_facial_alignment.py --shape_predictor ./models/shape_predictor_5_face_landmarks.dat --position_left_eye_X 0.3 --position_left_eye_Y 0.47 --image_width 600 --image_height 780 --input_path 'images/*.*' --aligned_faces_path 'aligned_faces/' --undetected_faces_path 'face_not_detected/'

# Command -> python quality_image_facial_alignment.py --shape_predictor ./models/shape_predictor_5_face_landmarks.dat --position_left_eye_X 0.3 --position_left_eye_Y 0.3 --image_width 300 --image_height 300 --input_path 'images/*.*' --aligned_faces_path 'aligned_faces/' --undetected_faces_path 'face_not_detected/'
# Author : Subhajit Das.
import cv2
from imutils.face_utils import FaceAligner
from imutils.face_utils import rect_to_bb
import argparse
import imutils
import dlib
import glob
import re

ap = argparse.ArgumentParser()
ap.add_argument("-p", "--shape_predictor", required=True)
ap.add_argument("-x", "--position_left_eye_X", required=True)
ap.add_argument("-y", "--position_left_eye_Y", required=True)
ap.add_argument("-iw", "--image_width", required=True)
ap.add_argument("-ih", "--image_height", required=True)
ap.add_argument("-i", "--input_path", required=True)
ap.add_argument("-o", "--aligned_faces_path", required=True)
ap.add_argument("-u", "--undetected_faces_path", required=True)
args = vars(ap.parse_args())

# initialize dlib's face detector (HOG-based) and then create the facial landmark predictor and the face aligner
detector = dlib.get_frontal_face_detector()
predictor = dlib.shape_predictor(args["shape_predictor"])


desiredLeftEye_x = args["position_left_eye_X"]
desiredLeftEye_y = args["position_left_eye_Y"]
desiredLeftEye = (float(desiredLeftEye_x), float(desiredLeftEye_y))
desiredFaceWidth = args["image_width"]
desiredFaceHeight = args["image_height"]

input_path = args["input_path"]
aligned_faces = args["aligned_faces_path"]
undetected_faces = args["undetected_faces_path"]

# initialize the face aligner
f_align = FaceAligner(predictor,desiredLeftEye,int(desiredFaceWidth),int(desiredFaceHeight))

#Going through each of the images present in the folder
for file in glob.glob(input_path):
    image = cv2.imread(file)

    # get dimensions of image
    dimensions = image.shape
    # height, width of image
    Height = image.shape[0]
    Width = image.shape[1]

    if(Height >= 800 and Width >= 800):
        image = imutils.resize(image, width=800,height =800)

        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        # Detect faces in the grayscale image
        rects = detector(gray, 1)

        if (len(rects)== 0):
            print("\n \nFace was not detected!!!"+"\nImage : " + str(file) )
            # retaining the same name as the original image
            m = str(re.sub(r'.*/', '/', file))
            l = list(m) # convert to list
            p = l.index("/") # find position of the letter "a"
            del(l[p]) # delete it
            f_1 = "".join(l) # convert back to string
            cv2.imwrite(undetected_faces + f_1,image)
        else:
            print("\n \nFace was detected!!!")
            print("\n"+str(len(rects))+" face/faces was/were detected.")

            # For the images in which multiple faces were detected
            i = 0
            # loop over the face detections
            for rect in rects:
                # extract the ROI of the original face and then align the face using facial landmarks
                (x, y, w, h) = rect_to_bb(rect)
                
                #original
                face_aligned = f_align.align(image, gray, rect)
                face_aligned_1 = face_aligned

                gray1 = cv2.cvtColor(face_aligned_1, cv2.COLOR_BGR2GRAY)

             
                # For the images in which single face was detected
                if(len(rects) == 1):
                    m = str(re.sub(r'.*/', '/', file))
                    l = list(m) # convert to list
                    p = l.index("/") # find position of the letter "a"
                    del(l[p]) # delete it
                    f_2 = "".join(l) # convert back to string
                    cv2.imwrite(aligned_faces + f_2, face_aligned)
                # For the images in which multiple faces were detected    
                else:
                    m = str(re.sub(r'.*/', '/', file))
                    l = list(m) # convert to list
                    p = l.index("/") # find position of the letter "a"
                    del(l[p]) # delete it
                    f_2 = "".join(l) # convert back to string
                    cv2.imwrite(aligned_faces + str(i)+"_"+f_2, face_aligned)
                i += 1

    else:
        print('\n\nResolution is not upto the mark!!!\nFace alignment operation aborted.')
