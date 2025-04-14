import collections
import logging
import os
import yaml
from jira import JIRA
from rstcloth import RstCloth

logger = logging.getLogger('generatechangelogs.py')

def get_config():
    """
    Read the changelog_conf.yaml file to get the required changelog
    components
    """
    filepath = os.path.abspath(os.path.join(os.path.dirname(
        __file__), '..', 'config/changelog_conf.yaml'))
    with open(filepath) as stream:
        try:
            config_yaml = yaml.safe_load(stream)
            return config_yaml
        except yaml.YAMLError as exc:
            print(exc)


def get_jira_issues(fixVersion):
    """
    Authenticate to JIRA and return the list of tickets matching the
    specified projects and fixVersion
    """
    projects = '("SERVER", "TOOLS", "WiredTiger")'

    oauth_dict = {}
    credentialPath = os.path.join(
        os.path.expanduser('~'), '.config/.mongodb-jira.yaml')
    try:
        stream = open(credentialPath)
        jira_yaml = yaml.safe_load(stream)
        oauth_dict = jira_yaml.get('jira')
    except yaml.YAMLError as exc:
        print("ERROR: Credentials YAML not properly formatted.")
        print(exc)
        raise
    except IOError as e:
        print(
            "ERROR: Could not find JIRA OAuth credentials in ~/.config/.mongodb-jira.yaml")
        raise

    # Connect to JIRA
    auth_jira = JIRA(oauth=oauth_dict, options={
                     'server': 'https://jira.mongodb.org'}, validate=True)

    # Run the JIRA query
    query = "project in {0} and fixVersion = {1} and resolution = 'Fixed' ORDER BY key ASC".format(
        projects, fixVersion)
    issues = auth_jira.search_issues(query, maxResults=500)

    logger.info("building changelog for {0} with {1} issue(s)".format(
        fixVersion, len(issues)))

    print("building changelog for {0} with {1} issue(s)".format(
        fixVersion, len(issues)))

    return issues


def get_issue_structure(config, issues, version):
    """
    Group the JIRA issues by component. Structure headings and
    subheadings.
    """

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
                    
        # format issue summary to remove backticks
        # (necessary for next-gen)

        issue_summary = issue.fields.summary.replace('`', '')
        
        issue_pair = (issue.key, issue_summary)

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


def generate_changelog_rst(config, headings, fixVersion, outputFile):
    """
    Generate the changelog rst from the groupings established in
    get_issue_structure()
    """

    # invert the mapping of nested, so we can properly handle subheadings.
    nested = dict()
    for enclosing_level, sub_headings in config.get('nesting').items():
        for component in sub_headings:
            nested[component] = enclosing_level

    with open (outputFile, 'w') as f:
        # build the changelog content itself.
        r = RstCloth(f)
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
                        "issue", issues[0][0])))
                else:
                    for issue in issues:
                        r.li("{1} {0}".format(issue[1], r.role(
                            "issue", issue[0])))
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
                                "issue", sub_issues[0][0])))
                        else:
                            for issue in sub_issues:
                                r.li("{1} {0}".format(issue[1].strip(), r.role(
                                    "issue", issue[0])))
                        r.newline()

        print(
            "wrote changelog '{0}'. Commit this file independently.".format(outputFile))


def generate_output_filePath(fixVersion):
    sourceDir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    fn = fixVersion + ".rst"
    outputDir = os.path.join(
        sourceDir, "source/includes/changelogs/releases", fn)

    return outputDir

def main():
    # Prompt user for the version to generate the changelog for:
    fixVersion = input("Enter changelog version: ")

    # Generate the outputfile
    outputFile = generate_output_filePath(fixVersion)

    # Get list of JIRA issues to include in changelog
    issues = get_jira_issues(fixVersion)

    # Get config containing required changelog components and ordering
    config = get_config()

    # Generate issue headings based on component config
    issue_headings = get_issue_structure(config, issues, fixVersion)

    # Convert the issue headings into rst
    changelog_rst = generate_changelog_rst(config, issue_headings, fixVersion, outputFile)

    # Write the changelog to source/includes/changelogs/releases
    # write_changelog_file(changelog_rst, fixVersion)

if __name__ == "__main__":
    main()
