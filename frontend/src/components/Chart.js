import React, { useEffect, useState } from 'react'
import { LineChart, Line, YAxis, XAxis } from "recharts";
import { get } from '../api/BaseRequest'

const Chart = ({ record }) => {
    const [data, setData] = useState()
    const [params, setParams] = useState({
        period: '24h',
        coinId: record.id
    })

    useEffect(() => {
        const getData = async() => {
          const res = await get('charts', params)
          setData(res.chart)
        }
        getData()
    }, [params])

    let newData = [] 
    data && data.map((item) => {
        return newData.push(
            {
                price: item[1]
            }
        )
    })

    return (
        <LineChart width={120} height={60} data={newData}>
            <YAxis domain={['dataMin', 'dataMax']} hide={true}/>
            <XAxis dataKey="price" allowDataOverflow={false} hide={true} />
            <Line 
                type="linear" 
                dot={false} 
                dataKey="price"
                stroke={newData !== [] && newData?.shift()?.price < newData?.pop()?.price ? '#6ccf59' : '#ff4d4d'}
                strokeWidth={0.7} 
            />
            
        </LineChart>
    )
}
export default Chart
