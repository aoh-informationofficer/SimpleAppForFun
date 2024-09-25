import react, {Component} from "react";
import api, {route, fetch} from '@forge/api'
import {confluenceAccess} from './config';

class ApiController extends Component {
    
    async getPagesOfSpaceById(spaceId) {
        try {
            const res = await api.fetch(`${confluenceAccess.baseUrl}/wiki/api/v2/spaces/${spaceId}/pages`, {
                headers: {
                    'Authorization': `Basic ${confluenceAccess.token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
              });
            const data = await res.json();
            return data;
        } catch(err) {
            console.error(`Unable to get find the space by ${id}. Error ${err}`)
        }
    }

    async getIssue(issueKey) {
        try {
            const res = await api.asApp().requestJira(route`/rest/api/3/issue/${issueKey}`);
            const data = await res.json();
            return data;
        } catch(err) {
            console.error(err.message);
        }
        return {};
    }
}

export default ApiController;