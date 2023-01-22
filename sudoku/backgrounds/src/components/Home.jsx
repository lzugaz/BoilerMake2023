import Particles, { ISourceOptions } from "react-tsparticles";

export default function Home() {
    const handleSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get('email'),
        password: data.get('password'),
      });
    };

    // const options = {
    //   background: {
    //     color: "#0d47a1"
    //   },
    //   interactivity: {
    //     events: {
    //       onClick: {
    //         enable: true,
    //         mode: "push"
    //       },
    //       onHover: {
    //         enable: true,
    //         mode: "repulse"
    //       },
    //       resize: true
    //     },
    //     modes: {
    //       bubble: {
    //         distance: 400,
    //         duration: 2,
    //         opacity: 0.8,
    //         size: 40
    //       },
    //       push: {
    //         quantity: 4
    //       },
    //       repulse: {
    //         distance: 200,
    //         duration: 0.4
    //       }
    //     }
    //   },
    //   particles: {
    //     color: {
    //       value: "#ffffff"
    //     },
    //     links: {
    //       color: "#ffffff",
    //       distance: 150,
    //       enable: true,
    //       opacity: 0.5,
    //       width: 1
    //     },
    //     collisions: {
    //       enable: true
    //     },
    //     move: {
    //       direction: "none",
    //       enable: true,
    //       outMode: "bounce",
    //       random: false,
    //       speed: 6,
    //       straight: false
    //     },
    //     number: {
    //       density: {
    //         enable: true,
    //         value_area: 800
    //       },
    //       value: 80
    //     },
    //     opacity: {
    //       value: 0.5
    //     },
    //     shape: {
    //       type: "circle"
    //     },
    //     size: {
    //       random: true,
    //       value: 5
    //     }
    //   }
    // };

    return (
        <div style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1640537702474-3e503c21eefc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80")'
        }}>
        </div>

      // <Particles options={options} />
    );
  }  