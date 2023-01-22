import React, { Component, useState } from 'react';
import background from "./sudoku.jpg"
import particlesConfig from "../config/particles-config"
import ParticlesBackground from "./ParticlesBackground"
import { useCallback } from "react";
import Particles from "react-particles";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

class Result extends Component {

    state = {
        listItems: []
    }

    fetchData = async() => {
        var inf = await fetch("http://localhost:3000/answer.txt");
        var final = await inf.text();
        console.log(final);
        var lines = final.split("\n");;
        this.setState({
            listItems: lines.map((number) =>
                <li key={number} style={{
                color: "#FFFFFF",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'}}>{number}</li>
            )
        });
    }

    render() {
        return (
            <div className = "home">
                <ParticlesBackground />
                <Container component="main" maxWidth="xs">
                    <Box
                    sx={{ mt: 20, mb: 2 }}>
                        {this.state.listItems}
                    </Box>
                    <Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={this.fetchData}
                        sx={{ mt: 10, mb: 2 }}
                    >
                        See Result!
                    </Button>
                    </Box>
                    <Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        href="/Upload"
                        sx={{ mt: 10, mb: 2 }}
                    >
                        Go Back
                    </Button>
                    </Box>
                </Container>
            </div>
            );
    }
}

export default Result