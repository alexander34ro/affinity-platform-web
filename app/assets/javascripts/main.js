// Main
$('document').ready(function () {
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })

  initGraph($('#ring')[0]);
  initAwesomplete();

  $('#components').on('click', '.component', e => {
    let vertex = graph.insertVertex(
      parent,
      null,
      extractName(e),
      24,
      24,
      24,
      24,
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
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(generate()));
      element.setAttribute('download', 'affinity.chiml');

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
  });

  graph.addListener(mxEvent.DOUBLE_CLICK, function (sender, evt) {
    let cell = evt.getProperty('cell'); // cell may be null
    if (cell != null) {
      console.log(cell);
      graph.setSelectionCell(cell);

      $.ajax({
        url: $(location).attr("href") + "/component?component=" + encodeURI(cell.value.name)
      }).done((data) => {
        $("#componentDetails").modal();
        $("#componentDetails .modal-body").html(data);
        Object.entries(cell.value.config_options).forEach((pair) => {
          $(".config-option#"+pair[0]).val(pair[1]);
        });
      });
    }
    evt.consume();
  });

  $(document).on('submit', '#componentDetails #save-component', e => {
    e.preventDefault(e);

    config_options = {};
    $(e.currentTarget).find(".config-option").each((index, option) => {
      config_options[option.name] = option.value;
    });
    graph.getSelectionCell().value.config_options = config_options;
    $("#componentDetails").modal("hide");
  });

  $('#custom').on('click', e => {
    $.ajax({
      url: $(location).attr("href") + "/component?component=" + encodeURI("Custom")
    }).done((data) => {
      $("#customComponentDetails").modal();
      $("#customComponentDetails .modal-body").html(data);
      Object.entries(["name", "description", "command"]).forEach((pair) => {
        $(".config-option#" + pair[0]).val(pair[1]);
      });
    });
  });

  $(document).on('submit', '#customComponentDetails #save-component', e => {
    $("#customComponentDetails").modal("hide");
  });
});
