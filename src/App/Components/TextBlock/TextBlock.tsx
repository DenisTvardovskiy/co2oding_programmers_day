import React from "react";
import './style.scss'

interface ITextBlock {
    imgSrc?: string,
    heading: string,
    text: string
}

class TextBlock extends React.Component<any, any>{
    constructor(props:ITextBlock) {
        super(props);
        this.state = {
            imgSrc: '',
            heading: '',
            text: ''
        }
    }

    componentDidMount() {
        this.setState({
            imgSrc: this.props.imgSrc,
            heading: this.props.heading,
            text: this.props.text
        })
    }

    render() {
        return (
            <div>
                <div>
                    <h2>{this.state.heading}</h2>
                    <p>{this.state.text}</p>
                </div>
                {this.state.imgSrc
                    ? <div>
                      <img src={this.state.imgSrc} alt={"textImg"} />
                    </div>
                    : ""}
            </div>
        );
    }

}
export default TextBlock