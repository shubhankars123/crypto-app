import React from 'react'
import {
    Chart as ChartJs, CategoryScale,
    LinearScale, PointElement, LineElement,
    Title, Tooltip,
    Legend
} from "chart.js"
import { Line } from 'react-chartjs-2'


ChartJs.register(
    CategoryScale,
    LinearScale, PointElement, LineElement,
    Title, Tooltip,
    Legend
)
const Chart = ({ arr = [], currency, days }) => {

    const prices = [1, 2, 3, 4]

    const date = ["12/2/4", "23/4/54, 32/45/12"]

    const data = {

    }

    return (
        <Line
            options={{
                responsive: true,
            }}
            data={{
                labels: date,
                datasets: [
                    {
                        label: `Price in ${currency}`,
                        data: prices,
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgb(255, 99, 132, 0.5)"
                    }
                ]
            }} >

        </Line>
    )
}

export default Chart
