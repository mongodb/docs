import argparse
import os
import re
import subprocess
import shutil
import tempfile
from convert_to_rst import ConvertToRST


class AKOCRDsTool:
    def __init__(self, args):
        self.markdown = None
        self.working_list = []
        self.args = args
        self.repo_url = args.repo_url if hasattr(args, 'repo_url') else None
        # self.output_path = args.output_path if hasattr(args, 'output_path') else "output.md"
        self.version = args.version
        self.temp_dir_path = None
        self.included_versions = None
        self.rst_output = None
        self.created_txt_files = []

    def _reset_state(self):
        """Reset working state for processing a new file."""
        self.markdown = None
        self.working_list = []
        self.rst_output = None

    def _create_temp_dir(self):
        """Create a temporary directory."""
        self.temp_dir_path = tempfile.mkdtemp()

    def _change_directories_to_temp_dir(self):
        """Change the current working directory to the temporary directory."""
        if not self.temp_dir_path:
            raise ValueError("Temporary directory path is not set.")
        os.chdir(self.temp_dir_path)

    def clone_repo(self):
        """Clone a git repository to a specified directory."""
        self._create_temp_dir()
        self._change_directories_to_temp_dir()
        if not self.repo_url:
            raise ValueError("Repository URL is not provided.")
        cloned = subprocess.run(["git", "clone", self.repo_url], check=True, capture_output=True)
        if cloned.returncode != 0:
            raise Exception(f"Failed to clone repository: {cloned.stderr.decode()}")
        
    def checkout_version(self):
        """Checkout a specific version in the cloned repository."""
        self._change_directories_to_temp_dir()
        os.chdir('mongodb-atlas-kubernetes')
        checked_out = subprocess.run(["git", "checkout", self.version], capture_output=True)
        if checked_out.returncode != 0:
            raise Exception(f"Failed to checkout version {self.version}: {checked_out.stderr.decode()}")

    def get_markdown_output(self, relative_path='docs/api-docs.md'):
        """Get markdown output from the cloned repository."""
        print(os.getcwd())
        self._change_directories_to_temp_dir()
        with open(f'mongodb-atlas-kubernetes/{relative_path}', 'r') as file:
            self.markdown = file.read()

    # def get_included_versions(self):
    #     """Extract included versions from the markdown content."""
    #     pattern = r'- v202\d{5}'
    #     line_list = self.markdown.splitlines()
    #     included_versions = set()
    #     for line in line_list:
    #         if re.search(pattern, line):
    #             included_versions.add(line.replace('- ','').strip())
    #     self.included_versions = list(included_versions)

    def process_markdown(self):
        """Process the markdown content."""
        line_list = self.markdown.splitlines()

        anchor_count = 0
        for i, line in enumerate(line_list):
            if line.startswith("## ") or line.startswith("### "):
                anchor_count += 1

        for i, line in enumerate(line_list):
            if line.startswith("<sup><sup>"):
                line_list.pop(i)
            if '[index]' in line:
                line_list[i] = line.replace('[index]', '')

        for i in range(len(line_list) + anchor_count):
            index = i - 1
            if line_list[index].startswith("### ") or line_list[index].startswith("## "):
                if line_list[index - 1].startswith(".. _"):
                    continue
                anchor = f'.. _{line_list[index].replace("### ", "").replace("## ", "").replace("[index]", "").lower().replace(".", "-").strip()}: \n'
                line_list.insert(index, anchor)

        self.working_list = line_list

    def convert_to_rst(self):
        """Convert the processed markdown to RST format."""
        rst_content = "\n".join(self.working_list)
        converter = ConvertToRST()
        self.rst_output = converter.convert_markdown_to_rst(rst_content)
        
        # Remove extra blank lines while preserving single newlines
        # Special case: preserve blank lines before list items (- or *)
        lines = self.rst_output.splitlines()
        cleaned_lines = []
        prev_was_empty = False
        
        for i, line in enumerate(lines):
            is_empty = line.strip() == ''
            
            # Check if next line is a list item
            next_is_list_item = False
            if i + 1 < len(lines):
                next_line_stripped = lines[i + 1].strip()
                next_is_list_item = next_line_stripped.startswith('- ') or next_line_stripped.startswith('* ')
            
            # Always preserve empty lines before list items
            # Otherwise, only keep empty line if previous line wasn't empty (prevents consecutive empty lines)
            if next_is_list_item:
                # Always add this line if next is a list item (even if multiple empty lines)
                cleaned_lines.append(line)
            elif not is_empty or not prev_was_empty:
                cleaned_lines.append(line)
            
            prev_was_empty = is_empty
        
        self.rst_output = '\n'.join(cleaned_lines)
        
        # Insert blank lines after bullet items that are immediately followed
        # by non-bullet text at the same indentation (prevents RST "Bullet list
        # ends without a blank line; unexpected unindent" warnings)
        lines = self.rst_output.splitlines()
        fixed_lines = []
        for i, line in enumerate(lines):
            fixed_lines.append(line)
            if i + 1 < len(lines):
                stripped = line.strip()
                next_line = lines[i + 1]
                next_stripped = next_line.strip()
                is_bullet = stripped.startswith('- ') or stripped.startswith('* ')
                next_is_bullet = next_stripped.startswith('- ') or next_stripped.startswith('* ')
                next_is_empty = not next_stripped
                if is_bullet and not next_is_bullet and not next_is_empty and next_stripped:
                    # Check indentation: only insert if next line is at same or less indent
                    indent = len(line) - len(line.lstrip())
                    next_indent = len(next_line) - len(next_line.lstrip())
                    if next_indent <= indent:
                        fixed_lines.append('')
        
        self.rst_output = '\n'.join(fixed_lines)

    def write_processed_output_for_automated_crds(self):
        """Write the processed RST output to a file."""
        with open(self.output_path, 'w', encoding='utf-8') as f:
            f.write(self.rst_output)

    def write_processed_output_for_manual_crds(self, output_subdir='manual-crds'):
        """Write the processed markdown output to sub-files for CRD processing.
        
        Args:
            output_subdir: Name of the subdirectory under source/includes/
                           to write output files to.
        """
        crd_types = self._get_crd_types()
        
        # Find the workspace root by looking for the directory containing this script
        script_dir = os.path.dirname(os.path.abspath(__file__))
        # Navigate up from tools/ako-crds/src/ to the workspace root
        workspace_root = os.path.dirname(os.path.dirname(os.path.dirname(script_dir)))
        includes_dir = os.path.join(workspace_root, 'source', 'includes')
        crds_dir = os.path.join(includes_dir, output_subdir)
        
        # Create the directories if they don't exist
        os.makedirs(includes_dir, exist_ok=True)
        os.makedirs(crds_dir, exist_ok=True)

        for crd_type in crd_types:
            filename = re.sub(r'([a-z0-9])([A-Z])', r'\1-\2', crd_type).lower()
            output_file = os.path.join(crds_dir, f"{filename}.rst")
            file_content = self._get_crd_content(self.rst_output, crd_type)
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(file_content)

    def _get_crd_content(self, rst_output, crd_type):
        """Extract the content for a specific CRD type from the RST output."""
        crd_content = []
        in_crd_section = False
        for line in rst_output.splitlines():
            if line.startswith(f".. _{crd_type.lower()}:"):
                in_crd_section = True
            elif in_crd_section and line.startswith(".. _") and not line.startswith(f".. _{crd_type.lower()}"):
                break
            if in_crd_section:
                crd_content.append(line)

        # print(f"CRD content for {crd_type}:\n{crd_content}")
        return "\n".join(crd_content)

    def _get_crd_types(self):
        """Extract CRD types from the processed markdown content."""
        crd_types = []
        for line in self.rst_output.splitlines():
            match = re.match(r'- :ref:`(.*?)`', line)
            if match:
                crd_types.append(match.group(1).split(' ')[0])
        crd_types.pop(0)

        return crd_types

    def ensure_txt_files_exist(self, output_subdir):
        """For each .rst file in the given includes subdir, ensure a
        corresponding top-level .txt file exists in source/.

        If the .txt file does not exist, create a minimal scaffold that
        includes the generated .rst file via an ``.. include::`` directive.

        Naming convention:
            includes/<subdir>/atlas-deployment.rst
            -> source/atlasdeployment-custom-resource.txt
        """
        script_dir = os.path.dirname(os.path.abspath(__file__))
        workspace_root = os.path.dirname(os.path.dirname(os.path.dirname(script_dir)))
        source_dir = os.path.join(workspace_root, 'source')
        crds_dir = os.path.join(source_dir, 'includes', output_subdir)

        if not os.path.isdir(crds_dir):
            return

        for rst_file in sorted(os.listdir(crds_dir)):
            if not rst_file.endswith('.rst'):
                continue

            stem = rst_file.removesuffix('.rst')          # e.g. "atlas-deployment"
            txt_name = stem.replace('-', '') + '-custom-resource.txt'
            txt_path = os.path.join(source_dir, txt_name)

            if os.path.exists(txt_path):
                continue

            # Build a PascalCase title from the stem, e.g. "AtlasDeployment"
            pascal_title = ''.join(word.capitalize() for word in stem.split('-'))
            title_line = f'``{pascal_title}`` Custom Resource'
            underline = '=' * len(title_line)
            ref_label = txt_name.removesuffix('.txt')

            content = (
                f'.. _{ref_label}:\n'
                f'\n'
                f'{underline}\n'
                f'{title_line}\n'
                f'{underline}\n'
                f'\n'
                f'.. default-domain:: mongodb\n'
                f'\n'
                f'.. contents:: On this page\n'
                f'   :local:\n'
                f'   :backlinks: none\n'
                f'   :depth: 2\n'
                f'   :class: singlecol\n'
                f'\n'
                f'Parameters\n'
                f'----------\n'
                f'\n'
                f'.. include:: /includes/{output_subdir}/{rst_file}\n'
            )

            with open(txt_path, 'w', encoding='utf-8') as f:
                f.write(content)
            self.created_txt_files.append(txt_name)
            print(f'Created new top-level file: {txt_name}')

    def clean_up(self):
        """Clean up temporary files and directories."""
        if self.temp_dir_path and os.path.exists(self.temp_dir_path):
            shutil.rmtree(self.temp_dir_path)

    def add_files_in_git(self):
        """Add generated output files in git."""
        script_dir = os.path.dirname(os.path.abspath(__file__))
        workspace_root = os.path.dirname(os.path.dirname(os.path.dirname(script_dir)))
        os.chdir(workspace_root)

        output_dirs = [
            os.path.join('source', 'includes', 'manual-crds'),
            os.path.join('source', 'includes', 'generated-crds'),
        ]

        for output_dir in output_dirs:
            full_path = os.path.join(workspace_root, output_dir)
            if os.path.isdir(full_path):
                print(f"Adding directory to git: {output_dir}")
                subprocess.run(["git", "add", output_dir], check=True)

        # Also stage any new top-level .txt custom-resource files
        source_dir = os.path.join('source')
        source_full = os.path.join(workspace_root, source_dir)
        for f in os.listdir(source_full):
            if f.endswith('-custom-resource.txt'):
                subprocess.run(["git", "add", os.path.join(source_dir, f)], check=True)


def parse_args():
    parser = argparse.ArgumentParser(description="Run the AKO CRDs tool.")
    parser.add_argument("--repo-url", type=str, required=True, help="URL of the repository to clone.")
    # parser.add_argument("--output-path", type=str, default="output.rst", help="Path to save the output markdown file.")
    parser.add_argument("--version", type=str, required=True, help="Version to checkout in the repository.")
    parser.add_argument("--manual-crds", action="store_true", help="Flag to indicate manual CRD processing.")
    return parser.parse_args()

def main():
    args = parse_args()
    tool = AKOCRDsTool(args)
    tool.clone_repo()
    tool.checkout_version()

    # Process first markdown file: api-docs.md -> source/includes/manual-crds/
    tool.get_markdown_output('docs/api-docs.md')
    tool.process_markdown()
    tool.convert_to_rst()
    if args.manual_crds:
        print("Manual CRD processing selected.")
        tool.write_processed_output_for_manual_crds('manual-crds')
    else:
        tool.write_processed_output_for_automated_crds()

    # Process second markdown file: api-docs-generated.md -> source/includes/generated-crds/
    tool._reset_state()
    tool.get_markdown_output('docs/api-docs-generated.md')
    tool.process_markdown()
    tool.convert_to_rst()
    if args.manual_crds:
        print("Generated CRD processing selected.")
        tool.write_processed_output_for_manual_crds('generated-crds')
        tool.ensure_txt_files_exist('generated-crds')
    else:
        tool.write_processed_output_for_automated_crds()

    tool.clean_up()
    tool.add_files_in_git()

    if tool.created_txt_files:
        print('\n' + '=' * 60)
        print('ACTION REQUIRED: The following new host files were created')
        print('and must be added to the table of contents (toc):')
        print('=' * 60)
        for txt_file in tool.created_txt_files:
            print(f'  - source/{txt_file}')
        print('=' * 60 + '\n')


if __name__ == "__main__":
    main()
