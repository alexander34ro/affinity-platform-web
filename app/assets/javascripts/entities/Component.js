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
    let o = new Component();
    o.name = e.currentTarget.firstElementChild.innerText;
    o.config_options = {};
    return o;
}