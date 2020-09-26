var mongoose = require("mongoose");
var moment = require("moment");
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    since: Date,
    until: Date,
    componentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Component"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

bookSchema.statics.createInstance = function(since, until, componentId, userId) {
    return new this({
        since: since,
        until: until,
        componentId: componentId,
        userId: userId
    });
}

bookSchema.methods.daysOfBook = function() {
    return moment(this.until).diff(moment(this.since), "días") + 1;
}

module.exports = mongoose.model("Book", bookSchema);