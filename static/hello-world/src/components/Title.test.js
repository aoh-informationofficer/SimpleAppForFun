import { render, screen } from '@testing-library/react';
import Title from './Title';
import '@testing-library/jest-dom'; 

describe('Title Component', () => {
  test('renders the Title component with children', () => {
    const testText = "Possible Troubleshooting Solutions";

    // Render the Title component
    render(<Title>{testText}</Title>);

    // Assert that the title text is in the document
    const titleElement = screen.getByText(testText);
    expect(titleElement).toBeInTheDocument();
  });
});
