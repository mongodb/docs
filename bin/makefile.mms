ifeq ($(EDITION),hosted)
build-type = hosted
public-output = build/public/$(build-type)/$(current-branch)
publish-output = $(public-output) $(public-output)/single
publish-dependency += $(branch-output)
publish-hosted:$(publish-dependency)
endif

ifeq ($(EDITION),saas)
build-type = saas
public-output = build/public/$(build-type)
publish-output += $(public-output) $(public-output)/single
publish-saas:$(publish-output) $(publish-dependency)
endif

saas-source-dir = build/$(current-branch)/source-saas
hosted-source-dir = build/$(current-branch)/source-hosted

generate-source:generate-source-hosted generate-source-saas

generate-source-hosted:
	@mkdir -p $(hosted-source-dir)
	@rsync --recursive --times --delete source/ $(hosted-source-dir)/
	@rm -rf $(hosted-source-dir)/includes/toc/dfn-list-mms-landing-saas.rst
	@rm -rf $(hosted-source-dir)/includes/toc/dfn-list-spec-mms-landing-saas.rst
	@rm -rf $(hosted-source-dir)/includes/toc/mms-landing-saas.*
	@rm -rf $(hosted-source-dir)/includes/toc/spec-mms-landing-saas.yaml
	@sed $(SED_ARGS_FILE) 's%HOSTEDONLYINCLUDE%\/monitoring/tutorial/install-monitoring-server%' $(hosted-source-dir)/monitoring/tutorial/set-up-mms.txt
	@sed $(SED_ARGS_FILE) 's%HOSTEDONLYJETTYHTTPS%\/monitoring/tutorial/configure-jetty-https%' $(hosted-source-dir)/monitoring/tutorial/set-up-mms.txt
	@sed $(SED_ARGS_FILE) 's%THINGTHING%|monitoring|%' $(hosted-source-dir)/monitoring/tutorial/set-up-mms.txt
	@sed $(SED_ARGS_FILE) 's%.. MANAGEMENT-dfn-list%.. include:: /includes/toc/dfn-list-spec-management-landing-hosted.rst%' $(hosted-source-dir)/management.txt
	@sed $(SED_ARGS_FILE) 's%.. MANAGEMENT-toc%.. include:: /includes/toc/management-landing-permissions-hosted.rst%' $(hosted-source-dir)/management.txt
	@sed $(SED_ARGS_FILE) 's%THISBUILD%hosted%' $(hosted-source-dir)/management.txt
	@sed $(SED_ARGS_FILE) 's%HOSTEDONLYLINE::%%' $(hosted-source-dir)/monitoring/tutorial.txt
	@sed $(SED_ARGS_FILE) 's%.. MMSLANDING-dfn-list%.. include:: /includes/toc/dfn-list-spec-mms-landing-hosted.rst%' $(hosted-source-dir)/index.txt
	@sed $(SED_ARGS_FILE) 's%.. include:: /includes/table/mms-auth-roles-saas.rst%%' $(hosted-source-dir)/management/permissions.txt
	@echo [sphinx-prep]: updated source in $(hosted-source-dir)
	@-notify-send "Sphinx" "Build in progress past critical phase."
	@echo [sphinx-prep]: INFO - Build in progress past critical phase.

generate-source-saas:
	@mkdir -p $(saas-source-dir)
	@rsync --recursive --times --delete source/ $(saas-source-dir)
	@rm -f $(saas-source-dir)/monitoring/tutorial/install-monitoring-server.txt
	@rm -f $(saas-source-dir)/management/administration.txt
	@rm -f $(saas-source-dir)/monitoring/tutorial/configure-jetty-https.txt
	@rm -f $(saas-source-dir)/tutorial/connect-to-hosts-with-kerberos-authentication.txt
	@sed $(SED_ARGS_FILE) 's%HOSTEDONLYINCLUDE%%' $(saas-source-dir)/monitoring/tutorial/set-up-mms.txt
	@sed $(SED_ARGS_FILE) 's%THISBUILD%saas%' $(saas-source-dir)/management.txt
	@sed $(SED_ARGS_FILE) 's%HOSTEDONLYLINE::.*%%' $(saas-source-dir)/monitoring/tutorial.txt
	@sed $(SED_ARGS_FILE) 's%THINGTHING%the |monitoring| Agent%' $(saas-source-dir)/monitoring/tutorial/set-up-mms.txt
	@sed $(SED_ARGS_FILE) 's%HOSTEDONLYINCLUDE%%' $(saas-source-dir)/monitoring/tutorial/set-up-mms.txt
	@sed $(SED_ARGS_FILE) 's%HOSTEDONLYJETTYHTTPS%%' $(saas-source-dir)/monitoring/tutorial/set-up-mms.txt
	@sed $(SED_ARGS_FILE) 's%.. MMSLANDING-dfn-list%.. include:: /includes/toc/dfn-list-spec-mms-landing-saas.rst%' $(saas-source-dir)/index.txt
	@sed $(SED_ARGS_FILE) 's%.. include:: /includes/table/mms-auth-roles-hosted.rst%%' $(saas-source-dir)/management/permissions.txt
	@sed $(SED_ARGS_FILE) 's%:ref:`on-prem-authentication-configuration`%%' $(saas-source-dir)/management/permissions.txt
	@sed $(SED_ARGS_FILE) 's%.. MANAGEMENT-dfn-list%.. include:: /includes/toc/dfn-list-spec-management-landing-saas.rst%' $(saas-source-dir)/management.txt
	@sed $(SED_ARGS_FILE) 's%.. MANAGEMENT-toc%.. include:: /includes/toc/management-landing-permissions-saas.rst%' $(saas-source-dir)/management.txt
	@echo [sphinx-prep]: updated source in $(saas-source-dir)
	@-notify-send "Sphinx" "Build in progress past critical phase."
	@echo [sphinx-prep]: INFO - Build in progress past critical phase.

build-meta += -t mms $(build-type)
