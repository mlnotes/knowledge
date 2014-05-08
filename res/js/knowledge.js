var labelType, useGradients, nativeTextSupport, animate;

(function () {
    var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
    //I'm setting this based on the fact that ExCanvas provides text support for IE
    //and that as of today iPhone/iPad current text support is lame
    labelType = (!nativeCanvasSupport || (textSupport && !iStuff)) ? 'Native' : 'HTML';
    nativeTextSupport = labelType == 'Native';
    useGradients = nativeCanvasSupport;
    animate = !(iStuff || !nativeCanvasSupport);
})();

function init() {
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
        onCreateLabel: function (domElement, node) {
            domElement.innerHTML = node.name;
            $jit.util.addEvent(domElement, 'click', function () {
                if (node._depth < 1) {
                    return;
                }
                ht.onClick(node.id, {
                    onComplete: function () {
                        ht.controller.onComplete();
                    }
                });
            });
        },
        //Change node styles when labels are placed
        //or moved.
        onPlaceLabel: function (domElement, node) {
            var style = domElement.style;
            style.display = '';
            style.cursor = 'pointer';
            if (node._depth < 1) {
                style.fontSize = "1.0em";
                style.fontWeight = "bold";
                style.color = "#DDD";
            } else if (node._depth == 1) {
                style.fontSize = "0.8em";
                style.color = "#DDD";

            } else if (node._depth == 2) {
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
    ht.loadJSON(DATA);
    //compute positions and plot.
    ht.refresh();
    //end
    ht.controller.onComplete();
}

$(document).ready(function () {
    init();
});