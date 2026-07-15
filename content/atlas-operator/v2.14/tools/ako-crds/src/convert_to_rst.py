import re
import html

class ConvertToRST:
    """Class to convert markdown content to RST format."""
    def __init__(self):
        pass
    
    def _apply_backtick_wrapping(self, cell):
        """Apply uppercase/camelCase backtick wrapping while skipping RST link constructs and directives."""
        # Pattern to identify RST links: `text <url>`__ or :ref:`text <target>`,
        # inline code ``...``, and .. note:: directives — we skip these spans
        rst_link_pattern = re.compile(r'(``[^`]+``)|(`[^`]*<[^>]*>`__)|(:ref:`[^`]*`)|(\.\. note::)')
        
        backtick_pattern = re.compile(
            r'(?<!`)(?<!`)\b([A-Z][A-Z0-9_]{1,}|[A-Z][a-z]+(?:[A-Z]+[a-z0-9]*)+|[a-z]+[A-Z][a-zA-Z0-9]*)\b(?!`)(?!`)'
        )
        
        # Split the cell into segments: RST links (skip) and everything else (process)
        result = []
        last_end = 0
        for match in rst_link_pattern.finditer(cell):
            # Process text before this RST link
            before = cell[last_end:match.start()]
            before = backtick_pattern.sub(r'``\1``', before)
            result.append(before)
            # Keep the RST link unchanged
            result.append(match.group(0))
            last_end = match.end()
        
        # Process remaining text after last RST link
        remaining = cell[last_end:]
        remaining = backtick_pattern.sub(r'``\1``', remaining)
        result.append(remaining)
        
        return ''.join(result)

    def _convert_pipe_table_in_cell(self, cell_content):
        """Convert markdown pipe tables within cell content to RST list-table format."""
        lines = cell_content.split('\n')
        table_lines = []
        non_table_before = []
        non_table_after = []
        in_table = False
        table_done = False
        
        for line in lines:
            stripped = line.strip()
            # Detect pipe table rows (must have | at start and end, or be a separator line)
            if stripped.startswith('|') and stripped.endswith('|') and not table_done:
                in_table = True
                table_lines.append(stripped)
            else:
                if in_table:
                    table_done = True
                    non_table_after.append(line)
                else:
                    non_table_before.append(line)
        
        if not table_lines or len(table_lines) < 2:
            return cell_content
        
        # Parse the pipe table
        # First row is headers, second row is separator (---|---), rest are data
        header_row = [c.strip() for c in table_lines[0].strip('|').split('|')]
        data_rows = []
        for row_line in table_lines[1:]:
            # Skip separator rows (contain only -, |, and spaces)
            if re.match(r'^[\|\-\s:]+$', row_line):
                continue
            cols = [c.strip() for c in row_line.strip('|').split('|')]
            data_rows.append(cols)
        
        if not data_rows:
            return cell_content
        
        num_cols = len(header_row)
        
        # Build RST list-table
        rst_parts = []
        rst_parts.append('\n\n.. list-table::')
        rst_parts.append('   :header-rows: 1')
        # Distribute widths evenly
        width = 100 // num_cols
        widths = [width] * (num_cols - 1) + [100 - width * (num_cols - 1)]
        rst_parts.append(f'   :widths: {" ".join(str(w) for w in widths)}')
        rst_parts.append('')
        
        # Header row
        rst_parts.append(f'   * - {header_row[0]}')
        for h in header_row[1:]:
            rst_parts.append(f'     - {h}')
        rst_parts.append('')
        
        # Data rows
        for row in data_rows:
            padded = row + [''] * (num_cols - len(row))
            rst_parts.append(f'   * - {padded[0]}')
            for c in padded[1:]:
                rst_parts.append(f'     - {c}')
            rst_parts.append('')
        
        result_parts = []
        if non_table_before:
            result_parts.append('\n'.join(non_table_before))
        result_parts.append('\n'.join(rst_parts))
        if non_table_after:
            result_parts.append('\n'.join(non_table_after))
        
        return '\n'.join(result_parts)

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
                        
                        # Handle <a> tags - convert to RST link format using placeholders
                        # to avoid the HTML tag stripper removing the angle-bracket target
                        def convert_a_tag_to_rst_link(match):
                            url = match.group(1)
                            link_text = match.group(2)
                            # Strip any remaining HTML from link text
                            link_text = re.sub(r'<[^>]+>', '', link_text).strip()
                            if url.startswith('#'):
                                anchor = url[1:]
                                if '/' in anchor:
                                    # External API anchors (e.g. #tag/Projects/...)
                                    # don't exist as RST labels; output as inline code
                                    return f'``{link_text}``'
                                else:
                                    return f':ref:`{link_text} \x00OPEN{anchor}\x00CLOSE`'
                            else:
                                return f'`{link_text} \x00OPEN{url}\x00CLOSE`__'
                        
                        cell = re.sub(r'<a[^>]*href="([^"]*)"[^>]*>(.*?)</a>', convert_a_tag_to_rst_link, cell, flags=re.IGNORECASE | re.DOTALL)
                        

                        # TODO: handle bullteted lists within table cells
                        # Convert <li> tags to bullet points, preserving internal formatting
                        cell = re.sub(r'<li>(.*?)</li>', r'\n\n - \1', cell, flags=re.IGNORECASE | re.DOTALL)
                        
                        # Convert <ul> and <ol> tags - remove the tags but keep content
                        cell = re.sub(r'</?(?:ul|ol)[^>]*>', '', cell, flags=re.IGNORECASE)
                        
                        # Handle <p> tags - convert to paragraph breaks
                        cell = re.sub(r'<p[^>]*>(.*?)</p>', r'\1\n\n', cell, flags=re.IGNORECASE | re.DOTALL)

                        # Remove any remaining HTML tags while preserving content
                        cell = re.sub(r'<[^>]+>', '', cell)
                        
                        # Restore RST link angle brackets from placeholders
                        cell = cell.replace('\x00OPEN', '<').replace('\x00CLOSE', '>')
                        
                        # Decode HTML entities
                        cell = html.unescape(cell)
                        
                        # Convert markdown links [text](url) to RST format
                        def convert_md_link_to_rst(match):
                            text = match.group(1)
                            url = match.group(2)
                            if url.startswith('#'):
                                anchor = url[1:]
                                if '/' in anchor:
                                    # External API anchors (e.g. #tag/Projects/...)
                                    # don't exist as RST labels; output as inline code
                                    return f'``{text}``'
                                else:
                                    return f':ref:`{text} <{anchor}>`'
                            else:
                                return f'`{text} <{url}>`__'
                        cell = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', convert_md_link_to_rst, cell)
                        
                        # Convert bare URLs to RST link format (but not those already inside RST links)
                        # Negative lookbehind for < (inside angle brackets) and ` (part of RST link)
                        cell = re.sub(
                            r'(?<![<`])(https?://[^\s>`,)]+)',
                            r'`\1 <\1>`__',
                            cell
                        )
                        
                        # Convert **NOTE**: pattern to .. note:: admonition
                        # Use \n\n to create paragraph breaks that the cell processing will handle
                        cell = re.sub(
                            r'\*\*NOTE\*\*:\s*(.+?)(?=\n\n|\n(?=[A-Z*])|\Z)',
                            r'\n\n.. note::\n\n   \1',
                            cell,
                            flags=re.DOTALL
                        )
                        
                        # Ensure *Validations*: starts a new paragraph and uses bold RST format
                        cell = re.sub(r'(?<!\n\n)(\n\*Validations\*:)', r'\n\1', cell)
                        cell = cell.replace('*Validations*:', '**Validations:**')
                        
                        # Convert markdown pipe tables to RST list-tables
                        cell = self._convert_pipe_table_in_cell(cell)
                        
                        # Clean up whitespace while preserving intentional line breaks
                        # Split by double newlines to preserve paragraph breaks
                        paragraphs = cell.split('\n\n')
                        cleaned_paragraphs = []
                        prev_was_directive = False
                        
                        for paragraph in paragraphs:
                            stripped_para = paragraph.strip()
                            # Check if this paragraph is a directive
                            is_directive = stripped_para.startswith('.. ') and '::' in stripped_para.split('\n')[0]
                            
                            # If this paragraph is a directive or is indented content following a directive
                            # preserve its internal structure entirely
                            if is_directive:
                                cleaned_paragraphs.append(stripped_para)
                                prev_was_directive = True
                                continue
                            elif prev_was_directive and stripped_para and (paragraph.startswith('   ') or stripped_para.startswith('* ') or stripped_para.startswith('- ')):
                                # Directive content paragraph - preserve indentation
                                cleaned_paragraphs.append(paragraph.lstrip('\n'))
                                # Keep prev_was_directive True for continued directive content
                                continue
                            
                            prev_was_directive = False
                            
                            # Clean up each paragraph
                            lines = paragraph.split('\n')
                            cleaned_lines = []
                            
                            for line in lines:
                                # Preserve bullet point lines and their formatting
                                if line.strip().startswith('* ') or line.strip().startswith('- '):
                                    cleaned_lines.append(' '.join(line.split()))
                                # Preserve RST directives
                                elif line.strip().startswith('.. '):
                                    cleaned_lines.append(line.strip())
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
                    in_directive = False
                    
                    for i, line in enumerate(lines):
                        stripped = line.strip()
                        
                        # Detect RST directive start (.. note::, .. warning::, etc.)
                        if stripped.startswith('.. ') and stripped.endswith('::'):
                            in_directive = True
                        elif stripped and not stripped.startswith(' ') and in_directive and not line.startswith('   '):
                            # Non-indented non-empty line after directive content ends the directive
                            in_directive = False
                        
                        # Check properties of the next line
                        next_is_list_item = False
                        next_is_directive = False
                        next_is_nonempty = False
                        if i + 1 < len(lines):
                            next_line = lines[i + 1].strip()
                            next_is_list_item = next_line.startswith('- ') or next_line.startswith('* ')
                            next_is_directive = next_line.startswith('.. ') and next_line.endswith('::')
                            next_is_nonempty = bool(next_line)
                        
                        # Check if previous line was a bullet item
                        prev_is_list_item = False
                        if i > 0:
                            prev_stripped = lines[i - 1].strip()
                            prev_is_list_item = prev_stripped.startswith('- ') or prev_stripped.startswith('* ')
                        
                        # Current line is a bullet item
                        is_list_item = stripped.startswith('- ') or stripped.startswith('* ')
                        
                        # Skip empty lines unless they're before list items, directives,
                        # inside directives, or after bullet items (to prevent unindent warnings)
                        if not stripped and not next_is_list_item and not next_is_directive and not in_directive and not prev_is_list_item:
                            continue
                        
                        if i == 0:
                            # First line doesn't need extra indentation
                            processed_lines.append(stripped)
                        else:
                            # Additional lines need proper indentation for RST list-table
                            # Use 7 spaces to align with content in list-table cells
                            if not stripped and (next_is_list_item or next_is_directive or in_directive):
                                processed_lines.append('\n')
                            elif line.startswith('   ') and in_directive:
                                # Preserve relative indentation for directive content
                                processed_lines.append('\n       ' + line)
                            else:
                                processed_lines.append('\n       ' + stripped)
                    
                    processed_cells.append(''.join(processed_lines))
                else:
                    processed_cells.append(cell)

            # field name - strip any RST link formatting, we just want plain text
            raw_field_name = processed_cells[0].strip()
            # Remove :ref:`text <target>` → text
            raw_field_name = re.sub(r':ref:`([^<]+)\s*<[^>]+>`', r'\1', raw_field_name)
            # Remove `text <url>`__ → text
            raw_field_name = re.sub(r'`([^<]+)\s*<[^>]+>`__', r'\1', raw_field_name)
            raw_field_name = raw_field_name.strip()
            field_name = f' {raw_field_name} '

            
            # First column of each row
            rst_table.append(f'   * -  ``{raw_field_name}``')
            
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
                # Skip content inside RST link constructs and .. note:: directives
                cell = self._apply_backtick_wrapping(cell)
                
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
                        anchor = url[1:]
                        if '/' in anchor:
                            # External API anchors (e.g. #tag/Projects/...)
                            # don't exist as RST labels; output as inline code
                            return f'``{text}``'
                        else:
                            # Convert to RST cross-reference
                            return f':ref:`{text} <{anchor}>`'
                    else:
                        # Convert to RST external link
                        return f'`{text} <{url}>`__'
                
                line = re.sub(link_pattern, replace_link, line)
                # Also convert any remaining bare URLs on this line
                line = re.sub(r'(?<![<`])(https?://[^\s>`,)]+)', r'`\1 <\1>`__', line)
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
                # Convert bare URLs to RST link format
                line = re.sub(r'(?<![<`])(https?://[^\s>`,)]+)', r'`\1 <\1>`__', line)
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
                    # Convert bare URLs to RST link format
                    line = re.sub(r'(?<![<`])(https?://[^\s>`,)]+)', r'`\1 <\1>`__', line)
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