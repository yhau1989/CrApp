const url_base = 'http://localhost/CrServices/api/usr/';



async function login(_user, _pass) {

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
            .then((responseJson) => {
                return (responseJson.error == 0) ? responseJson.data : responseJson.mensaje;
            })
            .catch((error) => {
                console.error(error);
                //return error;
            });
    } catch (error) {
        console.error(error);
    }

}




async function registro(name, lastName, _email, _pass) {

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
            .then((responseJson) => {
                return (responseJson.error == 0) ? responseJson.data : responseJson.mensaje;
            })
            .catch((error) => {
                console.error(error);
                //return error;
            });
    } catch (error) {
        console.error(error);
    }

}










//ejemplo
/*function getMoviesFromApiAsync() {
    return fetch('https://facebook.github.io/react-native/movies.json')
        .then((response) => response.json())
        .then((responseJson) => {
            return responseJson.movies[0];
        })
        .catch((error) => {
            console.error(error);
        });
}*/