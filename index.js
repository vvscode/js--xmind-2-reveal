/* INCLUDES */
const fs = require('fs');
const htmlBeautify = require('html-beautify');
const xmind = require('xmind');
const _ = require('lodash');
const packageConfig = require('./package.json');

/* ARGUMENTS PARSING */
const ArgumentParser = require('argparse').ArgumentParser;
const parser = new ArgumentParser({
  version: packageConfig.version,
  addHelp: true,
  description: packageConfig.description,
  epilog: 'by vvscode',
});

parser.addArgument(['-t', '--template'], {
  help: 'Template name for generating',
  choices: ['base', 'flat'],
  defaultValue: 'flat',
});

parser.addArgument(['-p', '--path'], {
  help: 'Path to xmind-file for conversion',
  defaultValue: `${__dirname}/example/weight-loss program.xmind`,
});

let args = parser.parseArgs();

/* CONNVERSION */
const mindMapFileName = args.path;
const templateName = args.template;

const mindMap = xmind.open(mindMapFileName).toPlainObject();
const mindMapSheet = mindMap.sheets[0];

const mainTemplate = fs
  .readFileSync(`${__dirname}/templates/${templateName}/index.html`)
  .toString();

const sectionTemplate = fs
  .readFileSync(`${__dirname}/templates/${templateName}/section.html`)
  .toString();

const getSectionHtml = ({
  section: {title, id, children},
  sectionLevel = 0,
  breadcrumbs = [],
}) =>
  _.template(sectionTemplate)({
    title,
    sectionLevel,
    id,
    breadcrumbs,
    sections: children.map((section) =>
      getSectionHtml({
        section,
        sectionLevel: sectionLevel + 1,
        breadcrumbs: [
          ...breadcrumbs,
          {
            title,
            id,
            sectionLevel,
          },
        ],
      })
    ),
  });

const getPageHtml = (sheet) =>
  _.template(mainTemplate)({
    title: mindMapSheet.title,
    sections: mindMapSheet.rootTopic.children.map((section) =>
      getSectionHtml({section, sectionLevel: 0, breadcrumbs: []})
    ),
  });

fs.writeFileSync(
  `${__dirname}/example/index.html`,
  htmlBeautify(getPageHtml(mindMapSheet))
);

console.log(
  `Convertion ${mindMapFileName} with "${templateName}" template done`
);
