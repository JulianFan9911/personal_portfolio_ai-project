import { motion } from "framer-motion";
import Image from "next/image";
import { CDN_ASSETS, METADATA } from "@/lib/constants";

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-4xl mx-auto md:mt-12 px-4"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.5 }}
    >
      <div className="rounded-2xl overflow-hidden bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] shadow-2xl shadow-primary/20 border border-primary/30">
        {/* Content Section */}
        <div className="py-12 px-8 flex flex-col gap-6 leading-relaxed">
          <div className="text-center space-y-6">
            {/* Avatar */}
            <div className="flex justify-center mb-4">
              <div className="w-32 h-32 rounded-full border-4 border-primary shadow-2xl shadow-primary/50 overflow-hidden ring-4 ring-primary/20 transition-all duration-300 hover:scale-105 hover:shadow-primary/70">
                <Image
                  src={CDN_ASSETS.PROFILE_PHOTO}
                  alt="John Doe Profile Photo"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Welcome Text */}
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary">
                Hi! I'm John's <span className="text-primary glow-primary">{METADATA.AI_ASSISTANT_NAME}</span> 👋
              </h2>
              <p className="text-base text-text-secondary max-w-2xl mx-auto">
                Ask me anything about <span className="font-semibold text-primary">John Doe</span> professional background. I'm here to help you understand his unique value proposition!
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
