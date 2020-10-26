import React, {useState} from 'react';
import axios from 'axios';
import {Message} from './Message';
import {ProgressBar} from './ProgressBar';

export const Upload = () => {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState({});
  const [progressPct, setProgressPct] = useState(0);

  const onChange = e => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name); 
    } else {
      setFile('');
      setFileName('Choose File'); 
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!file || file.length === 0) {
      setMessage({msg: 'No file selected', msgType: 'danger'});
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setProgressPct(
            parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
          )

          // Clear progress
          setTimeout(() => setProgressPct(0), 3000);
        }
      });
      
      setUploadedFile({
        fileName: res.data.filename, 
        filePath: `images/${res.data.filename}`
      });
      setFile('');
      setFileName('Choose File'); 
      setMessage({msg: 'File uploaded successfully', msgType: 'success'});
    } catch (error) {
      setMessage({msg: error.response.data.msg, msgType: 'danger'});
    }
  };

  return (
    <div className="container h-100">
      <div className="row align-items-center h-100">
        <div className="col-md"></div>
        <div className="col-md m-auto">
          {message.msg && <Message {...message} />}
          <div className="form-container">
            <form onSubmit={onSubmit}>
              <div className="input-group mb-3">
                <div className="custom-file">
                  <input type="file" name="file" className="custom-file-input" id="inputGroupFile01" onChange={onChange} />
                  <label className="custom-file-label" htmlFor="inputGroupFile01">{fileName}</label>
                </div>
              </div>
              {progressPct > 0 && <ProgressBar pct={progressPct}/>}
              <input
                type="submit"
                value="Upload"
                className="btn btn-outline-primary btn-block"
              />
            </form>
            { uploadedFile && (
              <div className="text-center mt-4">
                <span>{uploadedFile.fileName}</span>
                <img style={{width: '100%'}} src={uploadedFile.filePath} alt=""/>
              </div> 
            )}
          </div>
        </div>
        <div className="col-md"></div>
      </div>
    </div>
  )
}
