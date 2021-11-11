import axios from "axios";
const host = "localhost:8080";

export const register = async (person) => {
    const { data } = (await axios.post(`http://${host}/api/v1/registration`, person));
    return data;
};

export const login = async (person) => {
    let returnstmt="";
    await axios.post(`http://${host}/api/v1/login`, person)
    .then(response => {
        returnstmt = response;
    })
    .catch(error => {
        returnstmt = error.response
    });

    return returnstmt;
};