let timeFilter = /[0-9]*\.[0-9]*/
let idFilter = /\s[0-9a-fA-F]{3}\s/
let transmitFilter = /[tT|rR][xX]/
let dataLengthFilter = /\s(?:\d){1,2}\s/g
let messageFilter = /([0-9a-fA-F]{2} +)+/g

exports.parse = (s) => {

    let time = s.match(timeFilter)
    let id = s.match(idFilter)
    let transmit = s.match(transmitFilter)
    let dataLength = s.match(dataLengthFilter)
    let message = s.match(messageFilter)

    if (message) {
        message = message[1]
    }

    if (dataLength)
        dataLength = dataLength[1]

    if (time && id && transmit && dataLength && message) {
        return [time, id, transmit, dataLength, message]
    } else {
        return null
    }
}