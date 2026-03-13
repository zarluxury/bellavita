'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const CompatibilitySection: React.FC = () => {

  const compatibility = [
    { name: 'Apple HomeKit', logo: '/images/compatibility/homekit.png' },
    { name: 'SmartThings', logo: '/images/compatibility/smartthings.png' },
    { name: 'Sonos', logo: '/images/compatibility/sonos.png' },
    { name: 'Google Home', logo: '/images/compatibility/googlehome.png' },
    { name: 'IFTTT', logo: '/images/compatibility/ifttt.png' },
    { name: 'Amazon Alexa', logo: '/images/compatibility/alexa.png' },
    { name: 'Zigbee', logo: '/images/compatibility/zigbee.png' },
    { name: 'Home Assistant', logo: '/images/compatibility/homeassistant.png' },
    { name: 'Apple AirPlay', logo: '/images/compatibility/airplay.png' },
    { name: 'Matter', logo: '/images/compatibility/matter.png' },
    { name: 'Thread', logo: '/images/compatibility/thread.png' }
  ]

  return (
    <section className="py-20 bg-gray-900">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Best in Class Smart Home Devices
          </h2>

          <p className="text-gray-400 text-lg">
            Compatible With
          </p>
        </motion.div>

        {/* Logos */}
        <div className="flex flex-wrap justify-center gap-6">

          {compatibility.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl px-6 py-4 flex items-center justify-center shadow-md hover:shadow-xl transition-all duration-300"
            >

              <Image
                src={item.logo}
                alt={item.name}
                width={140}
                height={40}
                className="object-contain h-14 w-auto"
              />

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  )
}

export default CompatibilitySection