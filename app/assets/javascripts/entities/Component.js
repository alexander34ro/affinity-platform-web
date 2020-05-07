class Component {
    constructor(name, config_options) {
        this.id = 0
        this.type = "component";
        this.name = name;
        this.config_options = config_options;
        this.input = '';
        this.output = '';
    }

    toString() {
        return this.name;
    }
}

function extractName(e) {
    debugger;
    const config_options = JSON.parse(e.currentTarget.dataset.configOptions);
    const default_values = JSON.parse(e.currentTarget.dataset.default);

    let o = new Component();
    o.name = e.currentTarget.firstElementChild.innerText;
    o.config_options = {};
    if (default_values.length > 0) {
        for (let i = 0, l = config_options.length; i < l; i++) {
            o.config_options[config_options[i]] = default_values[i];
        }
    }

    return o;
}