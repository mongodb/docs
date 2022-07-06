import os
import shutil
import click

from const import *


def get_commands(project, get_file_name, state):
    """Get list of commands to build project/state pair"""
    file_path = os.path.join(project, get_file_name(project))
    output_file = os.path.join(
        BUILD_DIR,
        project,
        *state.split(DIR_SEPERATOR),
        os.path.dirname(get_file_name(project)),
    )
    commands = [
        f"{BLUEHAWK} copy {file_path} --state {state} -o {output_file}"
    ]
    if GET_EXTRA_FILES(project):
        for l in GET_EXTRA_FILES(project):
            next_file_name = os.path.join(project, l)
            next_output_file = os.path.join(
                BUILD_DIR, project, *state.split(DIR_SEPERATOR), os.path.dirname(l)
            )
            commands.append(f"{BLUEHAWK} copy {next_file_name} --state {state} -o {next_output_file}")
    return commands


def build_projects(project, build_states, skip_format):
    """Build sample apps for a project"""

    all_commands = []

    for f in BUILD_FILES:
        for s in build_states:
            commands = get_commands(project, f, s)
            for c in commands:
                all_commands += commands
    dedup_commands = list(set(all_commands))
    for c in dedup_commands:
        os.system(c)

    # run formatter
    if not skip_format:
        if FILE_MAP[project].get(FORMAT_COMMAND):
            print(f"\n\n$$$$   Formatting {project}:\n\n")
            os.system(FILE_MAP[project][FORMAT_COMMAND])


def check_bluehawk_installed():
    """Check that bluehawk is installed"""

    if shutil.which(BLUEHAWK) == None:
        raise ImportError(BLUEHAWK_HELP)


@click.command()
@click.option("--project", default=None, help="What apps to build")
@click.option(
    "--skip-format",
    is_flag=True,
    default=False,
    help="Whether or not to skip the formatting step of building code. Useful for shortening build times.",
)
@click.option(
    "--reader",
    is_flag=True,
    default=False,
    help="Whether or not to only build reader directories",
)
@click.option(
    "--test",
    is_flag=True,
    default=False,
    help="Whether or not to only build test directories",
)
@click.option(
    "--fle-1",
    is_flag=True,
    default=False,
    help="Whether or not to only build FLE-1 apps",
)
@click.option(
    "--fle-2",
    is_flag=True,
    default=False,
    help="Whether or not to only build FLE-2 apps",
)
def build_apps(project, skip_format, reader, test, fle_1, fle_2):
    """Get commmand line arguments and build sample applications"""

    check_bluehawk_installed()

    if os.path.exists(BUILD_DIR):
        shutil.rmtree(BUILD_DIR)

    file_map = {}
    build_states = []

    if not project:
        file_map = FILE_MAP
    else:
        project_to_build = [l.strip() for l in project.split(",")]
        file_map = {l: FILE_MAP[l] for l in project_to_build}

    if reader and test:
        raise ValueError("Cannot specify reader and test at the same time.")

    elif reader:
        build_states = [s for s in BUILD_STATES if TEST not in s]

    elif test:
        build_states = [s for s in BUILD_STATES if TEST in s]

    else:
        build_states = BUILD_STATES

    if fle_1 and fle_2:
        raise ValueError("Cannot specify FLE-1 and FLE-2 at the same time.")

    for proj in file_map.keys():
        if fle_2 and FLE_2 not in proj:
            continue
        elif fle_1 and FLE_2 in proj:
            continue

        build_projects(proj, build_states, skip_format)


if __name__ == "__main__":
    build_apps()
