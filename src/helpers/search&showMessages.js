import {get} from '../script/api.js';
const BASE_URL = "http://localhost:3000"
const userLogged = JSON.parse(localStorage.getItem('user'));

window.filterMsg = async function filterMsg() {
    const messageArray = await get(`${BASE_URL}/mensajes`);
    const searchInput = document.querySelector('#search-messages-input');
    let html = "";
    messageArray.forEach( item => {
        if(item.usuarioId == userLogged[0].id){
            if(searchInput.value=="") html = ""; 
            else if (item.contenido.toLocaleLowerCase().includes(searchInput.value)){
                html += `
                <div class="message-search message sent my-3">
                    <span class="timestamp">${item.fecha}</span>
                    <div class="message-content">
                        <p>${item.contenido}</p>
                    </div>
                </div>
                `;
            }
        }
    })
    const container = document.getElementsByClassName("offcanvas-body__foundMgs");
    container[0].innerHTML = html;
}