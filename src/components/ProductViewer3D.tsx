
import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Cylinder } from '@react-three/drei';
import { Button } from '@/components/ui/button';
import { RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

interface Product3DProps {
  productType?: 'box' | 'sphere' | 'cylinder';
  color?: string;
}

const Product3D = ({ productType = 'box', color = '#4f46e5' }: Product3DProps) => {
  const meshRef = useRef<any>();

  const renderProduct = () => {
    switch (productType) {
      case 'sphere':
        return (
          <Sphere ref={meshRef} args={[1, 32, 32]}>
            <meshStandardMaterial color={color} />
          </Sphere>
        );
      case 'cylinder':
        return (
          <Cylinder ref={meshRef} args={[0.8, 0.8, 1.5, 32]}>
            <meshStandardMaterial color={color} />
          </Cylinder>
        );
      default:
        return (
          <Box ref={meshRef} args={[1.5, 1.5, 1.5]}>
            <meshStandardMaterial color={color} />
          </Box>
        );
    }
  };

  return (
    <group>
      {renderProduct()}
    </group>
  );
};

const ProductViewer3D = ({ productType, color }: Product3DProps) => {
  const [controlsEnabled, setControlsEnabled] = useState(true);

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden">
      <Canvas camera={{ position: [3, 3, 3], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Product3D productType={productType} color={color} />
        
        <OrbitControls 
          enabled={controlsEnabled}
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      <div className="absolute bottom-4 left-4 flex space-x-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setControlsEnabled(!controlsEnabled)}
          className="bg-white/80 backdrop-blur-sm"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="absolute top-4 right-4 text-xs text-gray-600 bg-white/80 backdrop-blur-sm px-2 py-1 rounded">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};

export default ProductViewer3D;
