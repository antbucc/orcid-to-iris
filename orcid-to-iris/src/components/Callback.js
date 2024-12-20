import React, { useEffect } from "react";

const TOKEN_URL = "https://orcid.org/oauth/token";
const CLIENT_ID = "APP-WNP0NHO3C6679L1F"; // Replace with your ORCID Client ID
const CLIENT_SECRET = "a00fdf1b-cc43-43db-8a50-3886adec482a"; // Replace with your ORCID Client Secret
const REDIRECT_URI = "https://orcid-to-iris-production.up.railway.app/"; // Replace with your app's redirect URI

function Callback() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get("code");

    if (authorizationCode) {
      fetch(TOKEN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: "authorization_code",
          code: authorizationCode,
          redirect_uri: REDIRECT_URI,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Access Token:", data.access_token);
          localStorage.setItem("orcid_token", data.access_token); // Save the token locally
          alert("Authorization successful!");
        })
        .catch((error) => console.error("Error exchanging token:", error));
    }
  }, []);

  return <div>Processing ORCID Authorization...</div>;
}

export default Callback;
