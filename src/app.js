import React from 'react';
import fs from 'fs';
import FileInput from './components/FileInput'
import ProcessFile from './components/ProcessFile'

export default class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            curFile:null,
            curData:null,
            loadingData:false,
            loadProgress:0
        }
      }

    handleFile = (e) => {
        console.log('handleFile data',e.target.files[0])
        console.log('file size', e.target.files[0].size)

        this.setState({curData:null})

        fs.readFile(e.target.files[0].path, 'utf8', (e, data) => {
            if(e) console.error(e)
            //else console.log(data)
           
            this.setState({curData:data,
                            loadingData:false})
        })

        this.setState({
            curFile:e.target.files[0],
            loadingData:true
        })
    }

    handleStream = (e) => {
        this.setState({curData:null})

        let reader = fs.createReadStream(e.target.files[0].path, {
            encoding: 'ascii'
        })

        this.setState({loadingData:true})
    
        let data = ''
        let curDataSize = 0
        let progress = 0
        let totalDataSize = e.target.files[0].size

        let updateProgress = (c) => {
            data+=c
            curDataSize += c.length
            progress = (curDataSize / totalDataSize * 100)
            this.setState({loadProgress: progress})
        }

        reader.on('data', function(chunk) {
            updateProgress(chunk)
        })

        let setComplete = () => {
            data = data.split('\n')
            this.setState({curData: data, loadingData: false})
        }
    
        reader.on('close', function () {
            setComplete()
        })
    }

    render() {

        let displayProcessFile = null
        if(this.state.curData){
            let d = this.state.curData.slice(0,20)
            displayProcessFile = <ProcessFile data={d} />
        }

        let displayLoading = null
        if(this.state.loadingData) {
            displayLoading = 'Loading...' + parseInt(this.state.loadProgress) + '%'
        }

        return (
            <div className='section'>
                <FileInput handleChange={this.handleStream} />
                {displayLoading}
                {displayProcessFile}
            </div>
        );
    }
}
