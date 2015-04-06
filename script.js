document.getElementById('img-fileinput').addEventListener('change', loadIMGFile, false);
document.getElementById('fileinput').addEventListener('change', loadJSONFile, false);

function loadJSONFile() {
    var input, file, fr;

    if (typeof window.FileReader !== 'function') {
        alert("The file API isn't supported on this browser yet.");
        return;
    }

    input = document.getElementById('fileinput');
    if (!input) {
        alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
        alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
        alert("Please select a file before clicking 'Load'");
    }
    else {
        file = input.files[0];
        fr = new FileReader();
        fr.onload = receivedText;
        fr.readAsText(file);
    }

    function receivedText(e) {
        lines = e.target.result;
        var jsArray = JSON.parse(lines);
        var up = new Triangles({baseColor: "hsl(146,33%,25%)", transition: "rotate(150 -400,-400)", viewBox: "50 50 700 250", side: 30});
        up.generateFromJSArray(700,400,jsArray);
    }
}

function loadIMGFile() {
    var fileInput = document.getElementById('img-fileinput');
    var fileDisplayArea = document.getElementById('fileDisplayArea');
    var file = fileInput.files[0];
    var imageType = /image.*/;

    if (file.type.match(imageType)) {
        var reader = new FileReader();

        reader.onload = function(e) {
            fileDisplayArea.innerHTML = "";

            // Create a new image.
            var img = document.createElement('img');
            img.src = reader.result;
            img.id = "uploaded";

            fileDisplayArea.appendChild(img);

            var t = new Triangles({baseColor: "hsl(146,33%,25%)", transition: "rotate(150 -400,-400)", viewBox: "50 50 700 250", side: 30});
            var pattern = t.generate(700,400);

            var jsonData = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pattern));

            $('<a href="data:' + jsonData + '" download="data.json">download JSON</a>').appendTo('#download');
        };

        reader.readAsDataURL(file);
    } else {
        fileDisplayArea.innerHTML = "File not supported!";
    }
}