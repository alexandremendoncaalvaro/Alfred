const Cookies = (() => {
    const createCookie = (name, value) => {
        var d = new Date();
        d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000))
        var expires = "expires=" + d.toUTCString()
        document.cookie = name + "=" + value + ";" + expires + ";path=/"
    }
    
    const getCookie = cookieName => {
        var name = cookieName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    
    const checkCookie = name => {
        var cookie = getCookie(name)
        if (cookie != "") {
            return true;
        } else {
            return false;
        }
    }
    
    const deleteCookie = cookie => {
        document.cookie = cookie + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    return {
        createCookie: (name, value) =>{
            createCookie(name,value)
        },
        getCookie: name => {
            return getCookie(name)
        },
        checkCookie: name => {
            return checkCookie(name)
        },
        deleteCookie: name => {
            deleteCookie(name)
        }
    }
})()

