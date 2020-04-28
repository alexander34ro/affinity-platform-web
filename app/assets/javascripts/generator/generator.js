function generate() {
    let cells_by_id = graph.model.cells;
    let cells = Object.values(graph.model.cells).splice(2);
    let connections = cells.filter(c => c.value.type === "connection");
    let components = cells.filter(c => c.value.type === "component");
    console.log(cells);
    console.log(components)

    const indent = `    `;
    const nl = `
`;

    let ins = "";
    if (components.some(x => x.value.name === "Server")) ins = 'input';

    let script = "";
    script +=
`
ins: ${ins}
out: output
do:
    - do:
`;

    let extra_indentation = 2 ;
    components.forEach(component => {
        console.log(component);

        let name = component.value.name;
        let inputs = connections.filter(connection => connection.target.id == component.id);
        let indentation = indent.repeat(extra_indentation);

        if (name === "Invoker") {
            if (inputs.length > 0) script += indentation + `- ${"out_" + inputs[0].source.id} -> ${component.value.config_options.command} -> ${"out_" + component.id}`;
            else script += indentation + `- ${component.value.config_options.command} -> ${"out_" + component.id}`;
        } else if (name === "Splitter") {
            script += indentation + `- ${"out_" + inputs[0].source.id} -> {$.assignValue} -> ${"out_" + component.id}`;
        } else if (name === "Logger") {
            script += indentation + `- ${"out_" + inputs[0].source.id} -> {$.print} -> ${"out_" + component.id}`;
        } else if (name === "Parallel Splitter") {
            script += indentation + `- ${"out_" + inputs[0].source.id} -> {$.assignValue} -> ${"out_" + component.id}`;
            script += nl + indentation + `- parallel:`;
            extra_indentation++;
        } else if (name === "Sender") {
            let url = "'" + component.value.config_options.url + ':' + component.value.config_options.port + "'";
            let server = "'server_" + component.id + ".chiml'";
            script += indentation + `- (${url + ", " + server + ", out_" + inputs[0].source.id}) -> [$.send] -> ${"out_" + component.id}`;
        }
        script += nl;
    });

    let output = components.map(c => "out_" + c.id).join(", ");
    script += `
    - ({${output}}) -> {$.util.getInspectedObject} -> output`;

    return script;
    insertScript(script);
}

function insertScript(data) {
    $('#script').val(data);
}