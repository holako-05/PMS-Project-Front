export default function authHeader() {
    let jwtToken = localStorage.getItem('jwtToken');
    let jwtTokenObj = JSON.parse(jwtToken);
    if (jwtToken && jwtTokenObj) {
        let token = jwtTokenObj.token;
        return { Authorization: "Bearer " + token }
    } else {
        return {}
    }
}
