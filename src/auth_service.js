import { isAuthenticated, popupOpen, token, user } from "./store";
import createAuth0Client from "@auth0/auth0-spa-js";

async function createClient() {
    return await createAuth0Client({
        domain: import.meta.env.VITE_DOMAIN,
        client_id: import.meta.env.VITE_CLIENT_ID,
    });
}

async function loginWithPopup(client, options) {
    popupOpen.set(true);
    try {
        await client.loginWithPopup(options);
        const currUser = await client.getUser();
        user.set(currUser);
        const accessToken = await client.getIdTokenClaims();
        token.set(accessToken.__raw);
        isAuthenticated.set(true);
    } catch (e) {
        throw new Error(e);
    } finally {
        popupOpen.set(false);
    }
}

function logoutClient(client) {
    try {
        return client.logout();
    }catch(e){
        throw(e);
    }
}

const auth = {
    createClient,
    loginWithPopup,
    logoutClient: logoutClient,
};

export default auth;
