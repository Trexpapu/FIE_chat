var ListMessages = []
const API = "http://127.0.0.1:8000/chatbot"
InitialMessage = false
async function GetInformation() {
    // Realizar la solicitud fetch de manera asíncrona
    await fetch(API)
        .then(response => {
            if (response.ok) {
                // Si la respuesta es exitosa, convertir la respuesta a JSON
                return response.json();
            } else {
                throw new Error('Error al obtener la información de la API.');
            }
        })
        .then(data => {
            
            AddResponseToArea(data.response);
        })
        .catch(error => {
            
            AddResponseToArea("Hubo un problema, inténtelo de nuevo más tarde");
        });
}

window.onload = async function(){
    await GetInformation();
    InitialMessage = true
}


function SendMessage(){
    let InputMessage = document.getElementById("message");
    let message = InputMessage.value;
    if (InitialMessage){
        if(message != ""){
            ListMessages.push(message);
            // Crear un nuevo elemento div para el mensaje
            var messageDiv = document.createElement("div");
            messageDiv.textContent = message;
            messageDiv.classList.add("answer");
        
            // Agregar el nuevo elemento al contenedor de mensajes
            var messageArea = document.querySelector(".messageArea");
            messageArea.appendChild(messageDiv);
        
            // Desplazar el área de mensajes hacia abajo para mostrar el nuevo mensaje
           
            ResponseMessage(message)
    
        }

    }
    
    InputMessage.value = "";
}


async function ResponseMessage(message){
    // Configurar el objeto de opciones para la solicitud POST
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Especificar el tipo de contenido JSON
        },
        body: JSON.stringify({ "message": message }) // Convertir el objeto a JSON
    };

    // Realizar la solicitud fetch a la URL deseada
    await fetch(API, options)
    .then(response => {
        if (response.ok) {
            // Convertir la respuesta JSON en un objeto JavaScript
            return response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .then(data => {
        // Aquí puedes trabajar con los datos recibidos del servidor
        AddResponseToArea(data.response);
    })
    .catch(error => {
        AddResponseToArea("Hubo un problema, inténtelo de nuevo más tarde");
    });
}

function AddResponseToArea(message) {
    // Crear un nuevo elemento div para el mensaje
    var messageDiv = document.createElement("div");
    messageDiv.textContent = message;
    messageDiv.classList.add("response");
    ListMessages.push(message);

    // Agregar el nuevo elemento al contenedor de mensajes
    var messageArea = document.querySelector(".messageArea");
    messageArea.appendChild(messageDiv);

    // Desplazar el área de mensajes hacia abajo para mostrar el nuevo mensaje
    messageArea.scrollTop = messageArea.scrollHeight;
}




//escuchando el enter
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      // Aquí puedes ejecutar la acción que deseas cuando se presiona Enter
      SendMessage();
    }
  });