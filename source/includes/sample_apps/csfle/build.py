import os
import shutil
import click

from const import *


def get_commands(language, get_file_name, state):
    """Get list of commands to build language/state pair"""
    file_path = os.path.join(language, get_file_name(language))
    output_file = os.path.join(
        BUILD_DIR,
        language,
        *state.split(DIR_SEPERATOR),
        os.path.dirname(get_file_name(language)),
    )
    commands = [
        f"{BLUEHAWK} copy {file_path} --state {state} -o {output_file}"
    ]
    if GET_EXTRA_FILES(language):
        for l in GET_EXTRA_FILES(language):
            next_file_name = os.path.join(language, l)
            next_output_file = os.path.join(
                BUILD_DIR, language, *state.split(DIR_SEPERATOR), os.path.dirname(l)
            )
            commands.append(f"{BLUEHAWK} copy {next_file_name} -o {next_output_file}")
    return commands


def build_languages(language, build_states):
    """Build sample apps for a language"""

    all_commands = []

    for f in BUILD_FILES:
        for s in build_states:
            commands = get_commands(language, f, s)
            for c in commands:
                all_commands += commands
    dedup_commands = list(set(all_commands))
    for c in dedup_commands:
        os.system(c)

    # run formatter
    if FILE_MAP[language].get(FORMAT_COMMAND):
        print(f"\n\n$$$$   Formatting {language}:\n\n")
        os.system(FILE_MAP[language][FORMAT_COMMAND])


def check_bluehawk_installed():
    """Check that bluehawk is installed"""

    if shutil.which(BLUEHAWK) == None:
        raise ImportError(BLUEHAWK_HELP)


@click.command()
@click.option("--langs", default=None, help="What apps to build")
@click.option(
    "--reader",
    is_flag=True,
    default=False,
    help="Whether or not to only build reader directories",
)
def build_apps(langs, reader):
    """Get commmand line arguments and build sample applications"""

    check_bluehawk_installed()

    if os.path.exists(BUILD_DIR):
        shutil.rmtree(BUILD_DIR)

    file_map = {}
    build_states = []

    if not langs:
        file_map = FILE_MAP
    else:
        langs_to_build = [l.strip() for l in langs.split(",")]
        file_map = {l: FILE_MAP[l] for l in langs_to_build}

    if reader:
        build_states = [s for s in BUILD_STATES if TEST not in s]
    else:
        build_states = BUILD_STATES

    for lang in file_map.keys():
        build_languages(lang, build_states)


if __name__ == "__main__":
    build_apps()
