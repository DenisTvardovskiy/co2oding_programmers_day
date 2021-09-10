import {Button, Form, FormInstance, Radio, Select } from "antd";
import React from "react";
import {Line} from "@ant-design/charts";
const { Option } = Select;
const API_LINK = 'https://co2ding-2021.herokuapp.com/api/v1/'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};



class Distribution extends React.Component<any, any>{
    config = {
        data: [],
        xField: 'dateStart',
        yField: 'value',
        label: {},
        point: {
            size: 5,
            shape: 'diamond',
            style: {
                fill: 'white',
                stroke: '#5B8FF9',
                lineWidth: 2,
            },
        },
        tooltip: { showMarkers: false },
        state: {
            active: {
                style: {
                    shadowBlur: 4,
                    stroke: '#000',
                    fill: 'red',
                },
            },
        },
        interactions: [{ type: 'marker-active' }],}
    constructor(props:any) {
        super(props);
        this.state = {
            regions: [],
            dataTypes: [],
            region_loaded: false,
            dataTypes_loaded: false,
            chartData_loaded:false,
            selectedRegion: 0,
            selectedYear: 0,
            selectedType: 0,
            chartData:{
                dataType:{},
                region:{},
                results:[]
            }
        }
        this.onReset = this.onReset.bind(this)
        this.onSelectRegion = this.onSelectRegion.bind(this)
        this.onSelectYear = this.onSelectYear.bind(this)
        this.onSelectType = this.onSelectType.bind(this)
        this.onFinish = this.onFinish.bind(this)
    }

    async getRegions(){
        const requestLink = API_LINK + "distribution/regions"
        let node = null

        node = await fetch(requestLink)
            .then(response => response.json())
            .then(data => node = data)
            this.setState({
                regions: node.results,
                region_loaded: true
            })
        return node
    }

    async getDataTypes(){
        const requestLink = API_LINK + "distribution/dataTypes"
        let node = null

        node = await fetch(requestLink)
            .then(response => response.json())
            .then(data => node = data)
        this.setState({
            dataTypes: node.results,
            dataTypes_loaded: true
        })
        return node
    }

    onReset(){
        this.setState({
            selectedRegion: 0,
            selectedYear: 0,
            selectedType: null
        })
        this.config.data = []
    }

    async onFinish(){
        const year = this.state.selectedYear
        const region = this.state.selectedRegion
        const type = this.state.selectedType
        let node = null
        let requestLink:string

        if(year>0 && region>0 && type>0){
            requestLink = API_LINK + `distribution/summary?year=${year}&region=${region}&dataType=${type}`
            node = await fetch(requestLink)
                .then(response => response.json())
                .then(data => node = data)
            this.config.data = node.results;
            this.setState({
                chartData:{
                    dataType: node.dataType,
                    region: node.region,
                    results: node.results
                },
                chartData_loaded: true
            })
        }else{
            this.setState({chartData_loaded: false})
        }
    }

    onSelectRegion(event:any){
        this.setState({selectedRegion: event.target.value})
    }
    onSelectYear(event:any){
        this.setState({selectedYear: event.target.value})
    }
    onSelectType(event:any){
        this.setState({selectedType: event.target.value})
    }

    componentDidMount() {
        this.getRegions();
        this.getDataTypes()
    }



    render() {
        return (
            <>
                <div>
                    {this.state.region_loaded
                        ?
                        <select
                            defaultValue = {this.state.selectedRegion}
                            value = {this.state.selectedRegion}
                            onChange={this.onSelectRegion}>
                            <option value={0} >Select Region</option>
                            {this.state.regions.map((item:any)=><option value={item.id} key={item.id}>{item.name}</option>)}
                        </select>
                        : "getting info"}
                </div>
                <div>
                    <select
                        defaultValue = {this.state.selectedYear}
                        value = {this.state.selectedYear}
                        onChange={this.onSelectYear}
                    >
                        <option value={0} >Select Year</option>
                        <option value={2015} >2015</option>
                        <option value={2016} >2016</option>
                        <option value={2017} >2017</option>
                        <option value={2018} >2018</option>
                        <option value={2019} >2019</option>
                    </select>
                </div>

                <div>
                    {this.state.dataTypes
                        ?
                        <div >
                            {this.state.dataTypes.map((item:any)=>
                                    <label>
                                <input
                                    type="radio"
                                    value={item.id}
                                    checked={this.state.selectedType === `${item.id}`}
                                    onChange={this.onSelectType}

                                />
                                {item.name}/{item.units}
                            </label>

                            )}
                        </div>
                        :"getting info"
                    }
                </div>

                <div>
                    <Button type="primary" onClick={this.onFinish}>
                        Submit
                    </Button>
                    <Button htmlType="button" onClick={this.onReset}>
                        Reset
                    </Button>
                </div>
                <div>
                    {this.state.chartData_loaded
                        ?
                        <div>
                            <Line {...this.config} />
                            <p>Область: {this.state.chartData.region.name}</p>
                            {this.state.chartData.dataType.id===1
                                ? <p>{this.state.chartData.dataType.name}/{this.state.chartData.dataType.units} в день</p>
                                : <p>{this.state.chartData.dataType.name}/{this.state.chartData.dataType.units} для поглинання викидів</p>}
                        </div>
                        : "No data"}
                </div>
            </>
        );
    }
}

export default Distribution