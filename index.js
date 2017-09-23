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

const getSectionHtml = ({
  section: { title, id, children },
  sectionLevel = 0,
  breadcrumbs = []
}) =>
  _.template(sectionTemplate)({
    title,
    sectionLevel,
    id,
    breadcrumbs,
    sections: children.map(section =>
      getSectionHtml({
        section,
        sectionLevel: sectionLevel + 1,
        breadcrumbs: [
          ...breadcrumbs,
          {
            title,
            id,
            sectionLevel
          }
        ]
      })
    )
  });

const getPageHtml = sheet =>
  _.template(mainTemplate)({
    title: mindMapSheet.title,
    sections: mindMapSheet.rootTopic.children.map(section =>
      getSectionHtml({ section, sectionLevel: 0, breadcrumbs: [] })
    )
  });

fs.writeFileSync(`${__dirname}/example/index.html`, getPageHtml(mindMapSheet));

console.log(new Date(), 'Done');
