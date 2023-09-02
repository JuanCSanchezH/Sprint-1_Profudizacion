import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import './styles/css/signIn.css'
import '../node_modules/sweetalert2/dist/sweetalert2.min.css'
import Swal from '../node_modules/sweetalert2/src/sweetalert2.js'
import {get} from "./script/api.js"

const ENDPOINT_USERS = "http://localhost:3000/users"
let realResultPhone = false;

window.capturarDatos = async function capturarDatos(event) {
   
    const password = document.getElementById("Password").value;
    const phone = document.getElementById("phone").value;

    if (password ==""&& phone =="") {
        Swal.fire({
            title: 'Error!',
            text: 'Please, complete the fields!',
            icon: 'warning',
            confirmButtonText: 'Cool'
        }) 
        event.preventDefault()
    } else  {
        if (password === ""&& phone != "") {
    
            Swal.fire({
                title: 'Error!',
                text: 'Please, complete the Password field!',
                icon: 'warning',
                confirmButtonText: 'Cool'
            }) 
            event.preventDefault()
        } else if(password != ""&& phone === "") {
            Swal.fire({
                title: 'Error!',
                text: 'Please, complete the phone field!!',
                icon: 'warning',
                confirmButtonText: 'Cool'
            })
            event.preventDefault()
        } else {
            event.preventDefault();
            const foundNumber = await findNumber(phone);
            foundNumber ? console.log("User found") : console.log("UserNotFound");

            if(foundNumber){

            }
        }
    }
}
    
async function findNumber(phone){
    const usersArray = await get(ENDPOINT_USERS);
    usersArray.forEach(user =>{
        const result = (user.phone == phone) ?  true : false;
        if(result) realResultPhone = result;
        // else return false;
    })
    return realResultPhone;
}