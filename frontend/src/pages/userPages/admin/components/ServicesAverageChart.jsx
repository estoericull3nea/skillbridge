// components/ServicesAverageChart.js
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2'
import 'daisyui/dist/full.css' // Import DaisyUI styles

const ServicesAverageChart = () => {
  const [chartData, setChartData] = useState({})
  const [selectedService, setSelectedService] = useState('Customer Service')
  const [timeframe, setTimeframe] = useState('monthly')
  const [loading, setLoading] = useState(true)

  const allServices = [
    'Customer Service',
    'Writing and Editing',
    'Social Media Management',
    'Technical Skills',
    'Talent Sourcing',
    'Talent Screening',
    'Interviewing and Assessment',
    'Endorsement',
    'Onboarding (Optional)',
  ]

  const fetchServiceCount = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_DEV_BACKEND_URL
        }book/count/${timeframe}/${selectedService}`
      )
      const data = response.data

      setChartData({
        labels: [selectedService],
        datasets: [
          {
            label: 'Total Bookings',
            data: [data[selectedService] || 0], // Default to 0 if no bookings
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
          },
        ],
      })
    } catch (error) {
      console.error('Error fetching service count:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServiceCount()
  }, [timeframe, selectedService])

  return (
    <div>
      <h2 className='text-xl font-bold mb-4'>Admin Panel - Service Count</h2>

      <label className='block mb-2'>Select Service:</label>
      <select
        onChange={(e) => setSelectedService(e.target.value)}
        value={selectedService}
        className='mb-4 select select-bordered'
      >
        {allServices.map((service) => (
          <option key={service} value={service}>
            {service}
          </option>
        ))}
      </select>

      <label className='block mb-2'>Select Timeframe:</label>
      <select
        onChange={(e) => setTimeframe(e.target.value)}
        value={timeframe}
        className='mb-4 select select-bordered'
      >
        <option value='daily'>Daily</option>
        <option value='weekly'>Weekly</option>
        <option value='monthly'>Monthly</option>
        <option value='yearly'>Yearly</option>
      </select>

      {loading ? (
        <div className='animate-pulse'>
          <div className='skeleton h-48 w-full bg-gray-200 rounded'></div>
          <div className='skeleton h-4 w-3/4 bg-gray-300 rounded mt-2'></div>
          <div className='skeleton h-4 w-1/2 bg-gray-300 rounded mt-2'></div>
        </div>
      ) : (
        <Line data={chartData} />
      )}
    </div>
  )
}

export default ServicesAverageChart
