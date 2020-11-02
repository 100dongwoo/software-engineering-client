import React, { Component } from 'react';
import { TextField, MenuItem } from '@material-ui/core';
import './Uploadpage.css';
import axios from 'axios';

class Uploadpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
        };
    }
    handleFileInput(e) {
        this.setState({
            selectedFile: e.target.files[0],
        });
    }

    handlePost() {
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);

        return axios
            .post('/api/upload', formData)
            .then((res) => {
                alert('성공');
            })
            .catch((err) => {
                alert('실패');
            });
    }

    render() {
        return (
            <div>
                <div>
                    <br></br>
                    <br></br>
                    <p className="Center">
                        <b>게시판</b>
                    </p>
                    <div className="UploadTitle">
                        <br></br>
                        <br></br>
                        <TextField
                            variant="filled"
                            label="제목"
                            fullWidth
                            defaultValue="제목을 입력해주세요."
                        />
                    </div>
                    <br></br>
                    <br></br>
                    <div className="UploadText">
                        <TextField
                            variant="filled"
                            label="내용"
                            multiline
                            rows={20}
                            fullWidth
                            defaultValue="내용을 입력해주세요."
                        />
                    </div>
                    <br></br>

                    <div className="FileUp">
                        <p></p>
                        &nbsp;&nbsp;첨부 이미지&nbsp;&nbsp;&nbsp;&nbsp;
                        <input
                            type="file"
                            name="file"
                            onChange={(e) => this.handleFileInput(e)}
                        />
                        <p></p>
                    </div>
                    <br></br>

                    <div className="Center1">
                        <button
                            className="ButtonStyle1"
                            type="button"
                            onClick={this.handlePost()}
                        >
                            등록
                        </button>

                        <button
                            className="ButtonStyle2"
                            type="button"
                            onClick={null}
                        >
                            취소
                        </button>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                </div>
            </div>
        );
    }
}

export default Uploadpage;
