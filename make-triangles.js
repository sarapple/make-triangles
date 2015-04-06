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
};

Triangles.prototype.generate = function (x,y) {
    var options = this.options;
    var svg     = this.buildTemplate(x,y);          //svg element is returned from buildTemplate
    var data    = this.buildData(x,y,options);      //return data set to be used for triangle points and colors
    this.displayTriangles(data,svg);
    if(options.transition !== null) {               //if transition is not null, set it
        this.setTransition(options.transition, svg)
    }
    return data;
};

Triangles.prototype.generateFromJSArray = function (x,y,JSArray) {
    var options = this.options;
    var svg     = this.buildTemplate(x,y);              //svg element is returned from buildTemplate
    //var data    = this.buildData(x,y,options);
    this.displayTriangles(JSArray,svg);
    if(options.transition !== null) {                   //if transition is not null, set it
        this.setTransition(options.transition, svg)
    }
    return data;
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

Triangles.prototype.buildData = function(x,y,options){

    var columns = Math.ceil(x/(options.side*2))+2,    //number of chevron columns that fit in grid
        fillY   = Math.ceil(y/(options.side*1.5))+2,  //number of chevron triangle groups that will fit in 1 column
        height = (options.side/2)*Math.sqrt(3),     //calculate the height of the equil. triangle

        data    = [],                               //data will be built in the following structure:

        runnerX = 0,
        runnerY = 0,
        currentColor = d3.hsl(options.baseColor);   //initialize the starting color outside of for loop

    var cvs = document.createElement('canvas'),
        img = document.getElementsByTagName("img")[0];   // your image goes here
        cvs.width = img.width;
        cvs.height = img.height;
    var ctx = cvs.getContext("2d");
        ctx.drawImage(img,0,0,cvs.width,cvs.height);
    var canvasRunnerX        = 14,
        canvasRunnerY        = 0,
        canvasColumnWidth    = (cvs.width-14)/columns,
        canvasRowHeight      = cvs.height/fillY,
        triHeight            = canvasColumnWidth/2,
        triSide              = canvasRowHeight/1.5;
    var pixelData = ctx.getImageData(canvasRunnerX,canvasRunnerY,1,1).data;



    for(var i=0; i<columns; i++){
        canvasRunnerY = 1;
        runnerY = 0;
        currentColor = d3.hsl(options.baseColor);
        for(var j=0; j<fillY; j++) {

            pixelData = ctx.getImageData((canvasRunnerX+(triHeight/2)),(canvasRunnerY+(triSide/2)),1,1).data;
            canvasString = 'rgb(' + pixelData[0] + ',' + pixelData[1] + ',' + pixelData[2] +')';

            var outerLeft = {
                point1x: runnerX,
                point1y: runnerY,
                point2x: runnerX + height,
                point2y: runnerY + (options.side / 2),
                point3x: runnerX,
                point3y: runnerY + options.side,
                color: canvasString,
                column: i,
                chevron: j
            };

            pixelData = ctx.getImageData((canvasRunnerX+(triHeight*1.5)),(canvasRunnerY+(triSide/2)),1,1).data;
            canvasString = 'rgb(' + pixelData[0] + ',' + pixelData[1] + ',' + pixelData[2] +')';

            var outerRight = {
                point1x: runnerX + height*2,
                point1y: runnerY,
                point2x: runnerX + height,
                point2y: runnerY + (options.side / 2),
                point3x: runnerX + height*2,
                point3y: runnerY + options.side,
                color: canvasString,
                column: i,
                chevron: j
            };

            pixelData = ctx.getImageData(canvasRunnerX+(triHeight/2),(canvasRunnerY+(triSide)),1,1).data;
            canvasString = 'rgb(' + pixelData[0] + ',' + pixelData[1] + ',' + pixelData[2] +')';

            var innerLeft = {
                point1x: runnerX + height,
                point1y: runnerY + (options.side / 2),
                point2x: runnerX + height,
                point2y: runnerY + options.side*1.5,
                point3x: runnerX,
                point3y: runnerY + options.side,
                color: canvasString,
                column: i,
                chevron: j
            };

            pixelData = ctx.getImageData(canvasRunnerX+(triHeight*1.5),(canvasRunnerY+triSide),1,1).data;
            canvasString = 'rgb(' + pixelData[0] + ',' + pixelData[1] + ',' + pixelData[2] +')';

            var innerRight = {
                point1x: runnerX + height,
                point1y: runnerY + (options.side / 2),
                point2x: runnerX + height,
                point2y: runnerY + options.side*1.5,
                point3x: runnerX + height*2,
                point3y: runnerY + options.side,
                color: canvasString,
                column: i,
                chevron: j
            };
            data.push(outerLeft);
            data.push(outerRight);
            data.push(innerLeft);
            data.push(innerRight);
            runnerY += options.side;
            canvasRunnerY += canvasRowHeight;
            currentColor = d3.hsl(currentColor).brighter(.02);
        }
        canvasRunnerX += canvasColumnWidth;
        runnerX += height*2;
    }
    return data;
};

Triangles.prototype.displayTriangles = function(data,svg){
    var tri             = svg
                            .selectAll("path")
                            .data(data);
    var triEnter        = tri
                            .enter()
                            .append("path");
    triEnter            .attr("d", function(d){
                            var fullString =    "M " + d.point1x + " " + d.point1y +
                                                " L " + d.point2x + " " + d.point2y +
                                                " L " + d.point3x + " " + d.point3y + " z";
                            return fullString;
                        })
                        .attr("fill", function(d){
                            return d.color;
                        })
                        .attr("stroke", function(d){
                            return d.color;
                        });
};

Triangles.prototype.setTransition = function(transform,svg){
    d3.selectAll("path")
        .on("mouseover", function() {
            svg .transition()
                .selectAll("path")
                .delay(function(d, i) { return i * 5; })
                .attr("transform", function(d) {
                    return transform;
                });
        });
};