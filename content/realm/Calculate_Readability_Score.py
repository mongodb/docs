# Import OS utility library for file manipulation.
import os
# Import Path utility library for directory crawling.
from pathlib import Path
# Import readability scoring library.
import textstat

# Config variable for which directory to scan for text files to score.
text_files_dir = './output'
# Config variable for which directory to store scores in.
scores_dir = './scores'
# Config variable for scores file name.
scores_file_name = 'scores.md'

# Creating the scores file.
with open(os.path.join(scores_dir, scores_file_name), 'w') as scores_file:
  scores_file.write('Readability scores for changed documents: \n')

# Find all text files to be scored.
for text_file_path in Path(text_files_dir).rglob('*.txt'):
  # Read text to be scored from test file.
  with open(text_file_path, 'r') as text_file:
    text = text_file.read()
  # Score text.
  flesch_reading_ease_score = textstat.flesch_reading_ease(text)
  flesch_grade_level = textstat.flesch_kincaid_grade(text)
  # Write score to file.
  with open(os.path.join(scores_dir, scores_file_name), 'a') as scores_file:
    text_file_path_without_extension = str(text_file_path).replace('.txt', '')
    text_file_path_without_extension_and_without_prefix_path = text_file_path_without_extension.replace('output/','')
    scores_file.write('- **' + str(text_file_path_without_extension_and_without_prefix_path) + 
                      '**: Grade Level: ' + str(flesch_grade_level) + 
                      ', Reading Ease: ' + str(flesch_reading_ease_score) + '\n')

# Include a reference table for Flesch Reading Ease score.
with open(os.path.join(scores_dir, scores_file_name), 'a') as scores_file:
  scores_file.writelines(['\n', 'For Grade Level, aim for 8 or below.', '\n', '\n',
                          'For Reading Ease scores, aim for 60 or above:\n', '\n', 
    '''| Score |    Difficulty     |
  |-------|-------------------|
  |90-100 | Very Easy         |
  | 80-89 | Easy              |
  | 70-79 | Fairly Easy       |
  | 60-69 | Medium            |
  | 50-59 | Fairly Hard       |
  | 30-49 | Hard              |
  | 0-29  | Very Hard         |''' , '\n', '\n'
  'For help improving readability, try [Hemingway App](https://hemingwayapp.com/).','\n'])