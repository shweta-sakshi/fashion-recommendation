import React, { useEffect, useState } from 'react'
import { TextGenerateEffect } from "@/components/ui/text-generate-effect"

export const Outfitlist = () => {
  const [outfitList, setOutfitList] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOutfitList = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/ai/getgeneratedstyle`, {
          headers: {
            authorization: `${localStorage.getItem("token")}`
          }
        })

        const data = await response.json()

        if (data.success === true) {
          setOutfitList(data.data)
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

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className="text-amber-500 text-xl">Loading your outfit recommendations...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className="text-red-500 text-xl">{error}</div>
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

  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-8 max-w-4xl mx-auto'>
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
          <div className="text-center text-amber-500 text-3xl font-bold mb-8">Outfit Recommendations</div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {outfitList.relatedStyles.map((styleCategory, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4">
                  <h3 className="text-xl font-semibold text-center">
                    Style Option {categoryIndex + 1}
                  </h3>
                </div>

                <div className="p-6">
                  {styleCategory && Array.isArray(styleCategory) && styleCategory.map((item, itemIndex) => (
                    <div key={itemIndex} className="mb-4 p-4 bg-gray-50 rounded-lg border-l-4 border-amber-400">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {itemIndex + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800 font-medium leading-relaxed">
                            {item}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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