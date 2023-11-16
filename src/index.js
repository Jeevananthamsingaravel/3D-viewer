import ReactDOM from "react-dom";
import React from "react";
import OAuthRefreshTokenGrant from "@sitecore/sc-contenthub-webclient-sdk/dist/authentication/oauth-refreshtoken-grant";
import OAuthPasswordGrant from "@sitecore/sc-contenthub-webclient-sdk/dist/authentication/oauth-password-grant";
import { MailRequestByUsername } from "@sitecore/sc-contenthub-webclient-sdk/dist/models/notifications/mail-request-by-username";
import { ContentHubClient } from "@sitecore/sc-contenthub-webclient-sdk/dist/clients/content-hub-client";
import APP from "./App";
export default function createExternalRoot(container) {
  var sub;
  var feed;
  function subject(val) {
    sub = val;
  }
  function feedback(val) {
    feed = val;
  }
  async function mailSender(event) {
    event.preventDefault();
    const oauth = new OAuthRefreshTokenGrant(
      "js_sdk",
      "js_sdk_secret",
      "cd327ea4395d4dd986277ce363a55b45"
    );
    const client = new ContentHubClient(window.location.origin, oauth);
    const isAuthenticated = await client.internalClient.authenticateAsync();
    console.log(isAuthenticated);
    var request = new MailRequestByUsername();
    request.mailTemplateName = "IdamUserFeedback";
    request.variables["subject"] = sub;
    request.variables["userName"] = "9999";
    request.variables["description"] = feed;
    request.recipients = ["vijaykumar.j@inter.ikea.com"];
    console.log("Hello this works");
    alert("Feedback submitted");
    document.getElementById("subject").value = "";
    document.getElementById("feedback").value = "";
    const test = await client.notifications.sendEmailNotificationAsync(request);
  }

  return {
    render() {
      ReactDOM.render(
       <APP />,
        container
      );
    },
    unmount() {
      ReactDOM.unmountComponentAtNode(container);
    },
  };
}
