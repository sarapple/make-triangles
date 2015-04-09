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
        //var up = new Triangles({baseColor: "hsl(146,33%,25%)", transition: "rotate(150 -400,-400)", viewBox: "50 50 700 250", side: 30});
        //large triangle wall
        var up = new Triangles({baseColor: "hsl(146,33%,25%)", transition: "rotate(150 -400,-400)", viewBox: "0 0 8424 7272", side: 252});
        //var up = new Triangles({baseColor: "hsl(146,33%,25%)", transition: "rotate(150 -400,-400)", viewBox: "0 0 8424 7272", side: 252});
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

            var t = new Triangles({baseColor: "hsl(146,33%,25%)", transition: "rotate(150 -400,-400)", viewBox: "0 0 1700 1200", side: 30});
            //large triangle wall
            //var t = new Triangles({baseColor: "hsl(146,33%,25%)", transition: "rotate(150 -400,-400)", viewBox: "0 0 8424 7272", side: 252});
            //var t = new Triangles({baseColor: "hsl(146,33%,25%)", transition: "rotate(150 -400,-400)", viewBox: "0 0 8424 10272", side: 252});
            var pattern = t.generate(700,400);

            var jsonData = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(pattern));

            $('<a href="data:' + jsonData + '" download="data.json">download JSON</a>').appendTo('#download');
        };

        reader.readAsDataURL(file);
    } else {
        fileDisplayArea.innerHTML = "File not supported!";
    }
}

exportSVG = function() {
//get svg element.
    var svg = document.getElementsByTagName("svg")[0];
    console.log(svg);
//get svg source.
    var serializer = new XMLSerializer();
    var source = serializer.serializeToString(svg);

//add name spaces.
    if (!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)) {
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if (!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)) {
        source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }

//add xml declaration
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

//convert svg source to URI data scheme.
    var url = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(source);

//set url value to a element's href attribute.
    document.getElementById("link").href = url;
//you can download svg file by right click menu.
};
exportJPG = function(){
    window.open().location = document.getElementsByTagName("canvas")[0].toDataURL("image/png");
};