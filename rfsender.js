"use strict";
var homeduino = require('homeduino');
module.exports = function (RED) {
    function RFSenderNode(config) {
        RED.nodes.createNode(this, config);
        this.pin = config.pin;
        this.protocol = config.protocol;
        var node = this;

        var Board = homeduino.Board;
        var board = new Board('gpio', {});

        this.on('input', function (msg) {
            board.connect().then(function () {
                board.rfControlSendMessage(parseInt(node.pin), 3, node.protocol, msg.payload).then(function () {
                    node.log('Sending on pin: ' + node.pin);
                }).done();
            }).done();
        });
    }
    RED.nodes.registerType("rfsender", RFSenderNode);
};
