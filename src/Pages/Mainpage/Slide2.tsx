import React from "react";
import { withSlide } from "../../HOC/withSlide";

const Slide2: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="max-w-6xl w-full px-12 h-[80%] flex flex-col">

                {/* Header */}
                <div className="mb-12">
                    <h2 className="font-grotesk text-5xl font-bold mb-4 text-left text-black dark:text-white">
                        Watermarking
                    </h2>
                    <div className="w-20 h-1 bg-blue-700 dark:bg-blue-500" />
                </div>

                {/* Content - Split Layout */}
                <div className="flex flex-col md:flex-row gap-16 flex-1 items-start">

                    {/* Left Column: Proposal */}
                    <div className="md:w-1/2">
                        <h3 className="text-3xl font-semibold mb-6 text-blue-800 dark:text-blue-400">
                            Proposal
                        </h3>
                        <ul className="list-disc pl-6 space-y-4 text-xl text-gray-700 dark:text-gray-300 marker:text-blue-600 dark:marker:text-blue-500">
                            <li>
                                <span className="font-medium text-gray-900 dark:text-gray-100">Copyright protection technology</span>, authentication
                            </li>
                            <li>
                                Invisible
                            </li>
                        </ul>
                    </div>

                    {/* Right Column: History */}
                    <div className="md:w-1/2">
                        <h3 className="text-3xl font-semibold mb-6 text-blue-800 dark:text-blue-400">
                            History
                        </h3>
                        <div className="space-y-8">

                            {/* Traditional Watermarking */}
                            <div>
                                <h4 className="text-2xl font-medium mb-3 text-gray-800 dark:text-gray-200">
                                    Traditional watermarking
                                </h4>
                                <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700 dark:text-gray-300 marker:text-gray-400">
                                    <li>
                                        Embedding information in texture-rich regions
                                        <ul className="list-[circle] pl-6 mt-1 text-gray-600 dark:text-gray-400">
                                            <li>LSB</li>
                                        </ul>
                                    </li>
                                    <li>
                                        Encoding watermarks in the <span className="font-semibold text-gray-900 dark:text-gray-100">frequency domain</span>
                                        <ul className="list-[circle] pl-6 mt-1 text-gray-600 dark:text-gray-400">
                                            <li>DWT / DFT</li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>

                            {/* Limitation */}
                            <div>
                                <h4 className="text-2xl font-medium mb-3 text-gray-800 dark:text-gray-200">
                                    Limitation for diffusion model
                                </h4>
                                <ul className="list-disc pl-6 space-y-2 text-lg text-gray-700 dark:text-gray-300 marker:text-gray-400">
                                    <li>geometric deformation</li>
                                </ul>
                            </div>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default withSlide(Slide2);