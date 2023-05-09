console.log("Hola, ha cargado correctamente");
// let fakesub = document.getElementById('sub');
// document.addEventListener('submit',function(){

//     console.log("He enviado el formulario");

// });
// fakesub.addEventListener('click',function(){
//     // Construyo el array de la petición
//     let Nick = document.getElementById('nick').value;
//     let Name = document.getElementById('name').value;
//     let Foto = document.getElementById('foto').value;
//     let Team = document.getElementById('team').value;
//     let BD = document.getElementById('BD').value;

//     let FormArray = {nick:Nick,name:Name,foto:Foto,team:Team,age:BD};

//     console.log("I fake submited: "+FormArray);
// });

function UserAction() {

    //     // Construyo el array de la petición
    let Nick = document.getElementById('nick').value;
    let Name = document.getElementById('name').value;
    let Foto = document.getElementById('foto').value;
    let Team = document.getElementById('team').value;
    let BD = document.getElementById('BD').value;

    let Formdata = JSON.stringify({nick:Nick,name:Name,foto:Foto,team:Team,age:BD});

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             alert(this.responseText);
         }
    };
    xhttp.open("POST", "http://localhost:8000/api/players/insert", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(Formdata);
}