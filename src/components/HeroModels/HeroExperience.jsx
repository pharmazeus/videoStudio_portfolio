import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Clapperboard } from "./Clapperboard";
import HeroLights from "./HeroLights";

const HeroExperience = () => {
  const isTablet = useMediaQuery({ query: "(max-width: 1024px " });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  return (
    <Canvas camera={{ position: [-2, 0, 0], fov: 45 }}>
      <OrbitControls
        enablePan={false}
        enableZoom={!isTablet}
        maxDistance={30}
        minDistance={10}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 4}
      />
      <HeroLights />
      <group
        scale={isMobile ? 0.4 : 0.5}
        position={[0, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      >
        <Clapperboard />
      </group>
    </Canvas>
  );
};

export default HeroExperience;
