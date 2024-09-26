import {render, screen} from '@testing-library/react';
import TableHeader from '../../static/hello-world/src/components/TableHeader';
import '@testing-library/jest-dom'; 

describe('Testing TableHeader component', () => {
    test('render TableHeader component with children', () => {
        // render Component
        render(<TableHeader>
            <th>#</th>
            <th>Title</th>
        </TableHeader>);

            // Get the item I want to test
        const ths = screen.getAllByRole('columnheader')

        // asserting
        expect(ths).toHaveLength(2);
        // Assert that the correct text is displayed in each header
        expect(ths[0]).toHaveTextContent('#');
        expect(ths[1]).toHaveTextContent('Title');
    })

    test('render TableHeader component no children', () => {
        render(<TableHeader />);

        const ths = screen.queryAllByRole('columnheader')

        expect(ths).toHaveLength(0);
    })
})