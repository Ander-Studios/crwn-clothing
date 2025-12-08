// import from firebase the '/' is what we are wanting 
// to pull which in this case is the app
// firebase has a suite of tools and firestore is one of them 
// to bring firebase down from the library we use /app
// This gets all of firebase running including all of its internal services 
//In order for us to get it we need type 'initializeApp within the curly braces.
// The initializeApp function creates an App instance for us based off on sometime of config
// This config is an object that allows us to attach this firebase app instance to that instance we have online 
// Because right now we just have the library installed 'firebase/app' but there is currently no way of us telling firebase  
// This firebase instance you are using should be referring to the one you have created inside firebase console
// Specifically that one we have created through the firebase dashboard 'crwn-clothing-db'

// In order to do this go onto the firebase dashboard, make sure you are in your project
// 'crwn-clothing-db' click 'Add App' and click '</>' Web 
// It will have for you to create a name 
// In our case since we are creating a web app we can write 'crwn-clothing-web-app'
// click register App, this will generate for us a package. 
// It will say to ensure you have done the 'npm install firebase' which in our case we have already done that 
// What we do what is this firebaseConfig and Initialize Firebase copy this part over. 
// const firebaseConfig = {
//   apiKey: "AIzaSyCU9-dErQN3dwddek_ZfiHTOzwwu0A627g",
//   authDomain: "crwn-clothing-db-7e8f4.firebaseapp.com",
//   projectId: "crwn-clothing-db-7e8f4",
//   storageBucket: "crwn-clothing-db-7e8f4.firebasestorage.app",
//   messagingSenderId: "689399528760",
//   appId: "1:689399528760:web:16ae721c51ec624f2095cd"
// };
// Initialize Firebase
// const app = initializeApp(firebaseConfig);

import { initializeApp } from 'firebase/app'; 
import { 
    getAuth,
    signInWithRedirect, //here it allows us to signin via redirect
    signInWithPopup, //here it allows us to signin via a Popup window 
    GoogleAuthProvider, 
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc, 
  setDoc
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCU9-dErQN3dwddek_ZfiHTOzwwu0A627g",
  authDomain: "crwn-clothing-db-7e8f4.firebaseapp.com",
  projectId: "crwn-clothing-db-7e8f4", //unique identifier referring to our project 
  storageBucket: "crwn-clothing-db-7e8f4.firebasestorage.app",
  messagingSenderId: "689399528760",
  appId: "1:689399528760:web:16ae721c51ec624f2095cd"
};

const firebaseApp = initializeApp(firebaseConfig);
// You can see here we are passing the initializeApp function by using initializeApp 
// 'firebaseApp' is an SDK where we are use specific functionalities (initializaApp),
//  withing firebaseConfig so that we can do our CRUD requests.

// initialize App takes the specific config that we have made you can see
// it by withing the firebaseConfig. 

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Go back to the google firebase console on your browser -> Go to Authentication
// Click get Started, this will ask you to add your first sign-in method 
// Click Google as we want to have the ability to sign in with Google  at the sign in method 
// Click enable and use an email account for Google that you want the email that forwards
// all the support emails in terms of authentication
// Now you should be able to access now that it is enabled 

export const db = getFirestore() // Here we are instantiating our Firestore database. 

// In order to use it we are going to create a method
export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc (userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());
    
    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName, 
          email, 
          createdAt
        });
        
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
    // Check if user data exists

    //  Check if user data does not exists.  
    // create/set the document with the data from userAuth in my collection

  return userDocRef;
    //return userDocRef 
};