var getFileBlob = function (url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.addEventListener('load', function () {
        cb(xhr.response);
    });
    xhr.send();
};

var blobToFile = function (blob, name) {
    blob.lastModifiedDate = new Date();
    blob.name = name;
    return blob;
};

var getFileObject = function (filePathOrUrl, cb) {
    getFileBlob(filePathOrUrl, function (blob) {
        cb(blobToFile(blob, 'test.jpg'));
    });
};

function readAsText(filename, func) {
    var fileContents;
    getFileObject(filename, function (file) {
        var reader = new FileReader();
        reader.onload = function (file) {
            fileContents = file.target.result;

            var lines = fileContents.split('\n');

            var line1 = (' ' + lines[0]).slice(1);
            line1 = line1.split(" ");

            var nrow = line1[0];
            var ncol = line1[1];

            func(lines[1], nrow, ncol);
        };
        reader.readAsText(file);
    });
}

function readAsBinaryString(filename, vectorField, func) {
    var fileContents;
    getFileObject(filename, function (file) {
        var reader = new FileReader();
        reader.onload = function (file) {
            fileContents = file.target.result;

            func(fileContents, vectorField);
        };
        reader.readAsBinaryString(file);
    });
}

function writeTestData(filename) {
    var buf = new ArrayBuffer(12 + 9 * 8 + 8 * 8 * 3)
    var viewDimensions = new DataView(buf, 0, 12);
    viewDimensions.setInt32(0, 2, true);    // xDim
    viewDimensions.setInt32(4, 2, true);    // yDim
    viewDimensions.setInt32(8, 2, true);    // zDim

    var viewDomain = new DataView(buf, 12, 9 * 8);
    viewDomain.setFloat64(0, 1, true);      // dx
    viewDomain.setFloat64(8, 1, true);      // dy
    viewDomain.setFloat64(2 * 8, 1, true);    // dz

    viewDomain.setFloat64(3 * 8, 0, true);    // xMin
    viewDomain.setFloat64(4 * 8, 1, true);    // xMax
    viewDomain.setFloat64(5 * 8, 0, true);    // yMin
    viewDomain.setFloat64(6 * 8, 1, true);    // yMax
    viewDomain.setFloat64(7 * 8, 0, true);    // zMin
    viewDomain.setFloat64(8 * 8, 1, true);    // zMax

    var viewData = new DataView(buf, 12 + 9 * 8, 8 * 8 * 3);
    for (let i = 0; i < 2; ++i) {
        let offset = i * 12 * 8;
        viewData.setFloat64(offset, 1.0, true);     // x-data at [0,0,0/1]
        offset += 8;
        viewData.setFloat64(offset, 0.1, true);     // y-data at [0,0,0/1]
        offset += 8;
        viewData.setFloat64(offset, 0.1, true);     // z-data at [0,0,0/1]

        offset += 8;
        viewData.setFloat64(offset, -0.1, true);    // x-data at [1,0,0/1]
        offset += 8;
        viewData.setFloat64(offset, 1.0, true);     // y-data at [1,0,0/1]
        offset += 8;
        viewData.setFloat64(offset, 0.1, true);     // z-data at [1,0,0/1]

        offset += 8;
        viewData.setFloat64(offset, 0.1, true);     // x-data at [0,1,0/1]
        offset += 8;
        viewData.setFloat64(offset, -1.0, true);    // y-data at [0,1,0/1]
        offset += 8;
        viewData.setFloat64(offset, 0.1, true);     // z-data at [0,1,0/1]

        offset += 8;
        viewData.setFloat64(offset, -1.0, true);    // x-data at [1,1,0/1]
        offset += 8;
        viewData.setFloat64(offset, -0.1, true);   // y-data at [1,1,0/1]
        offset += 8;
        viewData.setFloat64(offset, 0.1, true);    // z-data at [1,1,0/1]
    }

    let byteView = new Uint8Array(buf);

    console.log(byteView);

    var file = new Blob([buf], { type: "bin" });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

export {
    readAsText,
    readAsBinaryString,
    writeTestData
};