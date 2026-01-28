import { Canvas } from "@react-three/fiber";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState, Suspense } from "react";
import { gsap } from "gsap";
import "./index.sass";
import { useGLTF, Html, useProgress } from "@react-three/drei";
import Homepage from "../index";
import React from "react";
import downArrow from "../../../assets/down-arrow.png";
// import { OrbitControls } from "@react-three/drei";

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="model-loader">
        <div className="loader-content">
          <div className="loader-spinner"></div>
          <div className="loader-text">{Math.round(progress)}% loaded</div>
          <div className="loader-subtitle">Loading 3D MacBook model...</div>
        </div>
      </div>
    </Html>
  );
}

function SectionMacBook({ insideMac = false }) {
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const screenFlipRef = useRef(null);
  const screenRef = useRef(null);
  const keyboardRef = useRef(null);
  const screenFrameRef = useRef(null);
  const dragRef = useRef(null);
  const htmlRef = useRef(null);

  // const scrollMultiplier = useRef(-100)
  const [ready, setReady] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (modelRef.current && ready) {
        gsap.registerPlugin(ScrollTrigger);

        const t = gsap.timeline({
          scrollTrigger: {
            trigger: canvasRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 3.2,
            pin: true,
            pinSpacing: false,
            onUpdate: function (self) {
              const scrollProgress = self.progress;
              setScrollOffset(scrollProgress * -8000);
              // htmlRef.current.style.overflow = "visible";

              if (htmlRef.current && htmlRef.current.style) {
                if (scrollProgress > 0.01) {
                  htmlRef.current.style.overflow = "visible";
                  // if (scrollProgress > 0.98) {
                  //   htmlRef.current.style.overflow = "hidden";
                  // }
                } else {
                  htmlRef.current.style.overflow = "hidden";
                }
              }
            },
          },
        });

        // scene 1
        t.to(htmlRef.current.style, {
          opacity: 1,
          duration: 6,
          ease: "power1",
        });
        t.to(
          screenFlipRef.current.rotation,
          {
            x: Math.PI / 6,
            duration: 12,
            ease: "power3.inOut",
          },
          "-=12",
        );
        t.to(
          modelRef.current.scale,
          {
            x: 0.5,
            y: 0.5,
            z: 0.5,
            duration: 12,
          },
          "-=12",
        );

        // scene 2
        t.to(modelRef.current.position, {
          z: -8,
          y: -2.5,
          duration: 12,
        });
        t.to(
          modelRef.current.rotation,
          {
            z: 0.1,
            duration: 12,
          },
          "-=12",
        );
        t.to(
          screenRef.current.scale,
          {
            y: 1.25,
            x: 1.25,
            z: 1.25,
            duration: 12,
          },
          "-=12",
        );
        t.to(
          screenRef.current.position,
          {
            y: 5,
            z: -2.0,
            x: 0.25,
            duration: 12,
          },
          "-=12",
        );
        t.to(screenRef.current.rotation, {
          y: -0.1,
          x: -0.2,
          z: -0.1,
          duration: 12,
          // onUpdate: function() {
          //   currentTiltX = 0;
          //   currentTiltY = 0;
          // },
        });

        // PUT SOME SCENES HERE

        t.to(screenRef.current.rotation, {
          y: 0.2,
          x: 0.35,
          z: 0.45,
          duration: 96,
          // onUpdate: function() {
          //   currentTiltX = 0;
          //   currentTiltY = 0;
          // },
        });
        t.to(
          screenRef.current.position,
          {
            y: 0,
            x: 0,
            z: -5,
            duration: 96,
          },
          "-=96",
        );
        t.to(screenRef.current.rotation, {
          y: 0,
          x: -0.5,
          z: -0.75,
          duration: 96,
          // onUpdate: function() {
          //   currentTiltX = 0;
          //   currentTiltY = 0;
          // },
        });
        t.to(
          screenRef.current.position,
          {
            y: 0,
            x: -0.75,
            z: -3,
            duration: 96,
          },
          "-=96",
        );

        // Last Scene
        t.to(screenRef.current.rotation, {
          y: 0,
          x: 0,
          z: 0,
          duration: 96,
          // onUpdate: function() {
          //   currentTiltX = 0;
          //   currentTiltY = 0;
          // },
        });
        t.to(
          screenRef.current.position,
          {
            y: 0,
            x: 0,
            z: 0,
            duration: 96,
          },
          "-=96",
        );
        t.to(
          screenRef.current.scale,
          {
            y: 1,
            x: 1,
            z: 1,
            duration: 96,
          },
          "-=96",
        );
        t.to(
          modelRef.current.scale,
          {
            y: 0.75,
            x: 0.75,
            z: 0.75,
            duration: 96,
          },
        );
        t.to(
          modelRef.current.rotation,
          {
            y: 0,
            x: 0,
            z: 0.1,
            duration: 96,
          },
          "-=96",
        );
        t.to(
          modelRef.current.position,
          {
            y: 0,
            x: 0,
            z: 0,
            duration: 96,
          },
          "-=96",
        );

        // mac closing

        // t.to(screenFlipRef.current.rotation, {
        //   x: (Math.PI / 2),
        //   duration: 128,
        //   ease: "power3.inOut",
        // });
        // t.to(htmlRef.current.style, {
        //   opacity: 0,
        //   duration: 64,
        //   ease: "power4.out",
        // }, "-=64");

        const floatingAnimation = gsap.to(modelRef.current.position, {
          y: "-=0.9",
          z: "-=0.9",
          x: "+=0.5",
          duration: 3,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
        });

        // let currentTiltX = 0;
        // let currentTiltY = 0;

        // const handleMouseMove = (event) => {
        //   if (screenRef.current && t.progress() >= 0.05) {
        //     const { clientX, clientY } = event;
        //     const { innerWidth, innerHeight } = window;
        //     const x = (clientX / innerWidth) * 2 - 1;
        //     const y = (clientY / innerHeight) * 2 - 1;
        //     currentTiltX = x * 0.5;
        //     currentTiltY = y * -0.5;
        //     gsap.to(screenRef.current.rotation, {
        //       x: -currentTiltY,
        //       z: -currentTiltX,
        //       duration: 0.5,
        //       ease: "power2.out",
        //       overwrite: true,
        //     });
        //   }
        // };

        // const handleTouchMove = (event) => {
        //   if (screenRef.current && t.progress() >= 0.01 && event.touches.length > 0) {
        //     const { clientX, clientY } = event.touches[0];
        //     const { innerWidth, innerHeight } = window;
        //     const x = (clientX / innerWidth) * 2 - 1;
        //     const y = (clientY / innerHeight) * 2 - 1;
        //     currentTiltX = x * 0.5;
        //     currentTiltY = y * -0.5;
        //     gsap.to(screenRef.current.rotation, {
        //       x: -currentTiltY,
        //       z: -currentTiltX,
        //       duration: 0.5,
        //       ease: "power2.out",
        //       overwrite: true,
        //     });
        //   }
        // };

        // window.addEventListener("mousemove", handleMouseMove);
        // window.addEventListener("touchmove", handleTouchMove, { passive: true });
        // return () => {
        //   window.removeEventListener("mousemove", handleMouseMove);
        //   window.removeEventListener("touchmove", handleTouchMove);
        // };
      }
    }, 100);
  }, [ready]);
  return (
    <div className="macbook_page" ref={canvasRef}>
      <div
        className={`canvas-macbook__container ${insideMac ? "canvas-macbook__container-insideMac" : ""}`}
      >
        <Canvas
          color="white"
          camera={{ position: [0, 0, 5], fov: 50 }}
          dpr={Math.min(window.devicePixelRatio, 2)}
        >
          <ambientLight intensity={50} />
          <directionalLight position={[10, 10, 5]} intensity={50} />
          <Suspense fallback={<Loader />}>
            <MacModel
              setReady={setReady}
              modelRef={modelRef}
              screenFlipRef={screenFlipRef}
              screenRef={screenRef}
              screenFrameRef={screenFrameRef}
              htmlRef={htmlRef}
              scrollOffset={scrollOffset}
            />
          </Suspense>
          {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
        </Canvas>
        <div ref={dragRef} className="macbook__drag-indicator">
          <span>Scroll my screen</span>
          <img src={downArrow} alt="down-arrow" />
        </div>
      </div>
    </div>
  );
}
function MacModel({
  setReady,
  modelRef,
  screenFlipRef,
  screenRef,
  screenFrameRef,
  htmlRef,
  scrollOffset,
}) {
  const gltfPath =
    process.env.NODE_ENV === "production"
      ? "https://aryanbatras.github.io/js-homepage/mac-draco.glb"
      : "http://localhost:4000/js-homepage/mac-draco.glb";
  const { nodes, materials } = useGLTF(gltfPath);
  useEffect(() => {
    setReady(true);
  }, [nodes]);
  const MemoizedHomepage = React.memo(Homepage);
  const MemoizedHtmlContent = React.memo(() => (
    <div className="canvas__mac-content">
      <MemoizedHomepage insideMac={true} />
    </div>
  ));
  return (
    <group
      ref={modelRef}
      dispose={null}
      onPointerEnter={() => (document.body.style.cursor = "grab")}
      onPointerLeave={() => (document.body.style.cursor = "auto")}
    >
      <group name="Scene" position={[0, 0, -8]}>
        <group
          ref={screenFlipRef}
          name="screenflip"
          rotation={[Math.PI / 2, 0, 0]}
          userData={{ name: "screenflip" }}
        >
          <group
            name="screen"
            position={[0, 2.96, -0.13]}
            rotation={[Math.PI / 2, 0, 0]}
            userData={{ name: "screen" }}
          >
            <mesh
              name="Cube008"
              castShadow
              receiveShadow
              geometry={nodes.Cube008.geometry}
              material={materials.aluminium}
            />
            <mesh
              name="Cube008_1"
              ref={screenFrameRef}
              castShadow
              receiveShadow
              geometry={nodes.Cube008_1.geometry}
              material={materials["matte.001"]}
            />
            <mesh
              name="Cube008_2"
              ref={screenRef}
              geometry={nodes.Cube008_2.geometry}
              position={[0,-1,0]}
            >
              <meshStandardMaterial transparent={true} opacity={0} />
              <Html
                style={{
                  // pointerEvents: "none",
                  opacity: "0",
                  width: "330px",
                  height: "204px",
                  overflow: "hidden",
                  position: "relative",
                }}
                ref={htmlRef}
                className="canvas__mac-content-container"
                rotation-x={-Math.PI / 2}
                position={[0, 0.6, -0.09]}
                transform
                occlude
              >
                <div
                  className="canvas__mac-content"
                  style={{
                    width: "660px",
                    height: "418px",
                    overflow: "visible",
                    position: "relative",
                    transform: `translateY(${scrollOffset}px) translateX(-25%)`,
                    transformOrigin: "top left",
                  }}
                >
                  <MemoizedHtmlContent />
                </div>
              </Html>
            </mesh>
          </group>
        </group>
        <mesh
          name="keyboard"
          castShadow
          receiveShadow
          geometry={nodes.keyboard.geometry}
          material={materials.keys}
          position={[1.79, 0.1, 3.45]}
          userData={{ name: "keyboard" }}
        />
        <group
          name="base"
          position={[0, -0.025, 3.39]}
          userData={{ name: "base" }}
        >
          <mesh
            name="Cube002"
            castShadow
            receiveShadow
            geometry={nodes.Cube002.geometry}
            material={materials.aluminium}
            // position={[0,-0.2,0]}
          />
          <mesh
            name="Cube002_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_1.geometry}
            material={materials.trackpad}
          />
        </group>
        <mesh
          name="touchbar"
          castShadow
          receiveShadow
          geometry={nodes.touchbar.geometry}
          material={materials.touchbar}
          position={[0, -0.03, 1.2]}
          userData={{ name: "touchbar" }}
        />
      </group>
    </group>
  );
}
export default SectionMacBook;
