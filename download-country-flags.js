import fs from 'fs'
import http from 'http'
import https from 'https'

downloadCountryFlags()
function downloadCountryFlags() {
    const countries = getCountries()
    console.log('countries:', countries)
    downloadFlags(countries)
        .then(() => {
            console.log('Your flags are ready')
        })
}

function getCountries() {
    const countries = readJsonFile('newCountries.json')
    const sortedCountry = countries.sort((a, b) => a.population - b.population)
    const topFivePopulated = sortedCountry.splice(-5)
    return topFivePopulated
}

function downloadFlags(countries) {
    createFile(countries)
    const countriesPrms = countries.map(country => {download(country.flags.png, `flag/${country.name.common}/${country.name.common}.png`)})
    return Promise.all(countriesPrms)
}

function createFile(countries) {
    countries.forEach(c => {
        if (!fs.existsSync(`flag/${c.name.common}`)) {
            fs.mkdirSync(`flag/${c.name.common}`)
        }
    })
}

function readJsonFile(path) {
    const str = fs.readFileSync(path, 'utf8')
    const json = JSON.parse(str)
    return json
}

function download(url, fileName) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(fileName)
        https.get(url, content => {
            content.pipe(file)
            file.on('error', reject)
            file.on('finish', () => {
                file.close()
                resolve()
            })
        })
    })
}
