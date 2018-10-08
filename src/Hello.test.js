
import React from 'react';
import ReactDOM from 'react-dom';
// import Enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';

function Hello(props) {
    return <div>Hello from {props.now}</div>
}

const moment = new Date(233213213213);

describe( "Let's test the Hello component", () => {
    let result;
    beforeAll( () => {
        result = Hello({now: moment.toISOString()});
    });
    it('Should not be null', () => {
        expect(result).not.toBeNull();
    });

    it('Should be of type Div', () => {
        expect(result.type).toBe('div');
    });

    it("testing with reactDom", () => 
    {
        const divObj = document.createElement('div');
        ReactDOM.render(<Hello now={moment.toISOString()}/>, divObj);
        // expect(divObj).toBe(<div>{result}</div>)
    })
})

describe( "Let's test the addition output", () => {
    it('Should fail', () => {
        expect(1 + 2).toBe(3);
    })
})

// Enzyme.configure({
//     adapter: new Adapter()
// })


// describe("When testing with enzyme", () => {
//     it('Render a H1', () => {
//         const wrapper = shallow(<Hello now={moment.toISOString()}/>);
//         expect(wrapper.find('h1').length).toBe(1);
//     })
// })