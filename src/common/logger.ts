var logger = exports;
logger.debugLevel = 'error';
logger.log = function (level: any, message: string) {
    var levels = ['info', 'warn', 'error'];
    if (levels.indexOf(level) <= levels.indexOf(logger.debugLevel)) {
        if (typeof message !== 'string') {
            message = JSON.stringify(message);
        };
        console.log(level + ': ' + message);
    }
}