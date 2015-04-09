// Build svg equilateral triangles, based on Trianglify @qrohlf.
// Needs d3.js
//

function Triangles(options) {
    if (typeof options === 'undefined') {
        options = {};
    }

    function defaults(opt, def) {
        return (typeof opt !== 'undefined') ?  opt : def;
    }
    // defaults

    this.options = {
        baseColor: defaults(options.baseColor, "hsl(162,31%,35%)"),
        side: defaults(options.side, 50),
        transition: defaults(options.transition, null),
        viewBox: defaults(options.viewBox, "50 50 600 100")
    };
}

Triangles.prototype.generate = function (x,y) {
    var options = this.options;
    var svg     = this.buildTemplate(x,y);          //svg element is returned from buildTemplate
    var data    = this.buildData(x,y,options);      //return data set to be used for triangle points and colors
                    this.displayTriangles(data,svg);
    if(options.transition !== null) {               //if transition is not null, set it
        this.setTransition(data,svg);
    }
    return data;
};

Triangles.prototype.generateFromJSArray = function (x,y,JSArray) {
    var options = this.options;
    var svg     = this.buildTemplate(x,y);              //svg element is returned from buildTemplate
    this.displayTriangles(JSArray,svg);
    if(options.transition !== null) {                   //if transition is not null, set it
        this.setTransition(options.transition, svg)
    }
};

Triangles.prototype.buildTemplate = function(x,y){
    var options     = this.options;
    var wrapper     = d3.select(".triangle-wrapper");   //element class named triangle wrapper must exist
    var svgWrapper  = wrapper                           //create an svg wrapper
        .append("div")
        .attr("class", "svg-wrapper");
    var svg         = svgWrapper                        //build the svg, and return it
        .append("svg")
        .attr("viewBox",options.viewBox)
        .attr("version","1.1")
        .attr("xmlns","http://www.w3.org/2000/svg");
    return svg;
};
//
//Triangles.prototype.addRows = function(data, columns, fillY, runnerY, runnerX,options){
//
//    //var columns = Math.ceil(x/(options.side*2)),    //number of chevron columns that fit in grid
//    //    fillY   = Math.ceil(y/(options.side*1.5));  //number of chevron triangle groups that will fit in 1 column
//    var rememberRows = fillY;
//    fillY = 4;
//    var halfwayX = Math.ceil(columns/2);
//    var halfwayY = Math.ceil(fillY/2);
//    var height = (options.side/2)*Math.sqrt(3),     //calculate the height of the equil. triangle
//
//        newdata    = [];                               //data will be built in the following structure:
//
//        runnerX = 0;
//    var    runnerS = Math.floor(halfwayY);
//    var     rememberY = runnerY;
//        //runnerY = 0;
//
//
//    //Reproduce image on Canvas. Set up variables here.
//    var cvs = document.getElementById('canvas2'),
//
//        img = document.getElementById("combine");   // your image goes here
//    cvs.width = img.width;
//    cvs.height = img.height;
//    var ctx = cvs.getContext("2d");
//    ctx.drawImage(img,0,0,cvs.width,cvs.height);
//    //console.log(ctx);
//    //console.log(cvs.width, cvs.height);
//    var canvasRunnerX        = 0,
//        canvasRunnerY        = 0,
//        canvasColumnWidth    = (cvs.width-0)/columns,
//        canvasRowHeight      = (cvs.height-0)/fillY,
//        triHeight            = canvasColumnWidth/2,
//        triSide              = canvasRowHeight/1.5;
//    var pixelData = ctx.getImageData(canvasRunnerX,canvasRunnerY,1,1).data;
//    // End IMG Canvas variables
//    var megaSaturate = 1;
//    currentBrightness = 0;
//    //var rgb = d3.rgb("blue").brighter(.1);
//
//    for(var i=0; i<columns; i++){
//        canvasRunnerY = 0;
//        runnerY = rememberY;
//        currentBrightness = 0;
//        megaSaturate = 1;
//        //currentColor = d3.hsl(options.baseColor);
//        if(i==halfwayX){
//            runnerS = 5;
//        }
//        else if(i<halfwayX){
//            runnerS = Math.floor(halfwayY);
//            if(Math.random()>=.75){
//                runnerS += 1;
//            }
//            else if(Math.random()<=.25){
//                runnerS -=1;
//            }
//            else{}
//        }
//        else {
//
//        }
//        for(var j=0; j<fillY; j++) {
//            megaSaturate = 1;
//            currentBrightness += -.02;
//            if(j<runnerS){
//                currentBrightness += .05;
//            }
//            else if(j==runnerS){
//                currentBrightness += -.5;
//                megaSaturate      = 1+Math.random();
//            }
//            else{
//                megaSaturate      = 1+Math.random();
//            }
//
//            var hueVariable1 = Math.floor(Math.random()*3);
//            var hueVariable2 = Math.floor(Math.random()*3);
//            var hueVariable3 = Math.floor(Math.random()*3);
//            var hueVariable4 = Math.floor(Math.random()*3);
//            var lightnessVariable1 = Math.floor(Math.random() + 6) * .1;
//            var lightnessVariable2 = Math.floor(Math.random() + 6) * .1;
//            var lightnessVariable3 = Math.floor(Math.random() + 4) * .1;
//            var lightnessVariable4 = Math.floor(Math.random() + 4) * .1;
//            var saturationDegree1 = Math.random() * .05;
//            var saturationDegree2 = Math.random() * .05;
//            var saturationDegree3 = Math.random() * .05;
//            var saturationDegree4 = Math.random() * .05;
//            pixelData = ctx.getImageData((canvasRunnerX+(triHeight/2)),(canvasRunnerY+(triSide/2)),1,1).data;
//            console.log(canvasString);
//            canvasString = 'rgb(' + pixelData[0] + ',' + pixelData[1] + ',' + pixelData[2] +')';
//
//            //rgb = this.saturate(canvasString, saturationDegree1*megaSaturate);
//            //rgb = this.brighten(rgb,currentBrightness*lightnessVariable1);
//            //rgb = this.changeHue(rgb,hueVariable1);
//            //canvasString = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b +')';
//
//            var outerLeft = {
//                point1x: runnerX,
//                point1y: runnerY,
//                point2x: runnerX + height,
//                point2y: runnerY + (options.side / 2),
//                point3x: runnerX,
//                point3y: runnerY + options.side,
//                color: canvasString,
//                column: i,
//                chevron: rememberRows+j
//            };
//
//            pixelData = ctx.getImageData((canvasRunnerX+(triHeight*1.5)),(canvasRunnerY+(triSide/2)),1,1).data;
//            canvasString = 'rgb(' + pixelData[0] + ',' + pixelData[1] + ',' + pixelData[2] +')';
//
//            //rgb = this.saturate(canvasString,saturationDegree2*megaSaturate);
//            //rgb = this.brighten(rgb,currentBrightness*lightnessVariable2);
//            //rgb = this.changeHue(rgb,hueVariable2);
//            //canvasString = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b +')';
//
//            var outerRight = {
//                point1x: runnerX + height*2,
//                point1y: runnerY,
//                point2x: runnerX + height,
//                point2y: runnerY + (options.side / 2),
//                point3x: runnerX + height*2,
//                point3y: runnerY + options.side,
//                color: canvasString,
//                column: i,
//                chevron: rememberRows+j
//            };
//
//            pixelData = ctx.getImageData(canvasRunnerX+(triHeight/2),(canvasRunnerY+(triSide)),1,1).data;
//            canvasString = 'rgb(' + pixelData[0] + ',' + pixelData[1] + ',' + pixelData[2] +')';
//
//            //rgb = this.saturate(canvasString,saturationDegree3*megaSaturate);
//            //rgb = this.brighten(rgb,currentBrightness*lightnessVariable3);
//            //rgb = this.changeHue(rgb,hueVariable3);
//            //canvasString = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b +')';
//
//            var innerLeft = {
//                point1x: runnerX + height,
//                point1y: runnerY + (options.side / 2),
//                point2x: runnerX + height,
//                point2y: runnerY + options.side*1.5,
//                point3x: runnerX,
//                point3y: runnerY + options.side,
//                color: canvasString,
//                column: i,
//                chevron: rememberRows+j
//            };
//
//            pixelData = ctx.getImageData(canvasRunnerX+(triHeight*1.5),(canvasRunnerY+triSide),1,1).data;
//            canvasString = 'rgb(' + pixelData[0] + ',' + pixelData[1] + ',' + pixelData[2] +')';
//
//            //rgb = this.saturate(canvasString,saturationDegree4*megaSaturate);
//            //rgb = this.brighten(rgb,currentBrightness*lightnessVariable4);
//            //rgb = this.changeHue(rgb,hueVariable4);
//            //canvasString = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b +')';
//
//            var innerRight = {
//                point1x: runnerX + height,
//                point1y: runnerY + (options.side / 2),
//                point2x: runnerX + height,
//                point2y: runnerY + options.side*1.5,
//                point3x: runnerX + height*2,
//                point3y: runnerY + options.side,
//                color: canvasString,
//                column: i,
//                chevron: rememberRows+j
//            };
//            newdata.push(outerLeft);           //push triangles (that make up the chevron) into the dataset
//            newdata.push(outerRight);
//            newdata.push(innerLeft);
//            newdata.push(innerRight);
//            data.push(outerLeft);           //push triangles (that make up the chevron) into the dataset
//            data.push(outerRight);
//            data.push(innerLeft);
//            data.push(innerRight);
//
//            runnerY += options.side;
//            canvasRunnerY += canvasRowHeight;
//        }
//
//        if(i>halfwayX){
//            runnerS += 1;
//        }
//        runnerX += height*2;
//        canvasRunnerX += canvasColumnWidth;
//
//    }
//    console.log(newdata);
//    return data;
//};

Triangles.prototype.buildData = function(x,y,options){

    var columns = Math.ceil(x/(options.side*2)),    //number of chevron columns that fit in grid
        //fillY   = Math.ceil(y/(options.side*1.5));  //number of chevron triangle groups that will fit in 1 column
    fillY   = 4;  //number of chevron triangle groups that will fit in 1 column
    var halfwayX = Math.ceil(columns/2);
    var halfwayY = Math.ceil(fillY/2);
    var height = (options.side/2)*Math.sqrt(3),     //calculate the height of the equil. triangle

        data    = [],                               //data will be built in the following structure:

        runnerX = 0,
        runnerS = Math.floor(halfwayY),
        runnerY = 0;

    //Reproduce image on Canvas. Set up variables here.
    //var cvs = document.createElement('canvas'),
    var cvs = document.getElementById('canvas1'),
        img = document.getElementsByTagName("img")[0];   // your image goes here
    cvs.width = img.width;
    cvs.height = img.height;
    var ctx = cvs.getContext("2d");
    ctx.drawImage(img,0,0,cvs.width,cvs.height);
    //console.log(ctx);
    var canvasRunnerX        = 0,
        canvasRunnerY        = 0,
        canvasColumnWidth    = (cvs.width-0)/columns,
        canvasRowHeight      = (cvs.height-0)/fillY,
        triHeight            = canvasColumnWidth/2,
        triSide              = canvasRowHeight/1.5;
    var pixelData = ctx.getImageData(canvasRunnerX,canvasRunnerY,1,1).data;
    // End IMG Canvas variables
    var megaSaturate = 1;
    currentBrightness = 0;
    //var rgb = d3.rgb("blue").brighter(.1);

    for(var i=0; i<columns; i++){
        canvasRunnerY = 0;
        //runnerY = 0;
        runnerY = 5040;
        currentBrightness = 0;
        megaSaturate = 1;
        //currentColor = d3.hsl(options.baseColor);
        if(i==halfwayX){
            runnerS = 5;
        }
        else if(i<halfwayX){
            runnerS = Math.floor(halfwayY);
            if(Math.random()>=.75){
                runnerS += 1;
            }
            else if(Math.random()<=.25){
                runnerS -=1;
            }
            else{}
        }
        else {

        }
        for(var j=0; j<fillY; j++) {
            megaSaturate = 1;
            currentBrightness += -.02;
            if(j<runnerS){
                currentBrightness += .05;
            }
            else if(j==runnerS){
                currentBrightness += -.5;
                megaSaturate      = 1+Math.random();
            }
            else{
                megaSaturate      = 1+Math.random();
            }

            var hueVariable1 = Math.floor(Math.random()*3);
            var hueVariable2 = Math.floor(Math.random()*3);
            var hueVariable3 = Math.floor(Math.random()*3);
            var hueVariable4 = Math.floor(Math.random()*3);
            var lightnessVariable1 = Math.floor(Math.random() + 6) * .1;
            var lightnessVariable2 = Math.floor(Math.random() + 6) * .1;
            var lightnessVariable3 = Math.floor(Math.random() + 4) * .1;
            var lightnessVariable4 = Math.floor(Math.random() + 4) * .1;
            var saturationDegree1 = Math.random() * .05;
            var saturationDegree2 = Math.random() * .05;
            var saturationDegree3 = Math.random() * .05;
            var saturationDegree4 = Math.random() * .05;
            pixelData = ctx.getImageData((canvasRunnerX+(triHeight/2)),(canvasRunnerY+(triSide/2)),1,1).data;
            canvasString = 'rgb(' + pixelData[0] + ',' + pixelData[1] + ',' + pixelData[2] +')';

            rgb = this.saturate(canvasString, saturationDegree1*megaSaturate);
            rgb = this.brighten(rgb,currentBrightness*lightnessVariable1);
            rgb = this.changeHue(rgb,hueVariable1);
            canvasString = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b +')';

            var outerLeft = {
                point1x: runnerX,
                point1y: runnerY,
                point2x: runnerX + height,
                point2y: runnerY + (options.side / 2),
                point3x: runnerX,
                point3y: runnerY + options.side,
                color: canvasString,
                column: i,
                chevron: 20+j
            };

            pixelData = ctx.getImageData((canvasRunnerX+(triHeight*1.5)),(canvasRunnerY+(triSide/2)),1,1).data;
            canvasString = 'rgb(' + pixelData[0] + ',' + pixelData[1] + ',' + pixelData[2] +')';

            rgb = this.saturate(canvasString,saturationDegree2*megaSaturate);
            rgb = this.brighten(rgb,currentBrightness*lightnessVariable2);
            rgb = this.changeHue(rgb,hueVariable2);
            canvasString = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b +')';

            var outerRight = {
                point1x: runnerX + height*2,
                point1y: runnerY,
                point2x: runnerX + height,
                point2y: runnerY + (options.side / 2),
                point3x: runnerX + height*2,
                point3y: runnerY + options.side,
                color: canvasString,
                column: i,
                chevron: 20+j
            };

            pixelData = ctx.getImageData(canvasRunnerX+(triHeight/2),(canvasRunnerY+(triSide)),1,1).data;
            canvasString = 'rgb(' + pixelData[0] + ',' + pixelData[1] + ',' + pixelData[2] +')';

            rgb = this.saturate(canvasString,saturationDegree3*megaSaturate);
            rgb = this.brighten(rgb,currentBrightness*lightnessVariable3);
            rgb = this.changeHue(rgb,hueVariable3);
            canvasString = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b +')';

            var innerLeft = {
                point1x: runnerX + height,
                point1y: runnerY + (options.side / 2),
                point2x: runnerX + height,
                point2y: runnerY + options.side*1.5,
                point3x: runnerX,
                point3y: runnerY + options.side,
                color: canvasString,
                column: i,
                chevron: 20+j
            };

            pixelData = ctx.getImageData(canvasRunnerX+(triHeight*1.5),(canvasRunnerY+triSide),1,1).data;
            canvasString = 'rgb(' + pixelData[0] + ',' + pixelData[1] + ',' + pixelData[2] +')';

            rgb = this.saturate(canvasString,saturationDegree4*megaSaturate);
            rgb = this.brighten(rgb,currentBrightness*lightnessVariable4);
            rgb = this.changeHue(rgb,hueVariable4);
            canvasString = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b +')';

            var innerRight = {
                point1x: runnerX + height,
                point1y: runnerY + (options.side / 2),
                point2x: runnerX + height,
                point2y: runnerY + options.side*1.5,
                point3x: runnerX + height*2,
                point3y: runnerY + options.side,
                color: canvasString,
                column: i,
                chevron: 20+j
            };

            data.push(outerLeft);           //push triangles (that make up the chevron) into the dataset
            data.push(outerRight);
            data.push(innerLeft);
            data.push(innerRight);

            runnerY += options.side;
            canvasRunnerY += canvasRowHeight;
        }

        if(i>halfwayX){
            runnerS += 1;
        }
        runnerX += height*2;
        canvasRunnerX += canvasColumnWidth;

    }
    //data = this.addRows(data, columns, fillY, runnerY, runnerX,options,cvs);
    var nest = d3.nest()
        .key(function(d) { return d.column; });

    var nested = nest.entries(data);

    return nested;
};

//for large image
//Triangles.prototype.buildData = function(x,y,options){
//
//    //var columns = Math.ceil(x/(options.side*2))+2;    //number of chevron columns that fit in grid
//    //var fillY   = Math.ceil(y/(options.side*1.5));  //number of chevron triangle groups that will fit in 1 column
//    var columns = 19;    //number of chevron columns that fit in grid
//    var fillY   = 28;  //number of chevron triangle groups that will fit in 1 column
//    var halfwayX = Math.ceil(columns/2);
//    var halfwayY = Math.ceil(fillY/2);
//    var height = (options.side/2)*Math.sqrt(3),     //calculate the height of the equil. triangle
//
//        data    = [],                               //data will be built in the following structure:
//
//        runnerX = 0,
//        runnerS = Math.floor(halfwayY),
//        runnerY = 0;
//
//    //Reproduce image on Canvas. Set up variables here.
//    var cvs = document.createElement('canvas'),
//        img = document.getElementsByTagName("img")[0];   // your image goes here
//    cvs.width = img.width;
//    cvs.height = img.height;
//    var ctx = cvs.getContext("2d");
//    ctx.drawImage(img,0,0,cvs.width,cvs.height);
//    var canvasRunnerX        = 0,
//        canvasRunnerY        = 0,
//        canvasColumnWidth    = (cvs.width-0)/columns,
//        canvasRowHeight      = (cvs.height-0)/fillY,
//        triHeight            = canvasColumnWidth/2,
//        triSide              = canvasRowHeight/1.5;
//    var pixelData = ctx.getImageData(canvasRunnerX,canvasRunnerY,1,1).data;
//    // End IMG Canvas variables
//    var megaSaturate = 1;
//    var currentBrightness = 0;
//    //var rgb = d3.rgb("blue").brighter(.1);
//
//    for(var i=0; i<columns; i++){
//        canvasRunnerY = 0;
//        runnerY = 0;
//        currentBrightness = 0;
//        megaSaturate = 1;
//        //currentColor = d3.hsl(options.baseColor);
//        if(i==halfwayX+1){
//            runnerS = 8;
//        }
//        else if(i==10){
//            runnerS = Math.floor(halfwayY);
//            if(Math.random()>=.75){
//                runnerS += 1;
//            }
//            else if(Math.random()<=.25){
//                runnerS -=1;
//            }
//            else{}
//        }
//        else {
//
//        }
//        for(var j=0; j<fillY; j++) {
//            currentBrightness += -.02;
//            if(j<runnerS){
//                currentBrightness += .05;
//            }
//            else if(j==runnerS){
//                currentBrightness = -.5;
//                megaSaturate      = 1+Math.random();
//            }
//            else{
//                megaSaturate      = 1+Math.random();
//            }
//
//            var hueVariable1 = Math.floor(Math.random()*3);
//            var hueVariable2 = Math.floor(Math.random()*3);
//            var hueVariable3 = Math.floor(Math.random()*3);
//            var hueVariable4 = Math.floor(Math.random()*3);
//            var lightnessVariable1 = Math.random() * .3;
//            var lightnessVariable2 = Math.random() * .3;
//            var lightnessVariable3 = Math.random() * .3;
//            var lightnessVariable4 = Math.random() * .3;
//            var saturationDegree1 = Math.random() * .05;
//            var saturationDegree2 = Math.random() * .05;
//            var saturationDegree3 = Math.random() * .05;
//            var saturationDegree4 = Math.random() * .05;
//            pixelData = ctx.getImageData((canvasRunnerX+(triHeight/2)),(canvasRunnerY+(triSide/2)),1,1).data;
//            canvasString = 'rgb(' + pixelData[0] + ',' + pixelData[1] + ',' + pixelData[2] +')';
//
//            //rgb = this.saturate(canvasString, saturationDegree1);
//            rgb = this.brighten(canvasString,-1*currentBrightness*lightnessVariable1);
//            rgb = this.changeHue(rgb,hueVariable1);
//            canvasString = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b +')';
//
//            var outerLeft = {
//                point1x: runnerX,
//                point1y: runnerY,
//                point2x: runnerX + height,
//                point2y: runnerY + (options.side / 2),
//                point3x: runnerX,
//                point3y: runnerY + options.side,
//                color: canvasString,
//                column: i,
//                chevron: j
//            };
//
//            pixelData = ctx.getImageData((canvasRunnerX+(triHeight*1.5)),(canvasRunnerY+(triSide/2)),1,1).data;
//            canvasString = 'rgb(' + pixelData[0] + ',' + pixelData[1] + ',' + pixelData[2] +')';
//
//            //rgb = this.saturate(canvasString,saturationDegree2);
//            rgb = this.brighten(canvasString,-1*currentBrightness*lightnessVariable2);
//            rgb = this.changeHue(rgb,hueVariable2);
//            canvasString = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b +')';
//
//            var outerRight = {
//                point1x: runnerX + height*2,
//                point1y: runnerY,
//                point2x: runnerX + height,
//                point2y: runnerY + (options.side / 2),
//                point3x: runnerX + height*2,
//                point3y: runnerY + options.side,
//                color: canvasString,
//                column: i,
//                chevron: j
//            };
//
//            pixelData = ctx.getImageData(canvasRunnerX+(triHeight/2),(canvasRunnerY+(triSide)),1,1).data;
//            canvasString = 'rgb(' + pixelData[0] + ',' + pixelData[1] + ',' + pixelData[2] +')';
//
//            //rgb = this.saturate(canvasString,saturationDegree3);
//            rgb = this.brighten(canvasString,currentBrightness*lightnessVariable3);
//            rgb = this.changeHue(rgb,hueVariable3);
//            canvasString = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b +')';
//
//            var innerLeft = {
//                point1x: runnerX + height,
//                point1y: runnerY + (options.side / 2),
//                point2x: runnerX + height,
//                point2y: runnerY + options.side*1.5,
//                point3x: runnerX,
//                point3y: runnerY + options.side,
//                color: canvasString,
//                column: i,
//                chevron: j
//            };
//
//            pixelData = ctx.getImageData(canvasRunnerX+(triHeight*1.5),(canvasRunnerY+triSide),1,1).data;
//            canvasString = 'rgb(' + pixelData[0] + ',' + pixelData[1] + ',' + pixelData[2] +')';
//
//            //rgb = this.saturate(canvasString,saturationDegree4);
//            rgb = this.brighten(canvasString,currentBrightness*lightnessVariable4);
//            rgb = this.changeHue(rgb,hueVariable4);
//            canvasString = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b +')';
//
//            var innerRight = {
//                point1x: runnerX + height,
//                point1y: runnerY + (options.side / 2),
//                point2x: runnerX + height,
//                point2y: runnerY + options.side*1.5,
//                point3x: runnerX + height*2,
//                point3y: runnerY + options.side,
//                color: canvasString,
//                column: i,
//                chevron: j
//            };
//
//            data.push(outerLeft);           //push triangles (that make up the chevron) into the dataset
//            data.push(outerRight);
//            data.push(innerLeft);
//            data.push(innerRight);
//
//            runnerY += options.side;
//            canvasRunnerY += canvasRowHeight;
//        }
//
//        if(i>halfwayX){
//            runnerS += 1;
//        }
//        runnerX += height*2;
//        canvasRunnerX += canvasColumnWidth;
//
//    }
//
//    var nest = d3.nest()
//        .key(function(d) { return d.column; });
//
//    var nested = nest.entries(data);
//
//    return nested;
//};

Triangles.prototype.brighten = function(color,change){
    if(change>=0) {
        return d3.rgb(color).brighter(change);
    }
    else {
        change = change * -1;
        return d3.rgb(color).darker(change);
    }

};

Triangles.prototype.saturate = function(color,change){
    if(Math.random()>.75){
        //change = change * -1;
    }
    else if(Math.random()<.25){
        //color = color;
    }
    else {
        change = 0;
    }
    if(change<0) {
        change *= -1;
    }
    var oldColor = d3.hsl(color);
    var newString = "hsl(" + oldColor.h + "," + ((change + 1) * oldColor.s * 100) + "%," + (oldColor.l * 100) + "%)";
    return d3.rgb(newString);
};

Triangles.prototype.changeHue = function(color,change){
    if(Math.random()>.75){
        change = change * -1;
    }
    else if(Math.random()<.25){
        //color = color;
    }
    else {
        change = 0;
    }
    var oldColor = d3.hsl(color);
    var newString = "hsl(" + (oldColor.h+change) + "," + (oldColor.s * 100) + "%," + (oldColor.l * 100) + "%)";
    return d3.rgb(newString);
};

Triangles.prototype.displayTriangles = function(data,svg){

    var group = svg
                .selectAll("g")
                .data(data)
                .enter()
                .append("g");
    var path = group.selectAll("path")
                .data(function(d) { return d.values; })
                .enter()
                .append("path")
                .attr("d", function(d){
                    var fullString  =   "M " + d.point1x + " " + d.point1y +
                                        " L " + d.point2x + " " + d.point2y +
                                        " L " + d.point3x + " " + d.point3y + " z";
                    return fullString;
                })
                .style("fill", function(d){
                    return d.color;
                })
                .style("stroke", function(d){
                    return d.color;
                })
                .style("stroke-width", function(d){
                    return 5;
                });
};

Triangles.prototype.setTransition = function(data,svg){

    //var g = svg.selectAll("g")
    //    .on("mouseover", function() {
    //        d3
    //            .selectAll("g")
    //            .each(function(){
    //                var column  = d3  .select(this);
    //                var paths = column.selectAll("path");
    //                paths
    //                        .transition()
    //                        .delay(function(d, i) { console.log(d); return i * 50 + (d.column *50); })
    //                        .attr("transform", function(d) {
    //                            return "rotate(150 -400,-400)";
    //                        });
    //            })
    //    });

};