import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticleBackground() {
    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                background: { color: "#0f172a" },
                fpsLimit: 60,
                interactivity: {
                    events: { onHover: { enable: true, mode: "repulse" } },
                    modes: { repulse: { distance: 100 } },
                },
                particles: {
                    color: { value: "#38bdf8" },
                    links: { color: "#38bdf8", distance: 150, enable: true, opacity: 0.4, width: 1 },
                    collisions: { enable: true },
                    move: { enable: true, speed: 2 },
                    number: { value: 60 },
                    opacity: { value: 0.5 },
                    shape: { type: "circle" },
                    size: { value: { min: 1, max: 4 } },
                },
                detectRetina: true,
            }}
        />
    );
};