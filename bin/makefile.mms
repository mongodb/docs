ifeq ($(EDITION),hosted)
build-type = hosted
branch-output = build/$(build-type)/$(current-branch)
public-output = build/public/$(build-type)/$(current-branch)
publish-output = build/public/$(build-type)/current build/public/$(build-type)/upcoming
publish-output += $(public-output) $(public-output)/single
publish-dependency += $(branch-output)
publish-hosted:$(publish-output) $(publish-dependency)
endif 

ifeq ($(EDITION),saas)
build-type = saas
public-output = build/public/$(build-type)
branch-output = build/$(build-type)
publish-output += $(public-output) $(public-output)/single
publish-dependency += $(branch-output)
publish-saas:$(publish-output) $(publish-dependency)
endif

generate-source-hosted:
	@mkdir -p build/hosted/$(current-branch)/source
	@rsync --recursive --times --delete source/ build/hosted/$(current-branch)/source/
	@sed $(SED_ARGS_FILE) 's%   MMS Backup </backup>%%' build/hosted/$(current-branch)/source/index.txt
	@sed $(SED_ARGS_FILE) 's%   MMS Backup <backup.txt>%%' build/hosted/$(current-branch)/source/index.txt
	@sed $(SED_ARGS_FILE) 's%HOSTEDONLYINCLUDE%\/monitoring/tutorial/install-monitoring-server%' build/hosted/$(current-branch)/source/monitoring/tutorial/set-up-mms.txt
	@sed $(SED_ARGS_FILE) 's%HOSTEDINCLUDE%:: %' build/hosted/$(current-branch)/source/monitoring/tutorial.txt
	@sed $(SED_ARGS_FILE) 's%SAASONLY-settings%%' build/saas/source/management/settings.txt
	@sed $(SED_ARGS_FILE) 's%.. MMSLANDING-dfn-list%.. include:: /includes/dfn-list-spec-mms-landing-hosted.rst%' build/hosted/$(current-branch)/source/index.txt
	@sed $(SED_ARGS_FILE) 's%.. include:: /includes/table-mms-auth-roles-saas.rst%%' build/hosted/$(current-branch)/source/management/permissions.txt 
	@sed $(SED_ARGS_FILE) 's%.. MANAGEMENT-dfn-list%.. include:: /includes/dfn-list-spec-management-landing-hosted.rst%' build/hosted/$(current-branch)/source/management.txt
	@sed $(SED_ARGS_FILE) 's%.. MANAGEMENT-toc%.. include:: /includes/toc-management-landing-permissions-hosted.rst%' build/hosted/$(current-branch)/source/management.txt
	@rm -rf build/hosted/$(current-branch)/source/backup.txt build/hosted/$(current-branch)/source/backup/
	@rm -rf build/hosted/$(current-branch)/source/includes/dfn-list-mms-landing-saas.rst build/hosted/$(current-branch)/source/includes/dfn-list-spec-mms-landing-saas.rst	
	@rm -rf build/hosted/$(current-branch)/source/includes/toc-mms-landing-saas.* build/hosted/$(current-branch)/source/includes/toc-spec-mms-landing-saas.yaml
	@echo [sphinx-prep]: updated source in build/hosted/$(current-branch)/source
	@-notify-send "Sphinx" "Build in progress past critical phase."
	@echo [sphinx-prep]: INFO - Build in progress past critical phase.

generate-source-saas:
	@mkdir -p build/saas/source/
	@rsync --recursive --times --delete source/ build/saas/source
	@rm -f build/saas/source/monitoring/tutorial/install-monitoring-server.txt
	@sed $(SED_ARGS_FILE) 's%HOSTEDONLYINCLUDE%%' build/saas/source/monitoring/tutorial/set-up-mms.txt
	@sed $(SED_ARGS_FILE) 's%SAASONLY-settings%   .. include:: /includes/settings-backup.rst%' build/saas/source/management/settings.txt
	@sed $(SED_ARGS_FILE) 's%.. MMSLANDING-dfn-list%.. include:: /includes/dfn-list-spec-mms-landing-saas.rst%' build/saas/source/index.txt 
	@sed $(SED_ARGS_FILE) 's%.. MMSLANDING-backup%.. include:: /includes/toc-mms-landing-backup.rst%' build/saas/source/index.txt 
	@sed $(SED_ARGS_FILE) 's%.. include:: /includes/table-mms-auth-roles-hosted.rst%%' build/saas/source/management/permissions.txt 
	@sed $(SED_ARGS_FILE) 's%:ref:`on-prem-authentication-configuration`%%' build/saas/source/management/permissions.txt 
	@sed $(SED_ARGS_FILE) 's%.. MANAGEMENT-dfn-list%.. include:: /includes/dfn-list-spec-management-landing-saas.rst%' build/saas/source/management.txt
	@sed $(SED_ARGS_FILE) 's%.. MANAGEMENT-toc%.. include:: /includes/toc-management-landing-permissions-saas.rst%' build/saas/source/management.txt
	@echo [sphinx-prep]: updated source in build/saas/source
	@-notify-send "Sphinx" "Build in progress past critical phase."
	@echo [sphinx-prep]: INFO - Build in progress past critical phase.

build-meta += -t mms $(build-type)
