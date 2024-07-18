//auth.js
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDPGfGTg4-D4YHDHYmDcuKJKWptXI8CJ3E",
  authDomain: "webvishal-66256.firebaseapp.com",
  databaseURL: "https://webvishal-66256-default-rtdb.firebaseio.com",
  projectId: "webvishal-66256",
  storageBucket: "webvishal-66256.appspot.com",
  messagingSenderId: "65434992608",
  appId: "1:65434992608:web:2686b0dea20db0ee80b585",
  measurementId: "G-KFJYCNJQ2W"
});
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();



const signUp = (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
          const user = userCredential.user;
          document.getElementById("additionalInfoModal").style.display = "block";
          alert("User registered: " + user.email);
      })
      .catch((error) => {
          const errorMessage = error.message;
          alert("Registration failed: " + errorMessage);
      });
      
}


const signIn = (event) => {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
          const user = userCredential.user;
          alert("Signed in successfully: " + user.email);
          window.location.href = "index.html";
      })
      .catch((error) => {
          const errorMessage = error.message;
          alert("Login failed: " + errorMessage);
      });
}

auth.onAuthStateChanged(user => {
  if (user) {
      updateCartUI();
  } else {
      // Clear cart UI when the user signs out
      const cartList = document.getElementById('cart-items');
      const cartTotalElement = document.getElementById('cart-total');
      const proceedToBuyButton = document.getElementById('proceed-to-buy-button');
      
      cartList.innerHTML = '';
      cartTotalElement.textContent = '₹0.00';
      proceedToBuyButton.style.display = 'none';
  }
});

// Handle authentication state changes
auth.onAuthStateChanged((user) => {
  const signInButton = document.getElementById('signInButton');
  const welcomeMessage = document.getElementById('welcomeMessage');
  if (user) {
      signInButton.textContent = 'Sign Out';
      welcomeMessage.textContent = `Welcome ${user.email}`;
      signInButton.onclick = signOut;
      document.getElementById("profileButton").style.display = "block";
  } else {
      signInButton.textContent = 'Sign Up / Sign In';
      document.getElementById("profileButton").style.display = "none";
      welcomeMessage.textContent = 'Welcome to ShopMe';
      signInButton.onclick = redirectToAuthPage;
  }
});

// Functions to open and close the profile popup
const openProfilePopup = () => {
  document.getElementById("profilePopup").style.display = "block";
  loadUserProfile(); // Load user profile data into the form
  enableSaveButton(); // Enable the save button logi
};

const closeProfilePopup = () => {
  document.getElementById("profilePopup").style.display = "none";
};

function signOut() {
  auth.signOut().then(() => {
      alert('Signed out successfully!');
  }).catch((error) => {
      alert('Error signing out: ' + error.message);
  });
}




const togglePasswordVisibility = (checkbox, passwordField) => {
  const passwordInput = document.getElementById(passwordField);
  passwordInput.type = checkbox.checked ? "text" : "password";
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("registerForm").addEventListener("submit", signUp);
  document.getElementById("loginForm").addEventListener("submit", signIn);
  document.getElementById("showPassword").addEventListener("change", function() {
    togglePasswordVisibility(this, "password");
  });
  document.getElementById("showLoginPassword").addEventListener("change", function() {
    togglePasswordVisibility(this, "loginPassword");
  });
});




