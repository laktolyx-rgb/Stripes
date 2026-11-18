import raw from '../../../stripes.config.json';

const slug = `${raw.owner}/${raw.repo}`;
export const config = {
  ...raw,
  repoUrl: `https://github.com/${slug}`,
  treeUrl: `https://github.com/${slug}/tree/${raw.branch}`,
  blobUrl: `https://github.com/${slug}/blob/${raw.branch}`,
  npmUrl: `https://www.npmjs.com/package/${raw.npm.palette}`,
};
