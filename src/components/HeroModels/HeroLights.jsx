import React from "react";
import * as THREE from "three";
const HeroLights = () => {
  return (
    <>
      <spotLight
        position={[-10, 4, 0]}
        intensity={300}
        angle={1.3}
        penumbra={1}
        color="purple"
      />
      <primitive
        object={new THREE.RectAreaLight("PURPLE", 4, 3, 2)}
        position={[1, 3, 5]}
        intensity={30}
        rotation={[-Math.PI / 2, Math.PI / 4, 0]}
      ></primitive>
    </>
  );
};
export default HeroLights;
