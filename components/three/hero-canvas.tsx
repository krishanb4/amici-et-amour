"use client"

import { Suspense, useMemo, useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useTexture } from "@react-three/drei"
import * as THREE from "three"

const vertex = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;   // 0..1
  uniform float uHover;
  varying vec2  vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;

    float dist = distance(uv, uMouse);
    float ripple = sin(dist * 14.0 - uTime * 2.2) * exp(-dist * 5.0) * 0.05 * uHover;
    float wave = sin(uv.x * 4.0 + uTime * 0.55) * 0.010
               + cos(uv.y * 3.2 + uTime * 0.5) * 0.010;
    pos.z += ripple + wave;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragment = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2  uMouse;       // 0..1
  uniform float uHover;
  uniform float uImageAspect; // w/h
  uniform float uPlaneAspect; // w/h
  varying vec2  vUv;

  vec2 coverUv(vec2 uv, float planeA, float imageA) {
    vec2 r = (planeA < imageA)
      ? vec2(planeA / imageA, 1.0)
      : vec2(1.0, imageA / planeA);
    return (uv - 0.5) * r + 0.5;
  }

  void main() {
    vec2 uvc = coverUv(vUv, uPlaneAspect, uImageAspect);

    // subtle chromatic displacement toward the cursor
    float d = distance(vUv, uMouse);
    vec2 dir = normalize(vUv - uMouse + 1e-4);
    vec2 off = dir * 0.004 * uHover * exp(-d * 4.0);

    float r = texture2D(uTexture, uvc + off).r;
    float g = texture2D(uTexture, uvc).g;
    float b = texture2D(uTexture, uvc - off).b;
    vec3 col = vec3(r, g, b);
    col = pow(col, vec3(0.96)); // gentle lift

    // fade toward porcelain on the left + top so overlaid ink text/nav stay readable
    vec3 porcelain = vec3(0.984, 0.980, 0.969);
    float leftMask = clamp((0.47 - vUv.x) / 0.26, 0.0, 1.0);
    float topMask  = clamp((vUv.y - 0.86) / 0.14, 0.0, 1.0) * 0.85;
    float botMask  = clamp((0.12 - vUv.y) / 0.12, 0.0, 1.0) * 0.4;
    float mask = clamp(max(max(leftMask, topMask), botMask), 0.0, 1.0);
    col = mix(col, porcelain, mask);

    gl_FragColor = vec4(col, 1.0);
  }
`

function HeroPlane({ src }: { src: string }) {
  const texture = useTexture(src)
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const { viewport, pointer } = useThree()
  const mouse = useRef(new THREE.Vector2(0.7, 0.5))
  const hover = useRef(0)

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.7, 0.5) },
      uHover: { value: 0 },
      uImageAspect: { value: 0.8 },
      uPlaneAspect: { value: 1 },
    }),
    [texture],
  )

  // image aspect once known
  const img = texture.image as HTMLImageElement | undefined
  if (img && img.width) uniforms.uImageAspect.value = img.width / img.height

  useFrame((state, delta) => {
    const u = matRef.current?.uniforms
    if (!u) return
    u.uTime.value += delta
    // pointer is -1..1; map to 0..1 (y flipped)
    const tx = pointer.x * 0.5 + 0.5
    const ty = pointer.y * 0.5 + 0.5
    mouse.current.x += (tx - mouse.current.x) * 0.06
    mouse.current.y += (ty - mouse.current.y) * 0.06
    u.uMouse.value.copy(mouse.current)
    const target = state.pointer.length() > 0 ? 1 : 0.5
    hover.current += (target - hover.current) * 0.05
    u.uHover.value = 0.5 + hover.current * 0.5
    u.uPlaneAspect.value = viewport.width / viewport.height
  })

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 48, 48]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
      />
    </mesh>
  )
}

export default function HeroCanvas({ src = "/hero.jpg" }: { src?: string }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 2], fov: 50 }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <HeroPlane src={src} />
      </Suspense>
    </Canvas>
  )
}
