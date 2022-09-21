const petInput = document.querySelector('#mascota');
const ownerInput = document.querySelector('#propietario');
const phoneInput = document.querySelector('#telefono');
const dateInput = document.querySelector('#fecha');
const hourInput = document.querySelector('#hora');
const sinthomsInput = document.querySelector('#sintomas');

//UI
const form = document.querySelector('#nueva-cita');
const datesContainer =  document.querySelector('#citas');

//CLASSES
class Dates{
    constructor(){
        this.dates=[];
    }
}

class UI{
    printAlert(message, type){
        //create el div
        const divMessage = document.createElement('div');
        divMessage.classList.add('text-center', 'alert', 'd-block', 'col-12');

        //Add clase though type error
        if(type){
            divMessage.classList.add('alert-danger');
        } else{
            divMessage.classList.add('alert-success');
        }

        //Error message
        divMessage.textContent=message;


        //adding to the DOM
        document.querySelector('#contenido').insertBefore(divMessage, document.querySelector('.agregar-cita'));

        
        //Remove the alert
        setTimeout(() => {
            divMessage.remove();
        }, 5000);
    }

}

const ui = new UI();
const datesAdmin = new Date();
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

    form.addEventListener('submit', newDate);

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

function newDate(e){
    e.preventDefault();

    //take the data from de date obj
    const {pet,owner,phone,date,hour,sinthoms} = dateObj;

    //validate
    if(pet===''||owner ===''||phone ===''||date===''||hour===''||sinthoms===''){
        ui.printAlert('todos los campos son obligatorios', 'error');
        return;
    }
}


