import collections
import logging
import os
import rstcloth.rstcloth as rstcloth
import yaml
from jira import JIRA

logger = logging.getLogger('generatechangelogs.py')


def get_config():
    filepath = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'config/changelog_conf.yaml'))
    with open(filepath) as stream:
        try:
            config_yaml = yaml.safe_load(stream)
            return config_yaml
        except yaml.YAMLError as exc:
            print(exc)


def get_issue_structure(version, config):
    projects = '("SERVER", "TOOLS", "WiredTiger")'

    oauth_dict = {}
    credentialPath = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'changelogs/.mongodb-jira.yaml'))
    with open(credentialPath) as stream:
        try:
            jira_yaml = yaml.safe_load(stream)
            oauth_dict = jira_yaml.get('jira')
        except yaml.YAMLError as exc:
            print(exc)

    # Connect to JIRA
    auth_jira = JIRA(oauth=oauth_dict, options={
                     'server': 'https://jira.mongodb.org'})

    # Run the JIRA query
    query = "project in {0} and fixVersion = {1} and resolution = 'Fixed' ORDER BY key ASC".format(
        projects, version)
    issues = auth_jira.search_issues(query, maxResults=200)
    logger.info("building changelog for {0} with {1} issue(s)".format(
        version, len(issues)))

    print("building changelog for {0} with {1} issue(s)".format(
        version, len(issues)))

    # setup container of heading groups using the defined ordering.
    headings = collections.OrderedDict()
    for k in config.get('ordering'):
        headings[k] = list()

    # invert the mapping of groups to components so we can filter
    groups = dict()
    for k, v in config.get('groups').items():
        for c in v:
            groups[c] = k

    # run through all issues, and put each one in the headings structure at the
    # best place
    for issue in issues:
        components = []
        for c in issue.fields.components:
            components.append(c.name)

            if c.name not in groups:
                logger.error(
                    "undefined component %s. update configuration before continuing", c.name)

        issue_pair = (issue.key.encode("utf-8"),
                      issue.fields.summary.encode("utf-8"))

        if len(components) == 0:
            # if there isn't a component put this in the last grouping.
            headings[next(reversed(headings))].append(issue_pair)
        elif len(components) == 1:
            headings[groups[components[0]]].append(issue_pair)
        else:
            # if an issue has multiple components use the one that appears first
            # in the ordering of headings
            located = False
            for heading in groups:
                if heading in components:
                    headings[groups[heading]].append(issue_pair)
                    located = True
                    break

            # if we get here, we should stop the build because someone added a
            # ticket with a component and we don't know how to deal with this.
            if located is False:
                logger.error("skipping issue {0} in changelog {1} because its components aren't defined in the changelog configuration. Fix now.".format(
                    issue_pair[0], version))
                raise SystemExit

    return headings


def get_changelog_content():

    fixVersion = raw_input("Enter changelog version: ")
    config = get_config()
    headings = get_issue_structure(fixVersion, config)

    # invert the mapping of nested, so we can properly handle subheadings.
    nested = dict()
    for enclosing_level, sub_headings in config.get('nesting').items():
        for component in sub_headings:
            nested[component] = enclosing_level

    # build the changelog content itself.
    r = rstcloth.RstCloth()
    level = 3

    r.ref_target("{0}-changelog".format(fixVersion))
    r.newline()
    r.heading(text="{0} Changelog".format(fixVersion), char='-')
    r.newline()

    # process all of the issues by group.
    for heading, issues in headings.items():
        if heading in nested:
            # we deal with nested headings when we do their parent. skip here.
            continue
        else:
            if heading in config.get('nesting') and len(issues) == 0:
                # if a heading has subheadings, and all are empty, then we should skip it entirely.
                empty_sub_headings = 0
                for sub in config.get('nesting').get(heading):
                    if len(headings[sub]) == 0:
                        empty_sub_headings += 1
                if empty_sub_headings == len(config.get('nesting').get(heading)):
                    continue
            elif len(issues) == 0:
                # skip empty headings.
                continue

            # format the heading.
            r.heading(text=heading, indent=0,
                      char='~')
            r.newline()

            if len(issues) == 1:
                r.content("{1} {0}".format(issues[0][1], r.role(
                    "issue", issues[0][0])), wrap=False)
            else:
                for issue in issues:
                    r.li("{1} {0}".format(issue[1], r.role(
                        "issue", issue[0])), wrap=False)
            r.newline()

            # repeat the above formatting with minor variations to do the nesting.
            if heading in config.get('nesting'):
                for sub in config.get('nesting').get(heading):
                    if len(headings[sub]) == 0:
                        continue

                    r.heading(text=sub, indent=0,
                              # char=giza.content.helper.character_levels[level+1])
                              char='`')
                    r.newline()

                    sub_issues = headings[sub]
                    if len(sub_issues) == 0:
                        r.content("{1} {0}".format(sub_issues[0][1].strip(), r.role(
                            "issue", sub_issues[0][0])), wrap=False)
                    else:
                        for issue in sub_issues:
                            r.li("{1} {0}".format(issue[1].strip(), r.role(
                                "issue", issue[0])), wrap=False)
                    r.newline()

    # Output the rst to source/includes/changelogs/releases
    sourceDir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    fn = fixVersion + ".rst"
    outputDir = os.path.join(
        sourceDir, "source/includes/changelogs/releases", fn)
    r.write(outputDir)
    logger.info(
        "wrote changelog '{0}'. Commit this file independently.".format(outputDir))

    print("wrote changelog '{0}'. Commit this file independently.".format(outputDir))


# main function
get_changelog_content()
