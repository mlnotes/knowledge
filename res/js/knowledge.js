var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();
	
function init(){
    //init data
    var json = {
		"id": "1",
        "name": "Knowledge",
        "children": [{
			"id": "1_1",
            "name": "Algorithm",
            "children": [{
				"id": "1_1_1",
                "name": "Sorting",
				"children": [{
					"id": "1_1_1_1",
					"name": "Bubble Sort"
				},
				{
					"id": "1_1_1_2",
					"name": "Quick Sort"
				},
				{
					"id": "1_1_1_3",
					"name": "Merge Sort"
				}]
            }, 
			{
                "id": "1_1_2",
                "name": "Dynamic Programming"
			}, 
			{
                "id": "1_1_3",
                "name": "Greedy"
			}, 
			{
                "id": "1_1_4",
                "name": "Backtrace"
			}, 
			{
                "id": "1_1_5",
                "name": "Divide and Conquer"
			}, 
			{
                "id": "1_1_6",
                "name": "Approximation"
			}, 
			{
                "id": "1_1_7",
                "name": "Graph Algorithm"
			}]
        }, {
            "id": "1_2",
            "name": "Data Structure",
            "children": [{
				"id": "1_2_1",
				"name": "Tree"
			},
			{
				"id": "1_2_2",
				"name": "Heap"
			},
			{
				"id": "1_2_3",
				"name": "Graph"
			}]
        }, {
            "id": "1_3",
            "name": "OS",
            "children": [{
				"id": "1_3_1",
				"name": "CPU"
			},
			{
				"id": "1_3_2",
				"name": "Memory"
			},
			{
				"id": "1_3_3",
				"name": "Process"
			},
			{
				"id": "1_3_4",
				"name": "Thread"
			},
			{
				"id": "1_3_5",
				"name": "Lock"
			},
			{
				"id": "1_3_6",
				"name": "Schedule"
			}]
        }, {
            "id": "1_4",
            "name": "Compiler",
            "children": [{
				"id": "1_4_1",
				"name": "Scanner"
			},
			{
				"id": "1_4_2",
				"name": "Parser"
			},
			{
				"id": "1_4_3",
				"name": "Semantic Analyzer"
			},
			{
				"id": "1_4_4",
				"name": "Optimizer"
			},
			{
				"id": "1_4_5",
				"name": "Code Generator"
			}]
        }, {
            "id": "1_5",
            "name": "Hardware",
            "children": [{
				"id": "1_5_1",
				"name": "Architecture"
			},
			{
				"id": "1_5_2",
				"name": "CPU",
				"children": [{
					"id": "1_5_2_1",
					"name": "Pipeline"
				},
				{
					"id": "1_5_2_2",
					"name": "Workflow"
				},
				{
					"id": "1_5_2_3",
					"name": "Cache"
				}]
			},
			{
				"id": "1_5_3",
				"name": "Memory"
			}]
        }, {
            "id": "1_6",
            "name": "Language",
            "children": [{
				"id": "1_6_1",
				"name": "C/C++"
			},
			{
				"id": "1_6_2",
				"name": "Java"
			},
			{
				"id": "1_6_3",
				"name": "C#"
			},
			{
				"id": "1_6_4",
				"name": "Python"
			},
			{
				"id": "1_6_3",
				"name": "Scala"
			}]
        }, {
            "id": "1_7",
            "name": "Network",
            "children": [{
				"id": "1_7_1",
				"name": "OSI Model"
			},
			{
				"id": "1_7_2",
				"name": "TCP/UDP"
			},
			{
				"id": "1_7_3",
				"name": "Routing"
			}]
        }, {
            "id": "1_8",
            "name": "Frontend",
            "children": [{
				"id": "1_8_1",
				"name": "HTML"
			},
			{
				"id": "1_8_2",
				"name": "CSS"
			},
			{
				"id": "1_8_3",
				"name": "JS"
			}]
        }, {
            "id": "1_9",
            "name": "Backend",
            "children": [{
				"id": "1_9_1",
				"name": "Web Server"
			},
			{
				"id": "1_9_2",
				"name": "Database"
			},
			{
				"id": "1_9_3",
				"name": "Cache"
			}]
        }]
    };
    //end
    var infovis = document.getElementById('infovis');
    var w = infovis.offsetWidth - 50, h = infovis.offsetHeight - 50;
    
    //init Hypertree
    var ht = new $jit.Hypertree({
      //id of the visualization container
      injectInto: 'infovis',
      //canvas width and height
      width: w,
      height: h,
      //Change node and edge styles such as
      //color, width and dimensions.
      Node: {
          dim: 9,
          color: "#f00"
      },
      Edge: {
          lineWidth: 2,
          color: "#088"
      },
      //Attach event handlers and add text to the
      //labels. This method is only triggered on label
      //creation
      onCreateLabel: function(domElement, node){
          domElement.innerHTML = node.name;
          $jit.util.addEvent(domElement, 'click', function () {
              ht.onClick(node.id, {
                  onComplete: function() {
                      ht.controller.onComplete();
                  }
              });
          });
      },
      //Change node styles when labels are placed
      //or moved.
      onPlaceLabel: function(domElement, node){
          var style = domElement.style;
          style.display = '';
          style.cursor = 'pointer';
		  if(node._depth < 1){
			  style.fontSize = "1.0em";
			  style.fontWeight = "bold";
              style.color = "#DDD";
		  } else if (node._depth == 1) {
              style.fontSize = "0.8em";
              style.color = "#DDD";

          } else if(node._depth == 2){
              style.fontSize = "0.7em";
              style.color = "#888";

          } else {
              style.display = 'none';
          }

          var left = parseInt(style.left);
          var w = domElement.offsetWidth;
          style.left = (left - w / 2) + 'px';
      }
    });
    //load JSON data.
    ht.loadJSON(json);
    //compute positions and plot.
    ht.refresh();
    //end
    ht.controller.onComplete();
}

function setFrame(){
	var width = $(window).width();
	var height = $(window).height();
	
	$('#infovis').width(width);
	$('#infovis').height(height);
}

$(document).ready(function(){
	//setFrame();
	init();
});
