
var displayCount = 0;

class SVGPixel {

	constructor(height, width, rows, cols) {
		this.height = height;
		this.width = width;
		this.rows = rows;
		this.cols = cols;
		this.count = displayCount ++;
	}

	svg() {
		var radius = Math.min(this.height/this.rows, this.width/this.cols);
		console.log('computed radius = ' + radius);
		var svg = new Bldr("svg");
		svg.att("align", "center").att("width", this.width).att("height", this.height);
		for (var i = 0; i < this.rows; i ++) {
			for (var j = 0; j < this.cols; j ++) {
				var x = radius*(2*i+1);
				var y = radius*(2*j+1);				
				var c0 = new Bldr("circle").att("cx",x).att("cy", y);
				c0.att("r",radius).att("stroke-width",0).att("fill","none");
				c0.att("onclick", "elementClick(event)");	
				c0.att("id", this.count + "pixel_"+i+"_"+j);
				c0.att("data-row", i);
				c0.att("data-col", j);
				c0.att("data-count", this.count);				
				svg.elem(c0);
			}
		}
		return svg.build();	
	}


	element(i,j) {
		return $("#"+this.count + "pixel_"+i+"_"+j);
	}
	
	on(i,j) {
		this.element(i,j).attr("fill", "black");
	}

	off(i,j) {
		this.element(i,j).attr("fill", "white");
	}	
	
};

function elementClick(event) {
	var i = parseInt(event.target.getAttribute("data-row"));
	var j = parseInt(event.target.getAttribute("data-col"));	
	var d = parseInt(event.target.getAttribute("data-count"));	
	console.log("clicked pixel: " + d+" " + i +" " + j);
};
