import React, { Component } from 'react';
import './Upload.css';
import Dropzone from '../Dropzone/Dropzone';
import Progress from '../Progress/Progress';

class Upload extends Component {
    constructor(props) {
      super(props);
      this.state = {
        files: [],
        uploading: false,
        uploadProgress: {},
        successfullUpload: false
      };

      this.onFilesAdded = this.onFilesAdded.bind(this);
      this.uploadFiles = this.uploadFiles.bind(this);
      this.sendRequest = this.sendRequest.bind(this);
      this.renderActions = this.renderActions.bind(this);
    }

    onFilesAdded(files) {
      this.setState(prevState => ({
        files: prevState.files.concat(files)
      }));
    }

    renderProgress(file) {
      const uploadProgress = this.state.uploadProgress[file.name];
      if (this.state.uploading || this.state.successfullUpload) {
        return (
          <div className="ProgressWrapper">
            <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
            <img
              className="CheckIcon"
              alt="done"
              src="baseline-check_circle_outline-24px.svg"
              style={{
                opacity:
                  uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
              }}
            />
          </div>
        );
      }
    }

    renderActions() {
      if (this.state.successfullUpload) {
        return (
          <button
            onClick={() =>
              this.setState({ files: [], successfullUpload: false })
            }
          >
            Clear
          </button>
        );
      } else {
        return (
          <button
            disabled={this.state.files.length <= 0 || this.state.uploading}
            onClick={this.uploadFiles}
          >
            Upload and Build
          </button>
        );
      }
    }

    async uploadFiles() {
      this.setState({ uploadProgress: {}, uploading: true });
      const promises = [];
      this.state.files.forEach(file => {
        promises.push(this.sendRequest(file));
      });
      try {
        await Promise.all(promises);
    
        this.setState({ successfullUpload: true, uploading: false });
      } catch (err) {
        // Not Production ready! Do some error handling here instead...
        console.log(err);
        this.setState({ successfullUpload: true, uploading: false });
      }
    }
  
    sendRequest(file) {
      return new Promise((resolve, reject) => {
       const req = new XMLHttpRequest();
     
       req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
         const copy = { ...this.state.uploadProgress };
         copy[file.name] = {
          state: "pending",
          percentage: (event.loaded / event.total) * 100
         };
         this.setState({ uploadProgress: copy });
        }
       });
        
       req.upload.addEventListener("load", event => {
         // ... -> spread attribute JSX
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
       });
        
       req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
       });
     
       const formData = new FormData();
       formData.append("file", file, file.name);
     
       req.open("POST", "http://localhost:3000/upload");
       req.send(formData);
      });
     }
  
    render() {
      return (
        <div className="Upload">
          <span className="Title">Upload a FASTA file.</span>
          
          <div className="Content">
            <div>
              <Dropzone
                onFilesAdded={this.onFilesAdded}
                disabled={this.state.uploading || this.state.successfullUpload}
              />
              <br/>
              <span className="Title">Drag and drop or click to browse files.</span>
            </div>
            <div className="Files">
              {this.state.files.map(file => {
                return (
                  <div key={file.name} className="Row">
                    <span className="Filename">{file.name}</span>
                    {this.renderProgress(file)}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="Actions">{this.renderActions()}</div>
        </div>
      );
    }
}

export default Upload;