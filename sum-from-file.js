import fs from 'fs'

function sumFromFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) return reject(err)
            const numbers = data.split(/\r?\n/)
            const sum = numbers.reduce((acc, num) => acc + Number(num), 0)
            resolve(sum)
        })
    })
}

sumFromFile('data/nums.txt')
    .then(sum => console.log('Sum:', sum))
    .catch(err => console.log('Cannot sum:', err))

