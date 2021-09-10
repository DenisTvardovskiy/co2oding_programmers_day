import React from "react";
import {Bar} from "@ant-design/charts";


const data:any = [
    {
        key: '1',
        name: 'John Brown',
        chinese: 98,
        math: 60,
        english: 70,
    },
    {
        key: '2',
        name: 'Jim Green',
        chinese: 98,
        math: 66,
        english: 89,
    },
    {
        key: '3',
        name: 'Joe Black',
        chinese: 98,
        math: 90,
        english: 70,
    },
    {
        key: '4',
        name: 'Jim Red',
        chinese: 88,
        math: 99,
        english: 89,
    },
    {
        key: '5',
        name: 'Jim Red',
        chinese: 88,
        math: 99,
        english: 89,
    },
];

const config:any = {
    data: data,
    xField: 'chinese',
    yField: 'name',
    legend: { position: 'top-left' },
    barBackground: { style: { fill: 'rgba(0,0,0,0.1)' } },
    interactions: [
        {
            type: 'active-region',
            enable: false,
        },
    ],
};

class BarChart extends React.Component<any, any>{

    render() {
        return (<Bar {...config} />);
    }

}

export default BarChart