import re
import html

class ConvertToRST:
    """Class to convert markdown content to RST format."""
    def __init__(self):
        pass
    
    def parse_html_table(self, html_content):
        """Parse HTML table and convert to RST list-table format."""
        # Extract table content between <table> and </table>
        table_match = re.search(r'<table[^>]*>(.*?)</table>', html_content, re.DOTALL | re.IGNORECASE)
        if not table_match:
            return html_content
        
        table_content = table_match.group(1)
        
        # Extract headers from thead
        header_rows = []
        thead_match = re.search(r'<thead[^>]*>(.*?)</thead>', table_content, re.DOTALL | re.IGNORECASE)
        if thead_match:
            thead_content = thead_match.group(1)
            th_matches = re.findall(r'<th[^>]*>(.*?)</th>', thead_content, re.DOTALL | re.IGNORECASE)
            if th_matches:
                # Clean up header text
                headers = [re.sub(r'<[^>]+>', '', th).strip() for th in th_matches]
                header_rows.append(headers)
        
        # Extract data rows from tbody
        data_rows = []
        tbody_match = re.search(r'<tbody[^>]*>(.*?)</tbody>', table_content, re.DOTALL | re.IGNORECASE)
        if tbody_match:
            tbody_content = tbody_match.group(1)
            tr_matches = re.findall(r'<tr[^>]*>(.*?)</tr>', tbody_content, re.DOTALL | re.IGNORECASE)
            
            for tr in tr_matches:
                td_matches = re.findall(r'<td[^>]*>(.*?)</td>', tr, re.DOTALL | re.IGNORECASE)
                if td_matches:
                    # Clean up cell content while preserving comprehensive formatting
                    cells = []
                    for td in td_matches:
                        cell = td.strip()
                        
                        # First, handle nested HTML elements that need to be preserved in order
                        # Convert <br/> and <br> tags to newlines temporarily
                        cell = re.sub(r'<br\s*/?>', '\n', cell, flags=re.IGNORECASE)
                        
                        # Convert <b> and <strong> tags to RST (handle nested cases)
                        cell = re.sub(r'<(b|strong)[^>]*>(.*?)</\1>', r'\2', cell, flags=re.IGNORECASE | re.DOTALL)
                        
                        # Convert <i> and <em> tags to RST italic (handle nested cases)  
                        cell = re.sub(r'<(i|em)[^>]*>(.*?)</\1>', r'*\2*', cell, flags=re.IGNORECASE | re.DOTALL)
                        
                        # Convert <code> tags to RST inline code
                        cell = re.sub(r'<code[^>]*>(.*?)</code>', r'``\1``', cell, flags=re.IGNORECASE | re.DOTALL)
                        
                        # Convert any remaining single backticks to double backticks for RST inline code
                        cell = re.sub(r'(?<!`)`([^`]+)`(?!`)', r'``\1``', cell)
                        
                        # Handle <a> tags - extract link text but preserve the text formatting
                        def extract_link_text(match):
                            link_text = match.group(2)
                            # If the link text contains formatting, preserve it
                            return link_text
                        
                        cell = re.sub(r'<a[^>]*href="([^"]*)"[^>]*>(.*?)</a>', extract_link_text, cell, flags=re.IGNORECASE | re.DOTALL)
                        

                        # TODO: handle bullteted lists within table cells
                        # Convert <li> tags to bullet points, preserving internal formatting
                        cell = re.sub(r'<li>(.*?)</li>', r'\n\n - \1', cell, flags=re.IGNORECASE | re.DOTALL)
                        
                        # Convert <ul> and <ol> tags - remove the tags but keep content
                        cell = re.sub(r'</?(?:ul|ol)[^>]*>', '', cell, flags=re.IGNORECASE)
                        
                        # Handle <p> tags - convert to paragraph breaks
                        cell = re.sub(r'<p[^>]*>(.*?)</p>', r'\1\n\n', cell, flags=re.IGNORECASE | re.DOTALL)

                        # Remove any remaining HTML tags while preserving content
                        cell = re.sub(r'<[^>]+>', '', cell)
                        
                        # Decode HTML entities
                        cell = html.unescape(cell)
                        
                        # Clean up whitespace while preserving intentional line breaks
                        # Split by double newlines to preserve paragraph breaks
                        paragraphs = cell.split('\n\n')
                        cleaned_paragraphs = []
                        
                        for paragraph in paragraphs:
                            # Clean up each paragraph
                            lines = paragraph.split('\n')
                            cleaned_lines = []
                            
                            for line in lines:
                                # Preserve bullet point lines and their formatting
                                if line.strip().startswith('* ') or line.strip().startswith('- '):
                                    cleaned_lines.append(' '.join(line.split()))
                                else:
                                    # For regular lines, clean up excessive whitespace but preserve structure
                                    cleaned_line = ' '.join(line.split())
                                    if cleaned_line:
                                        cleaned_lines.append(cleaned_line)
                            
                            if cleaned_lines:
                                cleaned_paragraphs.append('\n'.join(cleaned_lines))
                        
                        # Join paragraphs back with double newlines, then clean up any excessive newlines
                        cell = '\n\n'.join(cleaned_paragraphs)
                        
                        # Final cleanup: remove any trailing/leading whitespace and excessive newlines
                        cell = re.sub(r'\n{3,}', '\n\n', cell)  # Max 2 consecutive newlines
                        cell = cell.strip()
                        
                        # If cell is empty after cleaning, add a space to prevent empty cells
                        if not cell:
                            cell = ' '
                        
                        cells.append(cell)
                    data_rows.append(cells)
        
        if not header_rows and not data_rows:
            return html_content
        
        # Build RST list-table
        all_rows = header_rows + data_rows
        if not all_rows:
            return html_content
        
        num_cols = max(len(row) for row in all_rows)
        
        # Generate list-table format
        rst_table = []
        rst_table.append('.. list-table::')
        
        # Add header-rows option if we have headers
        if header_rows:
            rst_table.append('   :header-rows: 1')
        
        # Add widths - distribute evenly for now, could be made smarter
        if num_cols > 0:
            # width_per_col = 100 // num_cols
            # widths = [width_per_col] * (num_cols - 1) + [100 - width_per_col * (num_cols - 1)]
            widths = [25, 10, 65, 10]
            widths_str = ' '.join(str(w) for w in widths)
            rst_table.append(f'   :widths: {widths_str}')
        
        rst_table.append('')  # Empty line after directives
        
        # Add rows
        for row_idx, row in enumerate(all_rows):
            # Pad row to have the right number of columns
            padded_row = row + [''] * (num_cols - len(row))
            
            # Process each cell to handle multi-line content
            processed_cells = []
            for cell in padded_row:
                if '\n' in cell:
                    # Multi-line cell content needs proper indentation
                    lines = cell.split('\n')
                    processed_lines = []
                    
                    for i, line in enumerate(lines):
                        line = line.strip()
                        
                        # Check if next line is a list item - if so, preserve empty lines before it
                        next_is_list_item = False
                        if i + 1 < len(lines):
                            next_line = lines[i + 1].strip()
                            next_is_list_item = next_line.startswith('- ') or next_line.startswith('* ')
                        
                        # Skip empty lines unless they're before list items
                        if not line and not next_is_list_item:
                            continue
                        
                        if i == 0:
                            # First line doesn't need extra indentation
                            processed_lines.append(line)
                        else:
                            # Additional lines need proper indentation for RST list-table
                            # Use 7 spaces to align with content in list-table cells
                            # Empty lines before lists should just be blank
                            if not line and next_is_list_item:
                                processed_lines.append('\n')
                            else:
                                processed_lines.append('\n       ' + line)
                    
                    processed_cells.append(''.join(processed_lines))
                else:
                    processed_cells.append(cell)

            # field name
            field_name = f' {processed_cells[0].strip()} '

            
            # First column of each row
            rst_table.append(f'   * -  ``{field_name.strip()}``')
            
            # Remaining columns
            for cell in processed_cells[1:]:
                if field_name in cell:
                    cell = cell.replace(field_name, f' ``{field_name.strip()}`` ')
                
                # Wrap uppercase terms and PascalCase/camelCase variables in double backticks
                # Pattern matches:
                # 1. All uppercase: API, TLS, API_KEY, MAX_VALUE
                # 2. PascalCase with multiple capitals: ContainerID, UserID, DatabaseName
                # 3. camelCase: apiKey, connectionString
                # Excludes: single capitalized words like Name, Kubernetes, Resource
                # Negative lookbehind/lookahead ensures we don't wrap already wrapped text
                cell = re.sub(r'(?<!`)(?<!`)\b([A-Z][A-Z0-9_]{1,}|[A-Z][a-z]+(?:[A-Z]+[a-z0-9]*)+|[a-z]+[A-Z][a-zA-Z0-9]*)\b(?!`)(?!`)', r'``\1``', cell)
                
                rst_table.append(f'     - {cell}')
            
            # Add empty line between rows (except after the last row)
            if row_idx < len(all_rows) - 1:
                rst_table.append('')
        
        return '\n'.join(rst_table)


    def convert_markdown_to_rst(self,content):
        """Convert markdown elements to RST format."""
        lines = content.split('\n')
        rst_lines = []
        
        i = 0
        while i < len(lines):
            line = lines[i]
            
            # Skip lines that are already RST directives, comments, or anchors
            if (line.strip().startswith('.. ') or 
                line.strip().startswith(':') or
                line.strip().startswith('    :') or  # Indented RST options
                line.strip().startswith('        :') or  # More deeply indented RST options
                re.match(r'^\s*$', line)):  # Empty lines
                rst_lines.append(line)
                i += 1
                continue
                
            # Handle HTML tables
            if '<table' in line.lower():
                # Find the complete table (may span multiple lines)
                table_content = line
                table_start = i
                
                # Continue reading until we find the closing </table>
                while i < len(lines) and '</table>' not in lines[i].lower():
                    i += 1
                    if i < len(lines):
                        table_content += '\n' + lines[i]
                
                if i < len(lines) and '</table>' in lines[i].lower():
                    # Process the complete table
                    rst_table = self.parse_html_table(table_content)
                    
                    # Get the indentation from the original table start
                    original_indent = len(lines[table_start]) - len(lines[table_start].lstrip())
                    indent_str = ' ' * original_indent
                    
                    # Add indentation to each line of the RST table
                    table_lines = rst_table.split('\n')
                    for table_line in table_lines:
                        if table_line.strip():  # Don't indent empty lines
                            rst_lines.append(indent_str + table_line)
                        else:
                            rst_lines.append('')
                else:
                    # Fallback: just add the lines as-is if we couldn't parse
                    while table_start <= i:
                        rst_lines.append(lines[table_start])
                        table_start += 1
                
                i += 1
                continue
                
            # Convert markdown headers to RST headers
            if line.lstrip().startswith('#') and not line.strip().startswith('.. '):
                # Get the indentation
                indent = len(line) - len(line.lstrip())
                stripped_line = line.lstrip()
                
                # Count the header level
                level = 0
                for char in stripped_line:
                    if char == '#':
                        level += 1
                    else:
                        break
                
                # Extract header text
                header_text = stripped_line[level:].strip()
                
                # RST header characters in order of hierarchy
                rst_chars = ['=', '-', '~', '^', '+', '*']
                if level <= len(rst_chars):
                    char = rst_chars[level - 1]
                    underline = char * len(header_text)
                    
                    # Apply original indentation
                    indent_str = ' ' * indent
                    
                    # For top-level headers (=), add overline too
                    if level == 1:
                        rst_lines.append(indent_str + underline)
                        rst_lines.append(indent_str + header_text)
                        rst_lines.append(indent_str + underline)
                    else:
                        rst_lines.append(indent_str + header_text)
                        rst_lines.append(indent_str + underline)
                else:
                    # Fallback for deep headers
                    indent_str = ' ' * indent
                    rst_lines.append(indent_str + header_text)
                    rst_lines.append(indent_str + '-' * len(header_text))
            
            # Convert markdown links to RST format (but not inside HTML)
            elif '[' in line and '](' in line and ')' in line and '<' not in line:
                # Handle markdown links [text](url)
                link_pattern = r'\[([^\]]+)\]\(([^)]+)\)'
                
                def replace_link(match):
                    text = match.group(1)
                    url = match.group(2)
                    # Check if it's an anchor link (starts with #)
                    if url.startswith('#'):
                        # Convert to RST cross-reference
                        return f':ref:`{text} <{url[1:]}>`'
                    else:
                        # Convert to RST external link
                        return f'`{text} <{url}>`__'
                
                line = re.sub(link_pattern, replace_link, line)
                rst_lines.append(line)
            
            # Convert markdown code blocks to RST code blocks
            elif line.strip() == '```' or line.strip().startswith('```'):
                if line.strip() == '```':
                    rst_lines.append('.. code-block::')
                    rst_lines.append('')
                else:
                    # Extract language
                    lang = line.strip()[3:]
                    if lang:
                        rst_lines.append(f'.. code-block:: {lang}')
                    else:
                        rst_lines.append('.. code-block::')
                    rst_lines.append('')
            
            # Convert inline code to RST format (but preserve HTML content)
            elif '`' in line and not line.strip().startswith('.. ') and '<' not in line:
                # Handle inline code `code` - convert single backticks to double backticks
                # But avoid converting if already double backticks
                inline_code_pattern = r'(?<!`)`([^`]+)`(?!`)'
                line = re.sub(inline_code_pattern, r'``\1``', line)
                rst_lines.append(line)
            
            # Convert markdown tables to RST tables (basic conversion)
            elif line.strip().startswith('|') and '|' in line.strip()[1:]:
                # This is a complex conversion - for now, preserve as-is
                # A full table conversion would require analyzing multiple lines
                rst_lines.append(line)
            
            # Convert markdown bold/italic to RST format (but preserve HTML)
            else:
                if '<' not in line:  # Only convert if no HTML tags present
                    # Convert **bold** to RST **bold**
                    line = re.sub(r'\*\*([^*]+)\*\*', r'**\1**', line)
                    # Convert *italic* to RST *italic*
                    line = re.sub(r'(?<!\*)\*([^*]+)\*(?!\*)', r'*\1*', line)
                rst_lines.append(line)
            
            i += 1
        
        return '\n'.join(rst_lines)


def main():
    """Main conversion function."""
    input_file = 'current_crds_output.md'
    output_file = 'current_crds_output.rst'
    
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        print(f"Converting {input_file} to RST format...")
        converter = ConvertToRST()
        rst_content = converter.convert_markdown_to_rst(content)

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(rst_content)
        
        print(f"Conversion complete! Output written to {output_file}")
        print(f"Original file: {len(content.split())} lines")
        print(f"Converted file: {len(rst_content.split())} lines")
        
    except FileNotFoundError:
        print(f"Error: {input_file} not found")
    except Exception as e:
        print(f"Error during conversion: {e}")


if __name__ == '__main__':
    main()