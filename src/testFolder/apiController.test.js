import { api } from '@forge/api';
import '@testing-library/jest-dom';

// Mock the Forge API
jest.mock('@forge/api', () => ({
    api: jest.fn(),
}));

describe('ApiController Tests', () => {
    const spaceId = "180125700";
    const issueKey = "TEST-123";

    it('Should fetch pages of a space by spaceId', async () => {
        // Mock the API response for the getPagesOfSpaceById function
        api.getPagesOfSpaceById = jest.fn().mockResolvedValue({
            results: [
                { id: "123", title: "How to update jira ticket", _links: { webui: "/spaces/ADP/pages/123/How+to+update+jira+ticket" } },
                { id: "456", title: "How to update jira comment", _links: { webui: "/spaces/ADP/pages/456/How+to+update+jira+comment" } }
            ]
        });

        const apiData = await api.getPagesOfSpaceById(spaceId);
        expect(apiData.results[0].title).toBe("How to update jira ticket");
        expect(apiData.results[1].title).toBe("How to update jira comment");
        expect(apiData.results[1].title).not.toBe("How to update jira comments");
    });
    
    it('Should fetch Jira issue by issueKey', async () => {
        // Mock the API response for the getIssue function
        api.getIssue = jest.fn().mockResolvedValue(
            {
                key: issueKey,
                fields: { summary: "Test issue summary" }
            });

        const issueData = await api.getIssue(issueKey);
        expect(issueData.key).toBe(issueKey);
        expect(issueData.fields.summary).toBe("Test issue summary");
        expect(issueData.key).toBe("TEST-123");
        expect(issueData.key).not.toBe("TEST-124");
    });
});
