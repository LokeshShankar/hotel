/* istanbul ignore file */
import log from 'loglevel';
import remote from 'loglevel-plugin-remote';
import axios from 'axios';

const customJSON = log => ({
    msg: log.message,
    level: log.level.label,
    stacktrace: log.stacktrace
});
   
remote.apply(log, { format: customJSON, url: 'http://34.198.103.53:8010/log' })
log.enableAll();

function logger(level, msg) {
    if(level === 'info')
        log.info(msg);
    if(level === 'warn')
        log.warn(msg);
    if(level === 'error')
        log.error(msg);
    if(level === 'trace')
        log.trace(msg);
    if(level === 'debug')
        log.debug(msg);
}
 
export default logger;