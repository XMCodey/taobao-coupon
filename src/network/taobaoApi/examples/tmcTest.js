var TmcClient = require('../index.js').TmcClient;

var tmcClient = new TmcClient('*****','************************','default');

tmcClient.connect('ws://mc.api.daily.taobao.net/',
    function (message,status) {
        console.log(message);
    });