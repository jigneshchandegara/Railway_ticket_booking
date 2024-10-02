import Cookies from "js-cookie";

const token = Cookies.get('accessToken');
const config = {
    headers: {
        'Authorization': 'Bearer ' + token
    }
}


export default config;