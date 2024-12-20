import React from "react";

const ORCID_AUTH_URL = "https://orcid.org/oauth/authorize";
const CLIENT_ID = "APP-WNP0NHO3C6679L1F"; // Replace with your ORCID Client ID
const REDIRECT_URI = "https://orcid-to-iris-production.up.railway.app/"; // Replace with your app's redirect URI
const SCOPE = "/read-limited";

function OrcidAuthorization() {
  const handleLogin = () => {
    const authorizationUrl = `${ORCID_AUTH_URL}?client_id=${CLIENT_ID}&response_type=code&scope=${SCOPE}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
    window.location.href = authorizationUrl;
  };

  return (
    <div>
      <h2>Login with ORCID</h2>
      <button onClick={handleLogin}>Authorize with ORCID</button>
    </div>
  );
}

export default OrcidAuthorization;
