// Function to enable the save button if any input field is changed
const enableSaveButton = () => {
  const profileForm = document.getElementById('profileForm');
  const saveProfileButton = document.getElementById('saveProfileButton');
  let isFormChanged = false;

  profileForm.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
      isFormChanged = true;
      saveProfileButton.disabled = false;
    });
  });

  profileForm.addEventListener('reset', () => {
    isFormChanged = false;
    saveProfileButton.disabled = true;
  });

  profileForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (isFormChanged) {
      saveUserProfile();
    }
  });
};

//new.js
// Save additional user info to Firestore
const saveAdditionalInfo = () => {
  const user = auth.currentUser;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const mobile = document.getElementById("mobile").value;
  const profilePicture = document.getElementById("profilePicture").files[0];

if (!firstName || !lastName || !mobile) {
  alert("Fill out all required field");
  return;
}

  // Validate mobile number length
  if (mobile.length !== 10) {
    const mobile = document.getElementById('mobile');
    mobile.title = 'Mobile number must be exactly 10 digits long'
    alert("Mobile number must be exactly 10 digits long");
    return;
  }




  // Create user profile data
  const userProfile = {
    firstName,
    lastName,
    mobile,
    email: user.email,
    profilePictureURL: ""
  };

  // Optional: Handle profile picture upload if provided
  if (profilePicture) {
    const storageRef = firebaseApp.storage().ref();
    const profilePictureRef = storageRef.child(`profilePictures/${user.uid}`);

    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(profilePicture.type)) {
      alert("Profile picture must be a JPEG or PNG image", "error");
      return;
    }

    if (profilePicture.size > 5 * 1024 * 1024) { // 5 MB limit
      alert("Profile picture must be less than 5 MB", "error");
      return;
    }

    profilePictureRef.put(profilePicture).then(() => {
      return profilePictureRef.getDownloadURL();
    }).then((url) => {
      userProfile.profilePictureURL = url;
      return db.collection("users").doc(user.uid).set(userProfile);
    }).then(() => {
      alert("User profile saved!", "success");
      document.getElementById("additionalInfoModal").style.display = "none";
    }).catch((error) => {
      alert("Error saving profile: " + error.message, "error");
    });
  } else {
    // If no profile picture, just save user profile data
    db.collection("users").doc(user.uid).set(userProfile)
      .then(() => {
        alert("User profile saved!", "success");
        document.getElementById("additionalInfoModal").style.display = "none";
      })
      .catch((error) => {
        alert("Error saving profile: " + error.message, "error");
      });
  }
}



// Load user profile data
const loadUserProfile = () => {
  const user = auth.currentUser;
  if (user) {
    const userDocRef = db.collection("users").doc(user.uid);
    userDocRef.get().then((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        document.getElementById("profileFirstName").value = userData.firstName || "";
        document.getElementById("profileLastName").value = userData.lastName || "";
        document.getElementById("profileMobile").value = userData.mobile || "";
        // Set other fields as needed
        // Load profile picture if it exists
        if (userData.profilePictureURL) {
          document.getElementById("profilePictureDisplay").src = userData.profilePictureURL;
        }
        // Disable the save button initially
        document.getElementById('saveProfileButton').disabled = true;
      } else {
        alert("No profile data found!");
      }
    }).catch((error) => {
      alert("Error fetching profile: " + error.message);
    });
  }
};

// Save user profile data
const saveUserProfile = () => {
  const user = auth.currentUser;
  const firstName = document.getElementById("profileFirstName").value;
  const lastName = document.getElementById("profileLastName").value;
  const mobile = document.getElementById("profileMobile").value;
  const profilePicture = document.getElementById("profilePicture").files[0];

  if (!firstName || !lastName || !mobile) {
    alert("Fill out all required fields");
    return;
  }

  if (mobile.length !== 10) {
    alert("Mobile number must be exactly 10 digits long");
    return;
  }

  const userProfile = {
    firstName,
    lastName,
    mobile,
    email: user.email,
    profilePictureURL: ""
  };

  if (profilePicture) {
    const storageRef = firebaseApp.storage().ref();
    const profilePictureRef = storageRef.child(`profilePictures/${user.uid}`);

    // Validate file type and size
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(profilePicture.type)) {
      alert("Profile picture must be a JPEG or PNG image", "error");
      return;
    }

    if (profilePicture.size > 5 * 1024 * 1024) { // 5 MB limit
      alert("Profile picture must be less than 5 MB", "error");
      return;
    }

    profilePictureRef.put(profilePicture).then(() => {
      return profilePictureRef.getDownloadURL();
    }).then((url) => {
      userProfile.profilePictureURL = url;
      return db.collection("users").doc(user.uid).set(userProfile);
    }).then(() => {
      alert("User profile saved!", "success");
      document.getElementById("profilePopup").style.display = "none";
    }).catch((error) => {
      alert("Error saving profile: " + error.message, "error");
    });
  } else {
    // If no profile picture, just save user profile data
    db.collection("users").doc(user.uid).set(userProfile)
      .then(() => {
        alert("User profile saved!", "success");
        document.getElementById("profilePopup").style.display = "none";
      })
      .catch((error) => {
        alert("Error saving profile: " + error.message, "error");
      });
  }
};

// Event listeners
document.addEventListener("DOMContentLoaded", function() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      loadUserProfile();
    }
  });
  document.getElementById("saveProfileButton").addEventListener("click", saveUserProfile);
  
});



document.getElementById("registerForm").addEventListener("submit", signUp);
document.getElementById("saveAdditionalInfo").addEventListener("click", saveAdditionalInfo);
document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("additionalInfoModal").style.display = "none";
});