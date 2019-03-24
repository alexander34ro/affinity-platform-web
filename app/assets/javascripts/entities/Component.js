class Component {
    constructor(name, command) {
        this.name = name;
        this.command = command;
    }

    toString() {
        return this.name;
    }
}

function extractName(e) {
    let o = new Component();
    o.name = e.currentTarget.firstElementChild.innerText;
    o.command = 'yo';
    return o;
}