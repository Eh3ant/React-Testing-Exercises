import React from 'react'
import { render } from '@testing-library/react'
import Card from './Card'


it("render without crashing", () => {
    render(<Card />);
})

it("should matches snapshot", () => {
    const { asFragment } = render(<Card />);
    expect(asFragment()).toMatchSnapshot()
})

