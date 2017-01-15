// VanillaJS lyfe
document.getElementById("test-button").addEventListener("click", function() {
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
                alert("All is good!");
            } else if (xhr.status == 400) {
                alert("Something went wrong - please check if your public key is correct.");
            } else {
                alert("There is an issue with your Votifier server. Make sure your server is online and that the port is port forwarded.");
            }
        }
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(request));
});