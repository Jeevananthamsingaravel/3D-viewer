// import ReactDOM from "react-dom";
// import React, { useEffect } from "react";
// import OAuthRefreshTokenGrant from "@sitecore/sc-contenthub-webclient-sdk/dist/authentication/oauth-refreshtoken-grant";
// import OAuthPasswordGrant from "@sitecore/sc-contenthub-webclient-sdk/dist/authentication/oauth-password-grant";
// import { MailRequestByUsername } from "@sitecore/sc-contenthub-webclient-sdk/dist/models/notifications/mail-request-by-username";
// import { ContentHubClient } from "@sitecore/sc-contenthub-webclient-sdk/dist/clients/content-hub-client";
// import App from './App';
// export default function createExternalRoot(container) {

//   const usdBindingsTag = document.createElement("script");
//   usdBindingsTag.innerHTML = `if (!crossOriginIsolated) SharedArrayBuffer = ArrayBuffer;`
//   document.body.appendChild(usdBindingsTag);

//   var sub;
//   var feed;
//   function subject(val) {
//     sub = val;
//   }
//   function feedback(val) {
//     feed = val;
//   }
//   async function mailSender(event) {
//     event.preventDefault();
//     const oauth = new OAuthRefreshTokenGrant(
//       "js_sdk",
//       "js_sdk_secret",
//       "cd327ea4395d4dd986277ce363a55b45"
//     );
//     const client = new ContentHubClient(window.location.origin, oauth);
//     const isAuthenticated = await client.internalClient.authenticateAsync();
//     console.log(isAuthenticated);
//     var request = new MailRequestByUsername();
//     request.mailTemplateName = "IdamUserFeedback";
//     request.variables["subject"] = sub;
//     request.variables["userName"] = "9999";
//     request.variables["description"] = feed;
//     request.recipients = ["vijaykumar.j@inter.ikea.com"];
//     console.log("Hello this works");
//     alert("Feedback submitted");
//     document.getElementById("subject").value = "";
//     document.getElementById("feedback").value = "";
//     const test = await client.notifications.sendEmailNotificationAsync(request);
//   }

//   return {
//     render() {
//       ReactDOM.render(
//        <App />,
//         container
//       );
//     },
//     unmount() {
//       ReactDOM.unmountComponentAtNode(container);
//     },
//   };
// }


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const usdBindingsTag = document.createElement("script");
usdBindingsTag.innerHTML = `if (!crossOriginIsolated) SharedArrayBuffer = ArrayBuffer;`
document.body.appendChild(usdBindingsTag);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
