// Paso 1: Pega aquí tu objeto de configuración de Firebase (esto no cambia)
const firebaseConfig = {
  apiKey: "AIzaSyCaL25qaCVbG_oUTYu1_JmoYHn83wtf1h8",
  authDomain: "alarma-egin360.firebaseapp.com",
  databaseURL: "https://alarma-egin360-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "alarma-egin360",
  storageBucket: "alarma-egin360.firebasestorage.app",
  messagingSenderId: "1043922327331",
  appId: "1:1043922327331:web:ba55ad4ade190db0091e96"
};

// Paso 2: Inicializar Firebase (la sintaxis cambia ligeramente)
// Ahora todo cuelga del objeto global "firebase"
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Paso 3: Obtener referencias a los elementos HTML (esto no cambia)
const statusDisplay = document.getElementById('status-display');
const alarmToggle = document.getElementById('alarm-toggle');

// Paso 4: Escuchar cambios en la base de datos (la sintaxis cambia ligeramente)
const alarmStatusRef = database.ref('alarm/status');
alarmStatusRef.on('value', (snapshot) => {
    const status = snapshot.val();
    console.log("Nuevo estado desde Firebase:", status);

    alarmToggle.disabled = false;

    if (status === 1) {
        statusDisplay.textContent = 'Alarma Activada';
        statusDisplay.className = 'status-active';
        alarmToggle.checked = true;
    } else {
        statusDisplay.textContent = 'Alarma Desactivada';
        statusDisplay.className = 'status-inactive';
        alarmToggle.checked = false;
    }
});

// Paso 5: Enviar cambios a Firebase (la sintaxis cambia ligeramente)
alarmToggle.addEventListener('change', (event) => {
    const isChecked = event.target.checked;
    const newStatus = isChecked ? 1 : 0;
    
    console.log("Enviando nuevo estado a Firebase:", newStatus);
    alarmStatusRef.set(newStatus);
});