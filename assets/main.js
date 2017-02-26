"use strict";

// VanillaJS lyfe
document.getElementById("is-v1").addEventListener("click", function() {
    var key = document.getElementById("form-public-key");
    var label = document.getElementById("form-public-key-label");
    key.setAttribute("placeholder", "Check plugins/(Nu)Votifier/rsa/public.key");
    key.value = "";
    label.innerHTML = "Public Key";
})

document.getElementById("is-v2").addEventListener("click", function() {
    var key = document.getElementById("form-public-key");
    var label = document.getElementById("form-public-key-label");
    key.setAttribute("placeholder", "Check plugins/(Nu)Votifier/config.yml under the 'tokens' section");
    key.value = "";
    label.innerHTML = "Token";
})

document.getElementById("test-button").addEventListener("click", function(e) {
    e.preventDefault();
    var notice = document.getElementById("notice");
    // clear the notice
    notice.className = "";
    notice.innerHTML = "";

    var request = {
        "Address": document.getElementById("form-address").value,
        "Username": document.getElementById("form-username").value,
        "Key": document.getElementById("form-public-key").value,
        "IsV1": document.getElementById("is-v1").checked
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