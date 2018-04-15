module.exports = function(val, options) {
    if (arguments.length !== 2) {
        throw new Error('helper "flag" needs 1 arguments');
    }
    if (val === "1" || val === "2" || val === "3") {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
}