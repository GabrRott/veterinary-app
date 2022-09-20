const petInput = document.querySelector('#mascota');
const ownerInput = document.querySelector('#propietario');
const phoneInput = document.querySelector('#telefono');
const dateInput = document.querySelector('#fecha');
const hourInput = document.querySelector('#hora');
const sinthomsInput = document.querySelector('#sintomas');


const form = document.querySelector('#nueva-cita');


const datesContainer =  document.querySelector('#citas');

//Event registers
eventListeners();
function eventListeners(){
    petInput.addEventListener('input', dateData);
    ownerInput.addEventListener('input', dateData);
    phoneInput.addEventListener('input', dateData);
    dateInput.addEventListener('input', dateData);
    dateInput.addEventListener('input', dateData);
    hourInput.addEventListener('input', dateData);
    sinthomsInput.addEventListener('input', dateData);

}
// date object
const dateObj = {
    pet:'',
    owner: '',
    phone: '',
    date: '',
    hour: '',
    sinthoms: '',
}

// Take the input info to create a date object
function dateData(e){
    dateObj[e.target.name] = e.target.value;
    console.log(dateObj);
}