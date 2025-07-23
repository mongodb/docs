from contextlib import redirect_stdout
import io

def get_expected_output(output_filepath):
        # open the expected output file
        file = open(output_filepath)
        output_lines = file.readlines()
        file.close()
        
        expected_list = []
        for line in output_lines:
            expected_list.append(line.strip())
        
        # simulate printing the expected output
        with redirect_stdout(io.StringIO()) as stdout:
            for document in expected_list:
                print(document)
        captured_expected_output = stdout.getvalue()

        return captured_expected_output