import React from 'react'
import { Card } from "@/components/ui/card"

const GaugeChart = ({ value, max, unit }: { value: number; max: number; unit: string }) => (
  <div className="relative w-full h-full">
    <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="#e0e0e0"
        strokeWidth="10"
      />
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="10"
        strokeDasharray={`${2 * Math.PI * 45}`}
        strokeDashoffset={`${2 * Math.PI * 45 * (1 - value / max)}`}
      />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <span className="text-3xl font-bold">{value}</span>
      <span className="text-sm">{unit}</span>
    </div>
  </div>
)

export  const Bento:React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-4 gap-4">
        <Card className="col-span-2 p-6 bg-white shadow-lg rounded-xl">
          <h1 className="text-3xl font-bold">AI - MONITOR FOR YOUR CAR</h1>
          <div className="text-sm text-gray-500 mt-2">Powered by TECHX</div>
        </Card>

        <Card className="col-span-2 row-span-2 p-6 bg-white shadow-lg rounded-xl relative overflow-hidden">
          <h2 className="text-xl font-semibold mb-2">AI Powered Car Care: Tech-X Keeps You Ahead</h2>
          <img
            src="/placeholder.svg?height=300&width=400"
            alt="Futuristic Car"
            width={400}
            height={300}
            className="object-cover rounded-lg"
          />
          <div className="absolute bottom-4 right-4 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
            Superior Tech
          </div>
        </Card>

        <Card className="p-4 bg-white shadow-lg rounded-xl">
          <h3 className="text-lg font-semibold mb-2">ABS SYSTEM CHECK</h3>
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-blue-500 rounded-full"></div>
            <div className="text-sm">Fast Brake</div>
          </div>
        </Card>

        <Card className="p-4 bg-gray-900 text-white shadow-lg rounded-xl flex items-center justify-center">
          <span className="text-4xl font-bold">74%</span>
        </Card>

        <Card className="p-4 bg-gray-900 text-white shadow-lg rounded-xl">
          <div className="text-sm mb-2">We provide complete energy efficiency analysis, performance maintenance and more</div>
          <img
            src="/placeholder.svg?height=100&width=100"
            alt="Energy Storage"
            width={100}
            height={100}
            className="object-cover rounded-lg"
          />
        </Card>

        <Card className="col-span-2 p-6 bg-white shadow-lg rounded-xl flex items-center justify-center">
          <h2 className="text-4xl font-bold text-blue-600">TECHX</h2>
        </Card>

        <Card className="p-4 bg-white shadow-lg rounded-xl">
          <img
            src="/placeholder.svg?height=100&width=100"
            alt="Car Top View"
            width={100}
            height={100}
            className="object-cover rounded-lg"
          />
        </Card>

        <Card className="p-4 bg-white shadow-lg rounded-xl">
          <GaugeChart value={4550} max={8000} unit="RPM" />
          <div className="flex justify-between text-xs mt-2">
            <span>100 kW</span>
            <span>135 MPH</span>
            <span>24 G</span>
          </div>
        </Card>

        <Card className="col-span-2 p-4 bg-white shadow-lg rounded-xl">
          <div className="flex h-full">
            <div className="flex-1 bg-blue-500"></div>
            <div className="flex-1 bg-blue-700"></div>
            <div className="flex-1 bg-gray-400"></div>
            <div className="flex-1 bg-gray-200"></div>
          </div>
        </Card>

        <Card className="p-4 bg-white shadow-lg rounded-xl">
          <img
            src="/placeholder.svg?height=100&width=100"
            alt="Engine Component"
            width={100}
            height={100}
            className="object-cover rounded-lg"
          />
        </Card>
      </div>
    </div>
  )
}