"use strict";

// VanillaJS lyfe
document.getElementById("test-button").addEventListener("click", function(e) {
    e.preventDefault();
    var notice = document.getElementById("notice");
    // clear the notice
    notice.className = "";

    var request = {
        "Address": document.getElementById("form-address").value,
        "Username": document.getElementById("form-username").value,
        "PublicKey": document.getElementById("form-public-key").value
    };

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/send", true);
    xhr.onreadystatechange = function() {
        if(xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status == 200) {
                notice.className = "alert alert-success";
                notice.innerHTML = "Everything appears fine. If you are still encountering issues, there is likely an issue with your vote listener(s).";
            } else if (xhr.status == 400) {
                notice.className = "alert alert-danger";
                notice.innerHTML = "Please double-check the form. Your public key may not be correct.";
            } else {
                notice.className = "alert alert-danger";
                notice.innerHTML = "There is an issue with your Votifier server. Make sure your server is online and that the port is port forwarded.";
            }
        }
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(request));
});