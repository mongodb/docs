import argparse
import re
import yaml
import os

class YamlStepsToRst:

    def __init__(self, args):
        self.input_file = args.input_file
        self.output_file = 'output.rst'
        self.formatted_output = os.path.splitext(self.input_file)[0]+'.rst'
        self.current_doc = None
        self.previous_step_includes_content_block = False

    def parse_input(self):
        try:
            with open(self.input_file) as f:
                data = yaml.safe_load_all(f)

                for doc in data:
                    inherit_dict = None
                    replacement_dict = None
                    for k, v in doc.items():
                        if k == 'replacement':
                            replacement_dict = v
                        if k == 'inherit' or k == 'source':
                            filepath = v['file']
                            with open(filepath, 'r') as inherit_yaml:
                                inherit_data = yaml.safe_load_all(inherit_yaml)
                                try:
                                    for i in inherit_data:
                                        if i['ref'] == v['ref']:
                                            inherit_dict = i
                                except KeyError:
                                    pass
                        
                    if inherit_dict:
                        keys = ['title', 'content']
                        for i in keys:
                            try:
                                replace_targets = re.findall("{{.*}}", inherit_dict[i])

                                for target in replace_targets:
                                    target_key = target.replace('{{', '').replace('}}', '')
                                    replaced_content = inherit_dict[i].replace(target, replacement_dict[target_key])
                                    inherit_dict[i] = replaced_content
                            except:
                                pass

                        try:
                            doc['title'] = f'.. step:: {inherit_dict["title"]}'
                            doc['content'] = inherit_dict['content']
                        except:
                            pass
                    for k, v in doc.items():
                        if k == 'title' and '.. step::' not in v:
                            doc[k] = f'.. step:: {v}'
                            if self.previous_step_includes_content_block == False:
                                doc[k] = f'\n{doc[k]}'
                    self.current_doc = doc
                    self.write_output()
        except:
            self.remove_output_rst()

    def _format_line(self):
        if '.. step' in self.current_line:
            self.current_line = f'   {self.current_line}'
        elif '.. procedure::' in self.current_line:
            pass
        elif ':style:' in self.current_line:
            pass        
        else:
            self.current_line = f'      {self.current_line}'
        return(self.current_line)

    def write_output(self):
        with open(self.output_file, 'a') as f:
            for k,v in self.current_doc.items():
                if k == 'title':
                    f.write(v+'\n')
            for k,v in self.current_doc.items():
                if k == 'content':
                    f.write(v+'\n')
                    self.previous_step_includes_content_block = True
                else:
                    self.previous_step_includes_content_block = False

    def add_output_boilerplate(self):
        with open(self.output_file, 'a') as f:
            f.write('.. procedure::\n')
            f.write('   :style: normal\n\n')

    def format_output(self):
        with open(self.formatted_output, 'a+') as f:
            with open('output.rst') as parsed_content:
                for line in parsed_content:
                    self.current_line = line
                    formatted_line = self._format_line()
                    f.write(formatted_line)

    def remove_output_rst(self):
        os.remove('output.rst')

def parse_args():
    p = argparse.ArgumentParser()
    p.add_argument('input_file')
    return p.parse_args()
    
def main():
    args = parse_args()
    parser = YamlStepsToRst(args)
    parser.add_output_boilerplate()
    parser.parse_input()
    parser.format_output()
    parser.remove_output_rst()

if __name__ == '__main__':
    main()
