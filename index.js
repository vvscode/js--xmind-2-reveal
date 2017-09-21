const fs = require('fs');
const xmind = require('xmind');
const _ = require('lodash');
const util = require('util');

const mindMapFileName = `${__dirname}/example/weight-loss program.xmind`;
const templateName = 'base';

const mindMap = xmind.open(mindMapFileName).toPlainObject();
const mindMapSheet = mindMap.sheets[0];

const mainTemplate = fs
  .readFileSync(`${__dirname}/templates/${templateName}/index.html`)
  .toString();
const sectionTemplate = fs
  .readFileSync(`${__dirname}/templates/${templateName}/section.html`)
  .toString();

console.log(require('util').inspect(mindMapSheet));

const getSectionHtml = section => {
  console.log('getSectionHtml', util.inspect(section));

  return _.template(sectionTemplate)();
};

const getPageHtml = sheet => {
  console.log('getPageHtml');

  const mainTemplateOptions = {
    title: mindMapSheet.title
  };

  return _.template(mainTemplate)(mainTemplateOptions).replace(
    '{{outlet}}',
    mindMapSheet.rootTopic.children.map(getSectionHtml).join('')
  );
};

fs.writeFileSync(`${__dirname}/example/index.html`, getPageHtml(mindMapSheet));

console.log(new Date(), 'Done');
