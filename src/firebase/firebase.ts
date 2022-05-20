
import admin, {ServiceAccount} from "firebase-admin";

import serviceAccount from "../firebase/service-account-key.json";  

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
})

export default admin;