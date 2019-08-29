const fs = require('fs')

class Ddt {
    constructor(path) {
        this.path = path
        this.data = {
            title:null,
            DIDs:[]
        }
        this.ddt = fs.readFileSync(this.path, {encoding: 'ascii'}).replace(/\r/g, '').split('\n')

        this.DELIMITER_ONLY = new RegExp(/,+/g)
        this.DID_CHECK = new RegExp(/\$[0-9A-F]{4}/gi)
        this.SUB_CHECK = new RegExp(/\$[0-9A-F]{2,4}/gi)
        this.BYTE_CHECK = new RegExp(/\[\d\]/g)
    }

    parse () {
        console.log('checking ' + this.ddt.length + ' lines\n')

        let i = 0
        let curDid = {}
        let curSub = {}
        let curByte = {}
        let lastDid = ''
        while(i < this.ddt.length) {
    
            if( this.rowIsEmpty(i) ) {
                i++
                continue
            }

            // if dict does not have a title, first entry is title
            if(!this.data.title) {
                this.data.title = this.ddt[i].replace(/,/g,'')
                i++
                continue
            }

            let byte = this.BYTE_CHECK.exec(this.ddt[i])
            if(byte) {
                console.log('found byte on line ' + i + ' - ' + byte)
                if(!curSub.bytes) {
                    curSub.bytes = []
                }
                curSub.bytes.push(byte[0])
                i++
                continue
            }

            let sub = this.SUB_CHECK.exec(this.ddt[i])
            if (sub) {
                // found sub
                console.log('found sub on line ' + i + ' - ' + sub)
                if(!curDid.subs) {
                    curDid.subs = []
                }
                let newSub = {'sub':sub[0]}
                curDid.subs.push(newSub)
                curSub = newSub
                i++
                continue
            }
            
            let did = this.DID_CHECK.exec(this.ddt[i])
            if (did) {
                // found DID
                console.log('found did on line ' + i + ' - ' + did)
                if(did[0] !== lastDid) {
                    let newDid = {'DID':did[0]}
                    this.data.DIDs.push(newDid)
                    curDid = newDid
                    lastDid = did[0]
                    i++
                    continue
                }
            }

            i++
        }
    }

    rowIsEmpty (i) {
        let match = this.DELIMITER_ONLY.exec(this.ddt[i])
        // console.log(i,match)
        
        if(match) {
            if( match[0] === match.input ){
                // line is empty, skip it
                // console.log('match', match, i)
                return true
            }
        }

        return false
    }

    outputJson () {

        fs.writeFileSync('output.json', JSON.stringify(this.data))
    }
}

let d = new Ddt('test.txt')
d.parse()
d.outputJson()