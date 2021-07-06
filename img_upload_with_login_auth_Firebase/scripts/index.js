
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
  if (user) {
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
        <div>Logged in as ${user.email}</div>
      `;
      accountDetails.innerHTML = html;
    });
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    accountDetails.innerHTML = '';
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};


const uploadImages = (data) => {
  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const image_upload_info = doc.data();
      const li = `
        <li>
          <br>
          <div class="collapsible-header green lighten-0"> Uploader name :     ${image_upload_info.name} </div>
          <div class="collapsible-body green lighten-1">Upload location :     ${image_upload_info.location} </div>
        </li>
      `;
      html += li;
    });
    guideList.innerHTML = '<h1>Upload History</h1>' + html
  } else {
    guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
  }
};


document.addEventListener('DOMContentLoaded', function() {
  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);
  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
});