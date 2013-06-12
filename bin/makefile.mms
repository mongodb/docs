ifeq ($(EDITION),hosted)
build-type = hosted
branch-output = build/$(build-type)/$(current-branch)
public-output = build/public/$(build-type)/$(current-branch)
publish-output = build/public/hosted/current $(public-output)/mms-manual.pdf 
publish-output += $(public-output) $(public-output)/single
generate-source:
	@mkdir -p $(branch-output)/source
	@rsync --recursive --times --delete source/ $(branch-output)/source/
	@sed $(SED_ARGS_FILE) 's%   Backup </backup>%%' $(branch-output)/source/index.txt
	@sed $(SED_ARGS_FILE) 's%HOSTEDONLYINCLUDE%/monitoring/tutorial/install-monitoring-server%' $(branch-output)/source/monitoring/tutorial/set-up-mms.txt
	@sed $(SED_ARGS_FILE) 's%HOSTEDINCLUDE%:: %' $(branch-output)/source/monitoring/tutorial.txt
	@rm -rf $(branch-output)/source/backup.txt $(branch-output)/source/backup/
	@echo [sphinx-prep]: updated source in $(branch-output)/source
	@-notify-send "Sphinx" "Build in progress past critical phase."
	@echo [sphinx-prep]: INFO - Build in progress past critical phase.
endif 

ifeq ($(EDITION),saas)
build-type = saas
public-output = build/public/$(build-type)
branch-output = build/$(build-type)
publish-output = $(public-output)/mms-manual.pdf $(public-output)/mms-monitoring-manual.pdf $(public-output)/mms-backup-manual.pdf 
publish-output += $(public-output) $(public-output)/single
generate-source:
	@mkdir -p $(branch-output)/source/
	@rsync --recursive --times --delete source/ $(branch-output)/source
	@rm -f $(branch-output)/source/monitoring/tutorial/install-monitoring-server.txt
	@sed $(SED_ARGS_FILE) 's%HOSTEDONLYINCLUDE%%' $(branch-output)/source/monitoring/tutorial/set-up-mms.txt
	@echo [sphinx-prep]: updated source in $(branch-output)/source
	@-notify-send "Sphinx" "Build in progress past critical phase."
	@echo [sphinx-prep]: INFO - Build in progress past critical phase.
endif


build-meta += -t mms $(build-type)
