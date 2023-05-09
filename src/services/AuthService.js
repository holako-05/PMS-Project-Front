import axios from 'axios'

const API_URL = 'http://localhost:10000/auth/'

class AuthService {
    login(credentials) {
        return axios.post(API_URL + 'authenticate', credentials)
    }

    register(user) {
        return axios.post(API_URL + 'register', user)
    }
}

export default new AuthService()
