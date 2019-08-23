import { parse } from './SignalParse'

exports.processFile = (data) => {

    data = data.split('\n')
    let parsedData = []

    for (let i = 0; i < data.length; i++) {
        
        let p = parse(data[i])
        if (p){
            parsedData.push(p)
        }
    }

    return parsedData
}