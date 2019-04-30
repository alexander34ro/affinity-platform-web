function generate() {
    let cells_by_id = graph.model.cells;
    let cells = Object.values(graph.model.cells).splice(2);
    let connections = cells.filter(c => c.value.type === "connection");
    let components = cells.filter(c => c.value.type === "component");
    console.log(cells);
    console.log(components)

    let script =
`ins:
out: output
do:
    - do:`;

    components.forEach(component => {
        let inputs = connections.filter(connection => connection.target.id == component.id);
        if(inputs.length > 0)
            script += `
            - ${"out_" + inputs[0].source.id} -> ${component.value.config_options.command} -> ${"out_" + component.id}`;
        else
            script += `
            - ${component.value.config_options.command} -> ${"out_" + component.id}`;
    });

    let output = components.map(c => "out_" + c.id).join(", ");
    script += `
    - ({${output}}) -> {$.util.getInspectedObject} -> output`;

    insertScript(script);
}

function insertScript(data) {
    $('#script').val(data);
}