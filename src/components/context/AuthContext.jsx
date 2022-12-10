/* eslint-disable no-unused-vars */
import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../Firebase";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";
import { async } from "@firebase/util";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  const createUser = (email, password) => {
    if (!email || !password) return;

    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateDisplayName = (displayName) => {
    return updateProfile(auth.currentUser, { displayName: displayName }).catch(
      (err) => console.log(err)
    );
  };

  const createUserDocument = async (displayName, email) => {
    if (!auth.currentUser) return;

    const userDocRef = doc(db, "users", auth.currentUser.uid);

    const userSnapshot = await getDoc(userDocRef);

    //if user data does not exists -> create/set the document with data from userAuth in my collection
    if (!userSnapshot.exists()) {
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
        });
      } catch (error) {
        console.log("error creating the user", error.message);
      }
    }
    //if user data exists -> return userDocRef
    return userDocRef;
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("User", currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        googleSignIn,
        logOut,
        user,
        createUser,
        signIn,
        updateDisplayName,
        createUserDocument,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
