TYPE_INFANTRY = 1;
TYPE_HORSEMEN = 2;
TYPE_ARCHERS = 3;

function Troop(name, type, size) {
    this.name = name;
    this.type = type;
    this.size = size;
}

exports.Troop = Troop;