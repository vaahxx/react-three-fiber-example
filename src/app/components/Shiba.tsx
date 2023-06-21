"use client";
import { useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export function Shiba() {
  const Model = () => {
    const fileUrl = "/shiba/scene.gltf";
    const mesh = useRef<ThreeElements.mesh>();
    const gltf = useLoader(GLTFLoader, fileUrl);

    useEffect(() => {
      return () => {
        mesh.current?.parent?.remove(mesh.current);
      };
    }, []);

    useFrame(() => {
      if (mesh.current) {
        mesh.current.rotation.y += 0.01;
      }
    });

    return (
      <>
        <mesh ref={mesh}>
          <primitive object={gltf.scene} />
        </mesh>
      </>
    );
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <Canvas style={{ height: "600px", width: "600px" }}>
        <OrbitControls />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Model />
      </Canvas>
    </div>
  );
}
