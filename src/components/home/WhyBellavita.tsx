import React from "react";

const features = [
  { title: "All Controls in One App", description: "Control everything seamlessly from a single unified interface." },
  { title: "One Company for All Your Needs", description: "Lights, Automation, Security, Audio Video — everything handled by one expert team." },
  { title: "24×7 Monitoring", description: "Round-the-clock monitoring to ensure safety and reliability." },
  { title: "Proven Concept", description: "A future-ready system built on tested and trusted technology." },
  { title: "Design & Placement Support", description: "Expert guidance to ensure perfect placement and aesthetic integration." },
  { title: "Works with Existing Wiring", description: "No need for major renovations — integrates with your current setup." },
  { title: "Bespoke Design", description: "Customized solutions tailored to your lifestyle and preferences." },
  { title: "5 Years Warranty", description: "Long-term peace of mind with extended warranty coverage." },
  { title: "Well-Trained Professionals", description: "Highly skilled team ensuring smooth installation and support." },
];

const WhyBellavita = () => {
  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-16 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 uppercase">
          Why Bellavita?
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Transform your space with intelligent automation and premium design.
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
        
        {/* Left - Features */}
        <div className="space-y-4">
          {features.map((item, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-xl p-6 hover:border-gray-500 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/20"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="ml-4 w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center shrink-0 hover:border-gray-400 transition-colors">
                  <span className="text-gray-400 hover:text-white">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right - Images (Matching height of features) */}
        <div className="flex flex-col gap-6 h-full">
          <div className="flex-1 rounded-xl overflow-hidden min-h-75">
            <img 
              src="/images/whybellavita/image-1.jpg" 
              alt="Bellavita Home Automation" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 rounded-xl overflow-hidden min-h-50">
            <img 
              src="/images/whybellavita/image-2.jpg" 
              alt="Bellavita Smart Home" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default WhyBellavita;