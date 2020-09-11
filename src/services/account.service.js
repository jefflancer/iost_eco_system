import axios from 'axios';

const accountService = {
    newKey,
    checkValidation,
    sendEmailVerification,
    sendVerificationToken,
    getAccountBalanceDetail,
};

export default accountService;

function newKey( accountName ) {
    let response = axios.post(`http://127.0.0.1:3000/api/accounts/newkey`,
    {'accountName': accountName});

    return response;
}

function sendEmailVerification( email ) {
    let response = axios.post(`http://127.0.0.1:3000/api/accounts/activate`,
    {'email': email});

    return response;
}

function sendVerificationToken( email, token, pk, name ) {
    let response = axios.post(`http://127.0.0.1:3000/api/accounts/verification`,
    {'email': email, 'verificationToken': token, 'privateKey': pk, 'accountName': name});

    return response;
}

function getAccountBalanceDetail( name ) {
    let response = axios.post(`http://127.0.0.1:3000/api/accounts/getbalance`,
    {'name': name});

    return response;
}

function checkValidation( name ) {
    let response = axios.post(`http://127.0.0.1:3000/api/accounts/checknamevalid`,
    {'name': name});

    return response;
}