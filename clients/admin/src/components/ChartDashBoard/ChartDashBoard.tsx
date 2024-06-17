import { Tooltip } from 'bizcharts'
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, XAxis, YAxis } from 'recharts'

export default function ChartDashBoard({ analytics }: { analytics: any }) {
  return (
    <div>
      <div className='mt-8  '>
        <ResponsiveContainer width='100%' height='100%' className={'!h-full min-h-[500px]'}>
          <BarChart
            width={500}
            height={300}
            data={analytics}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='Tổng' fill='#8884d8' activeBar={<Rectangle fill='pink' stroke='blue' />} />
            <Bar dataKey='Đang hoạt động' fill='#82ca9d' activeBar={<Rectangle fill='gold' stroke='purple' />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
