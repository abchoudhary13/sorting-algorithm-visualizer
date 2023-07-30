import React from "react";
import { mergeSort } from "../SortingAlogorithms/MergeSort";
import './SortingVisualiser.css';

class SortingVisualiser extends React.Component{
    constructor(props){
        super(props);
        this.state={
            array: [],
        };
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const array = [];
        for(let i=0;i<100;i++){
            array.push(this.randomIntFromInterval(5,500));
        }
        this.setState({array});
    }



    mergeSort() {
        const animations = mergeSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
          const arrayBars = document.getElementsByClassName('array-bar');
          const isColorChange = i % 3 !== 2;
          if (isColorChange) {
            const [barOneIdx, barTwoIdx] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            const color = i % 3 === 0 ? 'green' : 'lightblue';
            setTimeout(() => {
              barOneStyle.backgroundColor = color;
              barTwoStyle.backgroundColor = color;
            }, i * 20);
          } else {
            setTimeout(() => {
              const [barOneIdx, newHeight] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              barOneStyle.height = `${newHeight}px`;
            }, i * 20);
          }
        }
      }

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    render() {
        const {array} = this.state;
        return(
            <div className="array-container">
                {array.map((value,idx) => {
                    return(
                        <div className="array-bar" key={idx} style={{height: `${value}px`}}>
                        </div>
                    );
                })}
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
            </div>
        )
    }
};

export default SortingVisualiser;