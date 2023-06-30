export const signInLink = "https://ping-sso-uat.schneider-electric.com/as/authorization.oauth2?client_id=[api_ret_client_id]&response_type=code&scope=edit&redirect_uri=";
//eCommerceSellout_55895_UAT
export const redirectUrl = "https://master.d1txxtzp6q6is3.amplifyapp.com/Authenticate";

export const authorizationRequestUrl = redirectUrl.concat("?code=");

export const getAccessTokenUrl = "https://ping-sso-uat.schneider-electric.com/as/token.oauth2";

export const tokenExpiryMinusAttr = 1080; //in seconds