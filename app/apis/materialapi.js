//const url_base = 'http://localhost/CrServices/api/usr/';
const url_base = 'http://35.222.84.162/CrServices/api/mtr/';



export async function listmaterial() {

    let myurl = url_base + 'mtrlist.php';
    try {
        return await fetch(myurl, {
                method: 'POST', // or 'PUT'
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then((responseJson) => {return responseJson;})
            .catch((error) => {return 'error';});
    } catch (error) {return 'error';}

}




export async function editmaterial(id, tipo) {

    let myurl = url_base + 'mtredit.php'
    let editmat = {
        mtr: {
            id: id,
            tipo: tipo
        }
    };

    try {
        return await fetch(myurl, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(editmat), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then((responseJson) => {return responseJson;})
            .catch((error) => { return error;});
    } catch (error) { return error;}
}


export async function addmaterial(tipo) {

    let mensajeExito = 'Le hemos enviado un email para cambiar la contraseña';
    let myurl = url_base + 'mtradd.php'
    let mtr = {
        mtr: {
            id: id,
            tipo: tipo
        }
    };

    try {
        return await fetch(myurl, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(mtr), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then((responseJson) => {return responseJson.mensaje;})
            .catch((error) => {return error;});
    } catch (error) {return error;}
}









//ejemplo
/* 

export function getMoviesFromApiAsync() {
    return fetch('https://facebook.github.io/react-native/movies.json')
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson.movies;
        })
        .catch((error) => {
            console.error(error);
        });
}
*/
