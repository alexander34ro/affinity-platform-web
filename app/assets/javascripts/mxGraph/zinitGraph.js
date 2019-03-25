var graph;
var parent;
var style = new Object();
style[mxConstants.STYLE_SHAPE] = mxConstants.SHAPE_RECTANGLE;
style[mxConstants.STYLE_ROUNDED] = 1;
style[mxConstants.STYLE_FONTCOLOR] = '#0a0508';
style[mxConstants.STYLE_WHITE_SPACE] = 'wrap';
style[mxConstants.STYLE_FILLCOLOR] = '#f0f3fd';
style[mxConstants.STYLE_GRADIENTCOLOR] = '#c0c2cf';
style[mxConstants.STYLE_STROKECOLOR] = '#f6f6f6';
style[mxConstants.STYLE_STROKEWIDTH] = 1;
style[mxConstants.STYLE_SPACING] = 5;
style[mxConstants.STYLE_VERTICAL_ALIGN] = 'ALIGN_MIDDLE';
style[mxConstants.STYLE_FONTSIZE] = 14;
style[mxConstants.STYLE_AUTOSIZE] = 1;
style[mxConstants.STYLE_RESIZABLE] = 0;
style[mxConstants.STYLE_EDITABLE] = 0;

function initGraph(container) {
    // Checks if the browser is supported
    if (!mxClient.isBrowserSupported()) {
        mxUtils.error('Browser is not supported!', 200, false);
    } else {
        // Creates the graph inside the given container
        graph = new mxGraph(container);
        graph.getStylesheet().putCellStyle('ROUNDED', style);

        // Enables rubberband selection
        new mxRubberband(graph);
        mxGraphHandler.prototype.guidesEnabled = true;
        mxEdgeHandler.prototype.snapToTerminals = true;

        // Gets the default parent for inserting new cells. This
        // is normally the first child of the root (ie. layer 0).
        parent = graph.getDefaultParent();
    }
}