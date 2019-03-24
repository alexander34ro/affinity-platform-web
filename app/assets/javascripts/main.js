// Main
$('document').ready(function () {
  initGraph($('#ring')[0]);
  initAwesomplete();

  $('#components').on('click', '.component', e => {
    let vertex = graph.insertVertex(
      parent,
      null,
      extractName(e),
      20,
      20,
      20,
      20,
      'ROUNDED'
    );
    graph.updateCellSize(vertex);
  });

  $('#edge, #wedge').on('click', e => {
    let cell = new mxCell(
      new Connection,
      new mxGeometry(0, 0, 50, 50),
      'curved=1;endArrow=classic;html=1;strokeColor=#17a2b8;strokeWidth=2;endSize=8'
    );
    cell.geometry.setTerminalPoint(new mxPoint(20, 20), true);
    cell.geometry.setTerminalPoint(new mxPoint(80, 80), false);

    cell.geometry.relative = true;
    cell.edge = true;
    cell = graph.addCell(cell);
  });

  $('#delete').on('click', e => {
    graph.removeCells([graph.getSelectionCell()]);
  });

  $('#generate').on('click', e => {
    console.log(graph.model.cells);
  });
});
