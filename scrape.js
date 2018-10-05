const {PythonShell} = require("python-shell");


let options = {
    mode: 'text',
};

PythonShell.run('scrape.py', options, function (err, results) {
    if (err) throw err;
    console.log('results: ' +  results[0]);
});


// let pyshell = new PythonShell('scrape.py', {mode: 'text'});
// pyshell.on('message', function (message) {
//     // received a message sent from the Python script (a simple "print" statement)
//     console.log(message);
// });
//
// // end the input stream and allow the process to exit
// pyshell.end(function (err,code,signal) {
//     if (err) throw err;
//     console.log('The exit code was: ' + code);
//     console.log('The exit signal was: ' + signal);
//     console.log('finished');
//     console.log('finished');
// });