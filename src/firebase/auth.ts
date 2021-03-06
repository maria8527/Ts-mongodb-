import confing from "./confing"
import { FirebaseApp } from "firebase/app"; 
import {
    getAuth, createUserWithEmailAndPassword
    ,signInWithEmailAndPassword
} from "firebase/auth";

const auth = getAuth(confing.app as FirebaseApp);

const createUser = async (email:string, password:string) => {
    const response = await createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;
            return { error: false, data: user }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return { error: true, data: error }
        });

    return response;
}

const logIn = async (email:string, password:string) => {
    const result = await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return { error: false, data: user }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            return { error: true, data: error }
        });
    return result;
}

export default { createUser, logIn }; 