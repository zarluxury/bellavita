import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Power, Lock, Lightbulb, PanelTop, Camera, Activity, Smartphone, Monitor, Cpu } from 'lucide-react';
import Card from '../ui/Card';
import Link from 'next/link';
import Image from 'next/image';

interface Product {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
  category: string;
  variants?: string[];
}

const Products: React.FC = () => {
  const smartSwitchProducts: Product[] = [
    // Coved Switch - Black Series
    {
      icon: <Power className="w-12 h-12" />,
      title: 'Coved Switch - Black',
      description: 'Premium black coved switches with sleek modern design and touch controls.',
      image: '/images/PRODUCT DRIVE/SMART LIGHT/2025 LIGHT/6.1.png',
      category: 'coved-switch-black',
      variants: [
        '1 Module Switch',
        '2 Touch + 1 Curtain + Socket',
        '6-8M 8 Touch + Socket',
        '4M 2 Touch + Curtain + Socket'
      ]
    },
    // Titan Switch Series
    {
      icon: <Power className="w-12 h-12" />,
      title: 'Titan Switch - Front View',
      description: 'Advanced titan series switches with modular configuration options.',
      image: '/images/PRODUCT DRIVE/SMART SWITCH/TITTAN SWITCH FRONT SIDE/1. 2M 2TOUCH + KNOB.png',
      category: 'titan-switch-front',
      variants: [
        '2M 2 Touch + Knob',
        '2M 4 Touch',
        '2M 6 Touch',
        '4M Knob + Socket',
        '4M 4 Touch + Socket',
        '4M 6 Touch + Socket',
        '6-8M Knob + 4 Touch + Socket',
        '6-8M Knob + 6 Touch + Socket'
      ]
    },
    {
      icon: <Power className="w-12 h-12" />,
      title: 'Titan Switch - Slant View',
      description: 'Elegant slant-design titan switches with ergonomic touch controls.',
      image: '/images/PRODUCT DRIVE/SMART SWITCH/TITTAN SWITCH  SLANTS SIDE VIEW/Slants/1. 6 SWITCH.png',
      category: 'titan-switch-slant',
      variants: [
        '6 Switch',
        'Knob + 4 Touch',
        'Knob + 6 Touch',
        '8 Touch',
        '12 Touch',
        'Knob + 8 Touch',
        'Knob + 12 Touch',
        '4 Touch + 1 Socket',
        '6 Touch + 1 Socket',
        '12 Touch + 1 Socket'
      ]
    },
    // White Series
    {
      icon: <Power className="w-12 h-12" />,
      title: 'White Series Switches',
      description: 'Clean white switches perfect for modern minimalist interiors.',
      image: '/images/PRODUCT DRIVE/SMART SWITCH/WHITE/10 TOUCH FRONT - WITHOUT BRAND - WHITE.png',
      category: 'white-series-switches',
      variants: [
        '10 Touch Front',
        '12M 5 Touch + 1 Fan + 1 Curtain + 3 Socket',
        '2 Touch + 1 Fan + Socket',
        '8 Touch + Socket',
        '8 Touch Front'
      ]
    }
  ];

  const otherProducts: Product[] = [
    {
      icon: <Lightbulb className="w-12 h-12" />,
      title: 'Smart Lights',
      description: 'RGB LED lights with millions of colors and automated scene management.',
      image: '/images/PRODUCT DRIVE/SMART LIGHT/OLD LIGHT/SSSSS.png',
      category: 'smart-lights'
    },
    {
      icon: <PanelTop className="w-12 h-12" />,
      title: 'Curtain Track & Motor',
      description: 'Automated curtain systems with quiet motors and precision tracking.',
      image: '/images/PRODUCT DRIVE/CURTAIN TRACK & MOTOR/CURTAIN MOTOR.png',
      category: 'curtain-track-motor'
    },
    {
      icon: <Lock className="w-12 h-12" />,
      title: 'Smart Locks',
      description: 'Biometric and app-controlled door locks with advanced security features.',
      image: '/images/PRODUCT DRIVE/LOCK/FINGERPRINT LOCK.png',
      category: 'smart-locks'
    },
    {
      icon: <Activity className="w-12 h-12" />,
      title: 'IR Remote & Sensors',
      description: 'Advanced sensors and remotes for comprehensive home automation.',
      image: '/images/PRODUCT DRIVE/IR REMOTE & SENSORE/HUMAN PRESENCE SENSOR.png',
      category: 'ir-remote-sensors'
    },
    {
      icon: <Monitor className="w-12 h-12" />,
      title: 'Multifunction Screens',
      description: 'Touch screen controllers for complete home management.',
      image: '/images/PRODUCT DRIVE/MUTIFUCATION SCREEN/10 INCH SCREEN.png',
      category: 'multifunction-screens'
    },
    {
      icon: <Cpu className="w-12 h-12" />,
      title: 'Drivers & Controllers',
      description: 'Essential control nodes and drivers for seamless automation.',
      image: '/images/PRODUCT DRIVE/DRIVER - CONTROLLER - NODE - RELAY/1 NODE.png',
      category: 'drivers-controllers'
    },
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: 'Gateways',
      description: 'Smart gateways for connecting all your home automation devices.',
      image: '/images/PRODUCT DRIVE/GATWAY/WIRED PRO.png',
      category: 'gateways'
    },
    {
      icon: <Camera className="w-12 h-12" />,
      title: 'Scene Switches',
      description: 'Programmable switches for custom scene control and automation.',
      image: '/images/PRODUCT DRIVE/SCENE SWITCH/1.png',
      category: 'scene-switches'
    }
  ];

  const allProducts = useMemo(() => [...smartSwitchProducts, ...otherProducts], []);

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Products
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover our comprehensive range of smart home products designed to transform 
            your living experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProducts.map((product, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/products/${product.category}`}>
                <Card className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-shadow duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-blue-400">
                      {product.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      {product.description}
                    </p>
                    {product.variants && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-400 mb-2">Available Variants:</p>
                        <div className="flex flex-wrap gap-1">
                          {product.variants.slice(0, 3).map((variant: string, idx: number) => (
                            <span key={idx} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                              {variant}
                            </span>
                          ))}
                          {product.variants.length > 3 && (
                            <span className="text-xs bg-gray-500/20 text-gray-300 px-2 py-1 rounded">
                              +{product.variants.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                    <div className="mt-4 text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
                      Explore Products →
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
