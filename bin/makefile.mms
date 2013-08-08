ifeq ($(EDITION),hosted)
build-type = hosted
branch-output = build/$(build-type)/$(current-branch)
public-output = build/public/$(build-type)/$(current-branch)
publish-output = build/public/$(build-type)/current build/public/$(build-type)/upcoming # $(public-output)/mms-manual.pdf
publish-output += $(public-output) $(public-output)/single
publish-dependency += $(branch-output)
publish-hosted:$(publish-output) $(publish-dependency)
endif 

ifeq ($(EDITION),saas)
build-type = saas
public-output = build/public/$(build-type)
branch-output = build/$(build-type)
# publish-output = $(public-output)/mms-manual.pdf $(public-output)/mms-monitoring-manual.pdf $(public-output)/mms-backup-manual.pdf
publish-output += $(public-output) $(public-output)/single
publish-dependency += $(branch-output)
publish-saas:$(publish-output) $(publish-dependency)
endif

generate-source-hosted:
	@mkdir -p build/hosted/$(current-branch)/source
	@rsync --recursive --times --delete source/ build/hosted/$(current-branch)/source/
	@sed $(SED_ARGS_FILE) 's%   MMS Backup </backup>%%' build/hosted/$(current-branch)/source/index.txt
	@sed $(SED_ARGS_FILE) 's%HOSTEDONLYINCLUDE%\/monitoring/tutorial/install-monitoring-server%' build/hosted/$(current-branch)/source/monitoring/tutorial/set-up-mms.txt
	@sed $(SED_ARGS_FILE) 's%HOSTEDINCLUDE%:: %' build/hosted/$(current-branch)/source/monitoring/tutorial.txt
	@sed $(SED_ARGS_FILE) 's%SAASONLY%%' build/saas/source/monitoring/settings.txt
	@rm -rf build/hosted/$(current-branch)/source/backup.txt build/hosted/$(current-branch)/source/backup/ 
	@echo [sphinx-prep]: updated source in build/hosted/$(current-branch)/source
	@-notify-send "Sphinx" "Build in progress past critical phase."
	@echo [sphinx-prep]: INFO - Build in progress past critical phase.

generate-source-saas:
	@mkdir -p build/saas/source/
	@rsync --recursive --times --delete source/ build/saas/source
	@rm -f build/saas/source/monitoring/tutorial/install-monitoring-server.txt
	@sed $(SED_ARGS_FILE) 's%HOSTEDONLYINCLUDE%%' build/saas/source/monitoring/tutorial/set-up-mms.txt
	@sed $(SED_ARGS_FILE) 's%SAASONLY%   .. include:: /includes/settings-backup.rst%' build/saas/source/monitoring/settings.txt
	@echo [sphinx-prep]: updated source in build/saas/source
	@-notify-send "Sphinx" "Build in progress past critical phase."
	@echo [sphinx-prep]: INFO - Build in progress past critical phase.

build-meta += -t mms $(build-type)
