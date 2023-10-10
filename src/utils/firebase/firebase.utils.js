import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { compileString } from "sass";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYPODgvko-kuoE7unLFNOL8ZtmIKMZ3Zw",
  authDomain: "crwn-clothing-as.firebaseapp.com",
  projectId: "crwn-clothing-as",
  storageBucket: "crwn-clothing-as.appspot.com",
  messagingSenderId: "1087039215629",
  appId: "1:1087039215629:web:b2624589daa3f03f545d44",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createAt = new Data();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
      });
    } catch (error) {
      console.log("error creating the user ", error.message);
    }
  }

  return userDocRef;

};
