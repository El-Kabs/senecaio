export function isAuth(){
    var localStorage = window.localStorage;
    var auth = (localStorage.getItem("access_token")!==null) ?  true :  false;
    return auth
}