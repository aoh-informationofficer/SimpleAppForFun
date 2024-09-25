import Resolver from '@forge/resolver';
import ApiController from './controller/apiController';
import { confluenceSpaceMapping } from './controller/config'; 

const api = new ApiController();
const resolver = new Resolver();

resolver.define('fetchPossibleTroubleshootingPages', async (req) => {
  const projectKey = req.context.extension.issue.key.split("-")[0];
  const spaceId = confluenceSpaceMapping[projectKey];
  const issue = await api.getIssue(req.context.extension.issue.key);
  const pagesResults = await api.getPagesOfSpaceById(spaceId); 
  const searchArray = ["summary","description","field","comment","ticket","issue"];
  const foundOption = searchArray.find(option => {
    if(issue.fields.summary.toLowerCase().includes(option)) {
      return option;
    }
  });
  const payload = pagesResults.results.filter(page => {
    if (page.title.toLowerCase().includes(foundOption)) {
      return page;
    }
  })
  return payload;
})

export const handler = resolver.getDefinitions();
