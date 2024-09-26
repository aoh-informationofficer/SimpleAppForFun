import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableBody from '../../static/hello-world/src/components/TableBody';
import { invoke } from '@forge/bridge';

// Mock the Forge API
jest.mock('@forge/bridge', () => ({
  invoke: jest.fn(),
}));

function renderComponent() {
  // Mock the Forge invoke call to return the mock data
  const mockData = [
    { id: "123", title: "How to update jira ticket", _links: { webui: "/spaces/ADP/pages/123/How+to+update+jira+ticket" } },
    { id: "456", title: "How to update jira comment", _links: { webui: "/spaces/ADP/pages/456/How+to+update+jira+comment" } }
  ];
  
  // Mock invoke function to resolve with the mock data
  invoke.mockResolvedValue(mockData);

  // Render the component
  render(<TableBody data={mockData}/>);
}

describe('Testing TableBody Component', () => {
  test('renders Body with data from fetchPossibleTroubleshootingPages', async () => {
    renderComponent(); 
    
    // Check if both rows are rendered
    const rows = await screen.findAllByRole('row');
    expect(rows).toHaveLength(3); // 2 rows

    // Check if the correct titles are rendered
    const firstLink = await screen.findByText('How to update jira ticket');
    const secondLink = await screen.findByText('How to update jira comment');

    expect(firstLink).toBeInTheDocument();
    expect(secondLink).toBeInTheDocument();

    // Check if the correct links are applied
    expect(firstLink.closest('a')).toHaveAttribute('href', 'https://aocz.atlassian.net/wiki/spaces/ADP/pages/123/How+to+update+jira+ticket');
    expect(secondLink.closest('a')).toHaveAttribute('href', 'https://aocz.atlassian.net/wiki/spaces/ADP/pages/456/How+to+update+jira+comment');
  });
});
