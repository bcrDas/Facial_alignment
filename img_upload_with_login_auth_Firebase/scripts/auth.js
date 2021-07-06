var uploadPath = "";
var userID = "";

auth.onAuthStateChanged(user => {
  if (user) {
    userID = user.uid;
    db.collection('image_upload_info').onSnapshot(snapshot => {
      uploadImages(snapshot.docs);
      setupUI(user);
    }, err => console.log(err.message));

  } else {
    setupUI();
    uploadImages([]);
  }
});

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
  }).then(() => {
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});

const uploadForm = document.querySelector('#upload-form');
uploadForm.addEventListener('submit', (e) => {
  e.preventDefault();
  uploadPath = uploadForm.location.value;
  db.collection('image_upload_info').add({
    name: uploadForm.name.value,
    UserID: userID,
    location: uploadForm.location.value
  }).then(() => {
    const modal = document.querySelector('#modal-upload');
  }).catch(err => {
    console.log(err.message);
  });
});

const upForm = document.querySelector('#up-form');
fileButton.addEventListener('change', function uploadImagej(e) {


      for (let i = 0; i < e.target.files.length; i++){
        let imageFile = e.target.files[i];
        let storageRef = firebase.storage().ref("Image_curation_part/" + uploadPath + imageFile.name);
        let task = storageRef.put(imageFile);
        task.on('state_changed', function progress(snapshot){
          let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + percentage + "% done.");
          switch(snapshot.state){
            case firebase.storage.TaskState.PAUSED :
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RESUMED :
              console.log("Upload is resumed");
              break;
            case firebase.storage.TaskState.RUNNING :
              //console.log("Upload is running");
              break;
          }
        });  
      }
    const modal = document.querySelector('#modal-upload');
    M.Modal.getInstance(modal).close();
    uploadForm.reset();
    upForm.reset();
});





