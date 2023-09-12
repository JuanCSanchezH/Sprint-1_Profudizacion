import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import './styles/css/signIn.css'
import '../node_modules/sweetalert2/dist/sweetalert2.min.css'
import Swal from '../node_modules/sweetalert2/src/sweetalert2.js'
import {get} from "./script/api.js"

const ENDPOINT_USERS = "http://localhost:3000/users"
let realResultNum = false;
let realResultPass = false;
let userName = "";
let loggedUsers = [];


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
            const [foundNumber, foundPass] = await findNumPass(phone, password);
            console.log (await findNumPass(phone, password));
            foundNumber ? console.log("Phone Found") : console.log("Phone Not Found");
            foundPass ? console.log("Password Found") : console.log("Password Not Found");
            if(!foundNumber || !foundPass){
                Swal.fire({
                    title: 'Error!',
                    text: 'Your phone number or password is not correct!',
                    icon: 'warning',
                    confirmButtonText: 'Cool'
                })
                event.preventDefault()
            } else {
                if(foundNumber && foundPass){
                    Swal.fire({
                        title: 'Well done!',
                        text: `Hi ${userName}, Welcome to Alienverse!`,
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                    setTimeout(() => {
                        location.href="/"
                    }, 3000);
                }
            }
        }
    }
}
    
async function findNumPass(phone, password){
    const usersArray = await get(ENDPOINT_USERS);
    usersArray.forEach(user =>{
        const resultNum = (user.phone == phone) ?  true : false;
        const resultPass = (user.password == password) ?  true : false;
        if(resultNum) realResultNum = resultNum;
        if(resultPass) realResultPass = resultPass;
        if(resultNum&&resultPass){
            userName = user.name;       
            loggedUsers.unshift(user)
            localStorage.setItem ("user", JSON.stringify(loggedUsers))
            // event.preventDefault();
        }
        
    })
    console.log(realResultNum, realResultPass);
    return [realResultNum, realResultPass];
}

