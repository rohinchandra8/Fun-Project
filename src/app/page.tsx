'use client';

import { useState, useRef } from 'react';
import { Button } from '@headlessui/react';
import { Dialog } from '@headlessui/react';

export default function Home() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setIsModalOpen(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-b from-green-600 to-green-500 bg-clip-text text-transparent pb-0.5 leading-normal">
          AI Swing Coach
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Perfect your golf swing with AI-powered analysis
        </p>
      </div>
      <div className="w-full max-w-2xl p-8 rounded-xl border-2 border-dashed transition-all duration-200 ease-in-out backdrop-blur-sm bg-white/30">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="p-4 rounded-full bg-green-100">
            {/* Golf swing icon image */}
            <img 
              src="/icons/Swing_Icon.png" 
              alt="Golf swing icon" 
              className="w-12 h-12 object-contain mx-auto"
            />
          </div>
          <div className="space-y-2">
            <p className="text-xl font-semibold text-gray-700">
              {videoFile ? videoFile.name : 'No video selected'}
            </p>
            <p className="text-sm text-gray-500">
              {videoFile 
                ? `${(videoFile.size / (1024 * 1024)).toFixed(2)} MB` 
                : 'Click upload to select your video'}
            </p>
          </div>
          <input 
            type="file" 
            accept="video/*" 
            className="hidden" 
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <Button
            type="button"
            className="mt-4 px-8 py-3 bg-green-500 text-white hover:bg-green-600 rounded-lg font-bold transition-all duration-200 shadow-lg shadow-green-500/20 cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          >
            Upload
          </Button>
          {videoFile && (
            <button 
              className="mt-4 px-8 py-3 bg-green-600 text-white hover:bg-green-700 rounded-lg font-medium transition-colors duration-200 shadow-lg shadow-green-600/20"
              onClick={() => {
                // Handle upload here
                console.log('Uploading:', videoFile);
              }}
            >
              Analyze Swing
            </button>
          )}
        </div>
      </div>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-3xl h-[600px] transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-gray-500 hover:text-gray-700"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <Dialog.Title 
              as="h3" 
              className="text-2xl font-bold text-center text-gray-900 mb-8"
            >
              Select Camera View
            </Dialog.Title>
            <div className="grid grid-cols-2 gap-8 h-[calc(100%-6rem)]">
              {/* Left Column - Down The Line */}
              <div className="space-y-8 p-8 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex flex-col items-center justify-between">
                <div className="text-center space-y-4">
                  <h4 className="text-xl font-semibold text-gray-900">Down The Line View</h4>
                  <p className="text-sm text-gray-500">
                    Record from behind in line with the target. This angle helps analyze swing path, plane, and club position.
                  </p>
                </div>
                <div className="w-32 h-32">
                  <img 
                    src="/icons/DTL_Logo.webp" 
                    alt="Down The Line View Icon" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <Button
                  type="button"
                  className="w-full px-6 py-3 bg-green-500 text-white hover:bg-green-600 rounded-lg font-bold transition-all duration-200 shadow-md"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload DTL View
                </Button>
              </div>

              {/* Right Column - Head On */}
              <div className="space-y-8 p-8 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex flex-col items-center justify-between">
                <div className="text-center space-y-4">
                  <h4 className="text-xl font-semibold text-gray-900">Head On View</h4>
                  <p className="text-sm text-gray-500">
                    Record facing the golfer. This angle helps analyze body position, alignment, and weight transfer.
                  </p>
                </div>
                <div className="w-32 h-32">
                  <img 
                    src="/icons/HeadOn_Logo_transparent.png" 
                    alt="Head On View Icon" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <Button
                  type="button"
                  className="w-full px-6 py-3 bg-green-500 text-white hover:bg-green-600 rounded-lg font-bold transition-all duration-200 shadow-md"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Head On View
                </Button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </main>
  );
}
