'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function Home() {
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file?.type.startsWith('video/')) {
      setVideoFile(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': []
    },
    multiple: false
  });

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
      
      <div 
        {...getRootProps()} 
        className={`w-full max-w-2xl p-8 rounded-xl border-2 border-dashed transition-all duration-200 ease-in-out backdrop-blur-sm cursor-pointer
          ${isDragActive 
            ? 'border-green-500 bg-green-50/50' 
            : 'border-green-300 bg-white/30 hover:border-green-400 hover:bg-white/40'
          }`}
      >
        <input {...getInputProps()} />
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
              {videoFile ? videoFile.name : 'Upload your swing video'}
            </p>
            <p className="text-sm text-gray-500">
              {videoFile 
                ? `${(videoFile.size / (1024 * 1024)).toFixed(2)} MB` 
                : 'Drag and drop or click to select your video'}
            </p>
          </div>
          
          {videoFile && (
            <button 
              className="mt-6 px-8 py-3 bg-green-600 text-white hover:bg-green-700 rounded-lg font-medium transition-colors duration-200 shadow-lg shadow-green-600/20"
              onClick={(e) => {
                e.stopPropagation();
                // Handle upload here
                console.log('Uploading:', videoFile);
              }}
            >
              Analyze Swing
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
