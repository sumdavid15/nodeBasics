import ms from 'ms'
import fs from 'fs'


demoAsync()

function timeFormat(err, content) {
    if (err) return console.error('Error reading the file:', err);
    content.split(/\r?\n/).forEach(line => {
        console.log(ms(Number(line)))
    });
}

function demoAsync() {
    fs.readFile('data/time-stamp.txt', 'utf8', timeFormat)
}
