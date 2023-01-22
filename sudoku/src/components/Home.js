import * as React from 'react';
import background from "./sudoku.jpg"
import particlesConfig from "../config/particles-config"
import ParticlesBackground from "./ParticlesBackground"
import { useCallback } from "react";
import Particles from "react-particles";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function Home() {

    return (
      <div className = "home">
        <ParticlesBackground />
        <Container component="main" maxWidth="xs">
          <Box
          sx={{ mt: 30, mb: 2 }}>
              <h1
              style={{fontSize: 200, color: "#FFFFFF", display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                Welcome!
              </h1>
            </Box>
            <Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                href="/Upload"
                sx={{ mt: 10, mb: 2 }}
                style={{color: "#FFFFFF", display: 'flex',  justifyContent:'center', alignItems:'center'}}
              >
                Get Started!
            </Button>
            </Box>
        </Container>
      </div>
    );
  }  