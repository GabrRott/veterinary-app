const petInput = document.querySelector('#mascota');
const ownerInput = document.querySelector('#propietario');
const phoneInput = document.querySelector('#telefono');
const dateInput = document.querySelector('#fecha');
const hourInput = document.querySelector('#hora');
const sinthomsInput = document.querySelector('#sintomas');

//UI
const form = document.querySelector('#nueva-cita');
const datesContainer =  document.querySelector('#citas');

let editing;

//CLASSES
class Dates{
    constructor(){
        this.dates=[];
    }
    addDate(date){
        this.dates=[...this.dates, date];
        console.log(this.dates);
    }

    eliminateDate(id){
        this.dates = this.dates.filter(date=>date.id!==id);
    }

    editDate(dateActualized){
        this.dates = this.dates.map(date => date.id===dateActualized.id? dateActualized : date);

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

    printDates({dates}){

        this.cleanHTML();

        dates.forEach(fullDate => {
        const {pet,owner,phone,date,hour,sinthoms,id} = fullDate;
        const divDate = document.createElement('div');
        divDate.classList.add('cita', 'p-3');
        divDate.dataset.id = id;


        //date elements scripting
        const petParagraph = document.createElement('h2');
        petParagraph.classList.add('card-title', 'font-weight-bolder');
        petParagraph.textContent= pet;

        const ownerParagraph = document.createElement('p');
        ownerParagraph.innerHTML = `
        <span class="font-weight-bolder">Propietario:</span> ${owner}
        `;

        const phoneParagraph = document.createElement('p');
        phoneParagraph.innerHTML = `
        <span class="font-weight-bolder">Tel:</span> ${phone}
        `;

        const dateParagraph = document.createElement('p');
        dateParagraph.innerHTML = `
        <span class="font-weight-bolder">Fecha:</span> ${date}
        `;
        const hourParagraph = document.createElement('p');
        hourParagraph.innerHTML = `
        <span class="font-weight-bolder">Hora:</span> ${hour}
        `;
        const sinthomsParagraph = document.createElement('p');
        sinthomsParagraph.innerHTML = `
        <span class="font-weight-bolder">Síntomas:</span> ${sinthoms}
        `;

        //Create a btn to eliminate dates
        const eliminateDate = document.createElement('button');
        eliminateDate.classList.add('btn', 'btn-danger', 'mr-2');
        eliminateDate.innerHTML='Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
            eliminateDate.onclick = () => eraseDate(id);

        //add a new edditing btn
        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-info');
        editBtn.innerHTML= 'Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>';
        editBtn.onclick=() => chargeEdition(fullDate);


        //adding paragraphs to divDate
        divDate.appendChild(petParagraph);
        divDate.appendChild(ownerParagraph);
        divDate.appendChild(phoneParagraph);
        divDate.appendChild(dateParagraph);
        divDate.appendChild(hourParagraph);
        divDate.appendChild(sinthomsParagraph); 
        divDate.appendChild(eliminateDate);
        divDate.appendChild(editBtn);


        //adding dates on screen
        datesContainer.appendChild(divDate);
        });

    }

    cleanHTML(){
        while(datesContainer.firstChild){
            datesContainer.removeChild(datesContainer.firstChild);
        }
    }

}

const ui = new UI();
const datesAdmin = new Dates();
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

    //editing a previus date info
    if (editing){
        ui.printAlert('Editado correctamente');

        //date obj info to editing mode
        datesAdmin.editDate({...dateObj});


        //Return Btn to "new date" mode
        form.querySelector('button[type="submit"]').textContent = 'Crear cita';

        

        //Remove editing mode
        editing = false;

        


    } else {console.log('New date mode') 
        //id generator
        dateObj.id= Date.now();

        //create a new date
        datesAdmin.addDate({...dateObj});

        //Added correctly message
        ui.printAlert('Se agregó correctamente');
    }





    //reboot obj to validate
    rebootObj();
    

    //reboot form   
    form.reset();

    // Show the dates on screen (HTML)
    ui.printDates(datesAdmin);
}

function rebootObj(){
    dateObj.pet='';
    dateObj.owner= '';
    dateObj.phone= '';
    dateObj.date= '';
    dateObj.hour= '';
    dateObj.sinthoms= '';
}

function eraseDate(id){
    //eliminate the date
    datesAdmin.eliminateDate(id);

    //show a message
    ui.printAlert('La cita se eliminó correctamente');

    //refresh de dates list
    ui.printDates(datesAdmin);



}


//chargin the date and edittion mode
function chargeEdition(fullDate){
    const {pet,owner,phone,date,hour,sinthoms,id} = fullDate;
    petInput.value =pet;
    ownerInput.value = owner;
    phoneInput.value = phone;
    dateInput.value = date;
    hourInput.value = hour;
    sinthomsInput.value = sinthoms;

    //fill the obj inputs
    dateObj.pet=pet;
    dateObj.owner = owner;
    dateObj.phone = phone;
    dateObj.date = date;
    dateObj.hour= hour;
    dateObj.sinthoms = sinthoms;
    dateObj.id = id;
    



    //change text button
    form.querySelector('button[type="submit"]').textContent = 'Guardar Cambios'; 
    editing = true;
}