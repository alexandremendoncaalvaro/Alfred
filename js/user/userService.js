const UserService = (() => {
    const login = (user,password) => {
        //var data = {user: user, password: password} 

        Cookies.createCookie('token','true')
        window.location.href = '\index.html'

        // post("v1/login",data).then(r => {

        //     if(r.code == 0){
        //         alert(r.message)
        //     }
        //     else if(r.code == 1){
        //         Cookies.createCookie('token',r.token)
        //         window.location.href = '\index.html'
        //     }

        // })
    }

    const register = (token,user, password, email, permission) => {
        var data = {login: user, password: password, email: email, permission: permission} 
        
        post("v1/user", data).then(r => {
            alert(data.message)
        })
    }

    return {
        login: (user, password) => {
            login(user,password)
        },
        register: (token, user, password, email, permission) => {
            register(token, user, password, email, permission)
        }
    }
})()