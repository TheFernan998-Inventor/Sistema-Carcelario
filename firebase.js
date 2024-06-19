import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js"
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot,updateDoc,getDocs,query,where } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyDNXRZVkOfefJYA9TBPIL1hzEhlzg5LPhY",
    authDomain: "prueba-3-bb886.firebaseapp.com",
    projectId: "prueba-3-bb886",
    storageBucket: "prueba-3-bb886.appspot.com",
    messagingSenderId: "781464948872",
    appId: "1:781464948872:web:7fe2f35b2e38c2c4720f3d"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const save = async (preso) => {
    const querySnapshot = await getDocs(query(collection(db, 'Presos'), where('run', '==', preso.run)));
    if (!querySnapshot.empty) {
            ('El Rut ingresado ya ha sido utilizado por otro preso');
    }

    return addDoc(collection(db, 'Presos'), preso)
        .then(() => {
            Swal.fire({
                title: 'Guardado',
                text: 'El preso ha sido guardado exitosamente',
                icon: 'success'
            });
        })
        .catch((error) => {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al guardar el preso: ' + error,
                icon: 'error'
            });
        });
}



export const getData = (data) => {
    onSnapshot(collection(db, 'Presos'), data)
}

export const eliminar = (id) =>{
    deleteDoc(doc(db,'Presos',id))
}

export const obtener = (id) => getDoc(doc(db, 'Presos', id))


export const update = (id, preso) => {
    updateDoc(doc(db, 'Presos', id), preso)
}

