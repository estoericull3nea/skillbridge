import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import axios from 'axios'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const ChartComponent = ({ endpoint, chartTitle }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [chartData, setChartData] = useState(null)

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_PROD_BACKEND_URL}admin/${endpoint}`
        )
        const labels = data.map((item) => item._id)
        const counts = data.map((item) => item.count)

        setChartData({
          labels,
          datasets: [
            {
              label: chartTitle,
              data: counts,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
          ],
        })
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching chart data:', error)
      }
    }

    fetchChartData()
  }, [endpoint, chartTitle])

  const skeletonLoading = (
    <div className='animate-pulse flex space-x-4'>
      <div className='w-full h-48 bg-gray-200 rounded-md'></div>
    </div>
  )

  return (
    <div className='mb-8 w-full'>
      <h3 className='text-lg font-semibold mb-4'>{chartTitle}</h3>
      {isLoading ? (
        skeletonLoading
      ) : (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: chartTitle,
              },
            },
          }}
        />
      )}
    </div>
  )
}

const DashboardCharts = ({ trigger }) => {
  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 w-full'>
      <ChartComponent
        endpoint='new-users-trend'
        chartTitle='New Users (Last 7 Days)'
      />
      <ChartComponent
        endpoint='booking-trend'
        chartTitle='Bookings (Last 7 Days)'
        trigger={trigger}
      />
    </div>
  )
}

export default DashboardCharts
