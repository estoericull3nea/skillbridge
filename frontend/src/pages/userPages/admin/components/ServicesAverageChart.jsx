import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Line } from 'react-chartjs-2'
import 'daisyui/dist/full.css'

const ServicesAverageChart = ({ trigger }) => {
  const [chartData, setChartData] = useState({})
  const [selectedService, setSelectedService] = useState('Customer Service')
  const [timeframe, setTimeframe] = useState('daily')
  const [loading, setLoading] = useState(true)

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

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

  const fetchServiceCount = async (useDateRange = false) => {
    setLoading(true)
    try {
      const params = {
        timeframe,
        service: selectedService,
      }

      // Only apply start and end dates if 'useDateRange' is true
      if (useDateRange) {
        if (startDate) params.startDate = startDate
        if (endDate) params.endDate = endDate
      }

      const response = await axios.get(
        `${
          import.meta.env.VITE_PROD_BACKEND_URL
        }book/count/${timeframe}/${selectedService}`,
        { params }
      )

      const data = response.data
      if (data.length > 0) {
        setChartData({
          labels: data.map((entry) => entry._id),
          datasets: [
            {
              label: `${
                timeframe.charAt(0).toUpperCase() + timeframe.slice(1)
              } Bookings for ${selectedService}`,
              data: data.map((entry) => entry.count),
              backgroundColor: 'black',
              borderColor: 'black',
              borderWidth: 2,
              fill: true,
              tension: 0.4,
            },
          ],
        })
      } else {
        setChartData({
          labels: [],
          datasets: [],
        })
      }
    } catch (error) {
      console.error('Error fetching service count:', error)
      setChartData({
        labels: [],
        datasets: [],
      })
    } finally {
      setLoading(false)
    }
  }

  const handleFetchWithDate = () => {
    fetchServiceCount(true) // Pass 'true' to use date range
  }

  useEffect(() => {
    fetchServiceCount(false) // Fetch without date on load
  }, [timeframe, selectedService, trigger])

  // Add date range inputs to UI
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

      {/* Date Range Inputs */}
      <div className='flex gap-4 mb-4'>
        <div>
          <label className='block'>Start Date:</label>
          <input
            type='date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className='input input-bordered w-full'
          />
        </div>
        <div>
          <label className='block'>End Date:</label>
          <input
            type='date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className='input input-bordered w-full'
          />
        </div>
      </div>

      <button
        onClick={handleFetchWithDate}
        className='btn btn-primary w-full mb-4'
      >
        Fetch Data
      </button>

      {loading ? (
        <div className='animate-pulse'>
          <div className='skeleton h-48 w-full bg-gray-200 rounded'></div>
        </div>
      ) : (
        <Line data={chartData} />
      )}

      {!loading && chartData.labels.length === 0 && (
        <div className='text-center text-gray-500 mt-4'>No data available</div>
      )}
    </div>
  )

  useEffect(() => {
    fetchServiceCount()
  }, [timeframe, selectedService, trigger])

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

      {!loading && chartData.labels.length === 0 && (
        <div className='text-center text-gray-500 mt-4'>No data available</div>
      )}
    </div>
  )
}

export default ServicesAverageChart
