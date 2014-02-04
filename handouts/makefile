BUILD = build
EXTENSION = rst
SOURCE0 = ./

SOURCE0_FILES := $(wildcard $(SOURCE0)/*.$(EXTENSION))
PDF_OUTPUT0_FILES = $(subst $(EXTENSION),pdf,$(subst $(SOURCE0),$(BUILD),$(SOURCE0_FILES)))
HTML_OUTPUT0_FILES = $(subst $(EXTENSION),html,$(subst $(SOURCE0),$(BUILD),$(SOURCE0_FILES)))
PDF_OUTPUT_FILES = $(PDF_OUTPUT0_FILES)
HTML_OUTPUT_FILES = $(HTML_OUTPUT0_FILES)
OUTPUT_FILES = $(HTML_OUTPUT_FILES) $(PDF_OUTPUT_FILES)

HTMLCMD = rst2html.py --exit-status=2
LATEXCMD = rst2latex.py --exit-status=2 --latex-preamble="\usepackage{fullpage} \usepackage{parskip} \usepackage{fancyhdr} \usepackage{graphicx} \pagestyle{fancy} \renewcommand{\headrulewidth}{0pt} \renewcommand{\footrulewidth}{0pt} \PassOptionsToPackage{hyphens}{url}" --documentoptions=letter --documentclass=article
PDFCMD = pdflatex --interaction batchmode --output-directory $(BUILD)/

all:$(BUILD) mongodb-logo.eps $(OUTPUT_FILES) 

$(BUILD):
	@mkdir -p ../build/handouts/
	@-ln -s ../build/handouts/ build
	@echo [setup]: '$@' directory created.
$(BUILD)/%.tex:$(SOURCE0)/%.$(EXTENSION)
	@$(LATEXCMD) $< >$@
	@echo [rst2latex]: converted $<
$(BUILD)/%.html:$(SOURCE0)/%.$(EXTENSION)
	@$(HTMLCMD) $< >$@
	@echo [rst2html]: converted $<

$(BUILD)/%.pdf:$(BUILD)/%.tex
	@$(PDFCMD) '$<' >|$@.log
	@echo [pdflatex]: \(1/3\) built '$@'
	@$(PDFCMD) '$<' >>$@.log
	@echo [pdflatex]: \(2/3\) built '$@'
	@$(PDFCMD) '$<' >>$@.log
	@echo [pdflatex]: \(3/3\) built '$@'


mongodb-logo.eps:
	curl -O http://docs.mongodb.org/mongodb-logo-print.eps
	mv mongodb-logo-print.eps mongodb-logo.eps

logo.png:
	curl http://docs.mongodb.org/logo-print.png >| $@
