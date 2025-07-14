import React, { useEffect, useState, useCallback } from 'react'
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"
import { ChevronLeft, ChevronRight, Loader2, RefreshCw } from 'lucide-react'
import axios from 'axios'

export const Outfitlist = () => {
  const [outfitList, setOutfitList] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [imageStyleMapping, setImageStyleMapping] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [imageLoadingStates, setImageLoadingStates] = useState({})
  const [isPolling, setIsPolling] = useState(false)

  // Fetch images with individual loading states - Version 2 with setTimeout approach
  const fetchImageStyleMapping = useCallback(async (showPollingIndicator = false) => {
    try {
      if (showPollingIndicator) setIsPolling(true)

      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/ai/getgeneratedimage`, {
        headers: {
          authorization: `${localStorage.getItem("token")}`
        }
      })

      if (response.data.success === true) {
        const newImageMapping = response.data.data || {}

        // First update the image mapping
        setImageStyleMapping(prevMapping => {
          const updatedMapping = { ...prevMapping, ...newImageMapping }

          // Then update loading states based on what changed
          setTimeout(() => {
            setImageLoadingStates(prevStates => {
              const newStates = { ...prevStates }
              Object.keys(newImageMapping).forEach(index => {
                if (newImageMapping[index] && newImageMapping[index] !== prevMapping[index]) {
                  newStates[index] = false // Image loaded
                }
              })
              return newStates
            })
          }, 0)

          return updatedMapping
        })
      }
    } catch (error) {
      console.log("Error fetching image style mapping:", error);
    } finally {
      if (showPollingIndicator) setIsPolling(false)
    }
  }, [])

  // Initial data fetch
  useEffect(() => {
    const fetchOutfitList = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/ai/getgeneratedstyle`, {
          headers: {
            authorization: `${localStorage.getItem("token")}`
          }
        })

        if (response.data.success === true) {
          setOutfitList(response.data.data)

          // Initialize loading states for all images
          const initialLoadingStates = {}
          if (response.data.data?.relatedStyles) {
            response.data.data.relatedStyles.forEach((_, index) => {
              initialLoadingStates[index] = true // All images start as loading
            })
          }
          setImageLoadingStates(initialLoadingStates)
        } else {
          setError("Failed to fetch outfit list")
        }
      } catch (error) {
        setError("Error fetching outfit list")
      } finally {
        setLoading(false)
      }
    }

    fetchOutfitList()
  }, [])

  // Fetch images after outfit list is loaded
  useEffect(() => {
    if (outfitList) {
      fetchImageStyleMapping()
    }
  }, [outfitList, fetchImageStyleMapping])

  // Polling for new images every 10 seconds if there are still loading images
  useEffect(() => {
    if (!outfitList?.relatedStyles?.length) return

    const hasLoadingImages = Object.values(imageLoadingStates).some(isLoading => isLoading)

    if (hasLoadingImages) {
      const pollInterval = setInterval(() => {
        fetchImageStyleMapping(true)
      }, 10000) // Poll every 10 seconds

      return () => clearInterval(pollInterval)
    }
  }, [imageLoadingStates, outfitList, fetchImageStyleMapping])

  // Auto-play functionality - Fixed to check if data exists
  useEffect(() => {
    if (!isAutoPlaying || !outfitList?.relatedStyles?.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === outfitList.relatedStyles.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, outfitList?.relatedStyles?.length]);

  const nextSlide = () => {
    if (!outfitList?.relatedStyles?.length) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === outfitList.relatedStyles.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    if (!outfitList?.relatedStyles?.length) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? outfitList.relatedStyles.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleRefreshImages = () => {
    fetchImageStyleMapping(true)
  }

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className="text-amber-500 text-xl">Loading your outfit recommendations...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen'>
        <div className="text-red-500 text-xl">{error}</div>
        <div className="text-yellow-500 text-xl">Reload after some time...</div>
      </div>
    )
  }

  if (!outfitList) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className="text-gray-500 text-xl">No outfit data available</div>
      </div>
    )
  }

  // Safe access to current style
  const currentStyle = outfitList?.relatedStyles?.[currentIndex];
  const currentImageUrl = imageStyleMapping[currentIndex];
  const isCurrentImageLoading = imageLoadingStates[currentIndex];

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-5 mt-30 max-w-4xl mx-auto'>
      {/* Summary Section */}
      {outfitList.summary && (
        <div className="w-full mb-12">
          <div className="text-center text-amber-500 text-3xl font-bold mb-6">Your Style Summary</div>
          <div className="rounded-lg p-6 shadow-lg">
            <TextGenerateEffect words={outfitList.summary} className="text-gray-800 text-lg leading-relaxed" />
          </div>
        </div>
      )}

      {/* Related Styles Section */}
      {outfitList.relatedStyles && outfitList.relatedStyles.length > 0 && (
        <div className="w-full">
          <div className="text-center text-amber-500 text-3xl font-bold mb-8 flex items-center justify-center gap-4">
            Outfit Recommendations
            {isPolling && <Loader2 className="w-6 h-6 text-amber-500 animate-spin" />}
            <button
              onClick={handleRefreshImages}
              className="text-sm bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded-full transition-colors"
              disabled={isPolling}
            >
              <RefreshCw className={`w-4 h-4 ${isPolling ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="w-full max-w-7xl mx-auto p-6">
            <div
              className="relative bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {/* Main carousel content */}
              <div className="flex h-[600px]">

                {/* Left Column - Style Details (1/3 width) */}
                <div className="w-1/3 bg-white rounded-l-2xl p-6 flex flex-col">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-lg mb-6 text-center">
                    <h3 className="text-xl font-bold">
                      Style Option {currentIndex + 1}
                    </h3>
                    {isCurrentImageLoading && (
                      <p className="text-sm mt-2 opacity-90">
                        🎨 Image generating...
                      </p>
                    )}
                  </div>

                  <div className="flex-1 space-y-4 overflow-y-auto">
                    {currentStyle && Array.isArray(currentStyle) && currentStyle.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg border-l-4 border-amber-400 transform hover:scale-105 transition-all duration-300"
                        style={{
                          animationDelay: `${itemIndex * 0.1}s`
                        }}
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {itemIndex + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800 font-medium leading-relaxed text-sm">
                            {item}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - Primary Image (2/3 width) */}
                <div className="w-2/3 bg-gradient-to-br from-amber-100 to-orange-100 relative overflow-hidden flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center p-4">
                    {currentImageUrl && !isCurrentImageLoading ? (
                      <img
                        src={currentImageUrl}
                        alt={`Outfit style ${currentIndex + 1}`}
                        className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                        onLoad={() => {
                          setImageLoadingStates(prev => ({
                            ...prev,
                            [currentIndex]: false
                          }))
                        }}
                        onError={() => {
                          setImageLoadingStates(prev => ({
                            ...prev,
                            [currentIndex]: true
                          }))
                        }}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-amber-600 space-y-4">
                        <Loader2 className="w-16 h-16 animate-spin" />
                        <div className="text-center">
                          <p className="text-lg font-semibold">Generating outfit image...</p>
                          <p className="text-sm opacity-75">This may take a few moments</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Navigation arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white opacity-20 hover:opacity-100 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 z-10"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white opacity-20 hover:opacity-100 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 z-10"
              >
                <ChevronRight className="w-6 h-6 text-gray-700" />
              </button>

              {/* Dots indicator with loading states */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {outfitList.relatedStyles.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 relative ${index === currentIndex
                      ? 'bg-amber-500 scale-125'
                      : 'bg-white bg-opacity-70 hover:bg-opacity-90'
                      }`}
                  >
                    {imageLoadingStates[index] && (
                      <div className="absolute inset-0 rounded-full border-2 border-amber-400 animate-ping"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-6 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 ease-out"
                style={{ width: `${((currentIndex + 1) / outfitList.relatedStyles.length) * 100}%` }}
              />
            </div>

            {/* Style counter with loading info */}
            <div className="text-center mt-4 text-gray-600">
              <span className="text-amber-600 font-semibold">{currentIndex + 1}</span> of {outfitList.relatedStyles.length} styles
              {Object.values(imageLoadingStates).some(loading => loading) && (
                <span className="ml-4 text-sm text-amber-600">
                  ({Object.values(imageLoadingStates).filter(loading => !loading).length} images ready)
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Helpful Notes Section */}
      {outfitList.helpfulNotes && (
        <div className="w-full mb-12">
          <div className="text-center text-amber-500 text-3xl font-bold mt-8 mb-6">Styling Notes</div>
          <div className="rounded-lg p-6 shadow-lg">
            <TextGenerateEffect words={outfitList.helpfulNotes} className="text-gray-800 text-lg leading-relaxed" />
          </div>
        </div>
      )}

      {/* Empty State */}
      {(!outfitList.summary && !outfitList.helpfulNotes && (!outfitList.relatedStyles || outfitList.relatedStyles.length === 0)) && (
        <div className="text-center text-gray-500 text-xl">
          No outfit recommendations available at the moment. please go to dashboard and generate a new outfit.
        </div>
      )}
    </div>
  )
}