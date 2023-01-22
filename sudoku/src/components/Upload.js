import React, { Component, useState } from 'react';
import background from "./sudoku.jpg"
import particlesConfig from "../config/particles-config"
import ParticlesBackground from "./ParticlesBackground"
import { useCallback } from "react";
import Particles from "react-particles";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import axios from 'axios'


class Upload extends Component {

    state = {
        selectedFile: null,
        textOne: "Select Image",
        textTwo: "click here to upload",
        file: []
    }

    fileSelectHandler = (event) => {
        this.setState({
            textOne: "File Selected:",
            textTwo: event.target.files[0].name,
            file: event.target.files[0]
        });
        console.log(event.target.files[0]);
    }

    fileUploadHandler = () => {
        const formdata = new FormData(); 
        formdata.append('file', this.state.file);

        axios.post("http://localhost:8080/imageupload", formdata,{   
                headers: { "Content-Type": "multipart/form-data" } 
        })
    }

    render() {
        return (
                <div className = "upload">
                <ParticlesBackground />
                <Container component="main" maxWidth="xs">
                <Box
                sx={{ mt: 30, mb: 2 }}>
                    <section>
                    <label style={{color: "#FFFFFF"}}>
                        {this.state.textOne}
                        <br />
                        <span>{this.state.textTwo}</span>
                        <input
                            type = "file"
                            name = "images"
                            onChange = {this.fileSelectHandler}
                            multiple accept = "image/png, image/jpeg"
                        />
                    </label>
                    </section>
                </Box>
                <Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        href="/Result"
                        onClick={this.fileUploadHandler}
                        sx={{ mt: 10, mb: 2 }}
                    >
                    Upload
                    </Button>
                </Box>
            </Container>
        </div>
        );
    }
}

export default Upload

// export default function Upload() {
//     // const handleSubmit = (event) => {
//     //   event.preventDefault();
//     //   const data = new FormData(event.currentTarget);
//     //   console.log({
//     //     email: data.get('email'),
//     //     password: data.get('password'),
//     //   });
//     // };

//     return (
//       <div className = "home">
//         <ParticlesBackground />
//         <Container component="main" maxWidth="xs">
//             <Box>
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 href="/Upload"
//                 sx={{ mt: 50, mb: 2 }}
//               >
//                 Get Started!
//             </Button>
//             </Box>
//         </Container>
//       </div>
//     );
// }