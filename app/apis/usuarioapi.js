//const url_base = 'http://localhost/CrServices/api/usr/';
const url_base = 'http://35.245.199.128/CrServices/api/usr/';



export async function login(_user, _pass) {

    let myurl = url_base + 'usrlogin.php';
    let log_in = {
        login: {
            user: _user,
            password: _pass
        }
    };

    try {
        return await fetch(myurl, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(log_in), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then((responseJson) => {return responseJson;})
            .catch((error) => {return error;});
    } catch (error) {return error;}

}




export async function registro(name, lastName, _email, _pass) {

    let myurl = url_base + 'usradd.php'
    let newUser = {
        user: {
            nombres: name,
            apellidos: lastName,
            email: _email,
            password: _pass,
            estado: 3
        }
    };

    try {
        return await fetch(myurl, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(newUser), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then((responseJson) => {return responseJson;})
            .catch((error) => { return error;});
    } catch (error) { return error;}
}


export async function resetpassword(_email) {

    let mensajeExito = 'Le hemos enviado un email para cambiar la contraseña';
    let myurl = url_base + 'usrpwsreset.php'
    let resetPass = {
        reset: {
            email: _email //campo obligatotio 
        }
    };

    try {
        return await fetch(myurl, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(resetPass), // data can be `string` or {object}!
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => response.json())
            .then((responseJson) => {return (responseJson.error == 0) ? mensajeExito : responseJson.mensaje;})
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
