import { motion } from "framer-motion";
import Image from "next/image";
import { CDN_ASSETS, METADATA } from "@/lib/constants";

export const Overview = () => {
  return (
    <motion.div
      key="overview"
      className="max-w-3xl mx-auto md:mt-8"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: 0.3 }}
    >
      <div className="glass-card overflow-hidden">
        {/* Content Section */}
        <div className="py-10 px-6 flex flex-col gap-6 leading-relaxed">
          <div className="text-center space-y-6">
            {/* Avatar */}
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-2xl border-2 border-zinc-200 dark:border-zinc-700 shadow-lg overflow-hidden transition-all duration-300 hover:scale-105">
                <Image
                  src={CDN_ASSETS.PROFILE_PHOTO}
                  alt="John Doe Profile Photo"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Welcome Text */}
            <div className="space-y-3">
              <h2 className="font-heading text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Hi! I'm John's <span className="text-accent">{METADATA.AI_ASSISTANT_NAME}</span>
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                Ask me anything about <span className="font-semibold text-accent">John Doe</span>'s professional background. I'm here to help you understand his unique value proposition!
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
