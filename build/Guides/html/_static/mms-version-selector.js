$(function() {

    // Only automatically redirect when the referrer is a search engine
    var searchEngineRegex = /(google\.com)|(duckduckgo\.com)|(bing\.com)|(yahoo\.com)/;
    function isReferredBySearchEngine() {
        return document.referrer.search(searchEngineRegex) != -1;
    }
    function isRedirectedFromMMS() {
        // return true only if redirected from a different version of mms docs
        return document.referrer.indexOf(location.origin) != -1 && document.referrer.indexOf(window.basePath) == -1;
    }

    var modalOptions = {
        show: true,
        backdrop: 'static',
        keyboard: false
    };

    var $onboardingModal = $('#onboarding-modal');

    var mmsPath = $.cookie('mms_version_path');

    if (!mmsPath) {
        $onboardingModal.modal(modalOptions);
    } else if (isRedirectedFromMMS()) {
        $('.redirect-alert').removeClass('hide');
        $('.redirect-alert .redirect-link').on('click', function(e) {
            e.preventDefault();
            window.location.href = document.referrer;
        });
    } else if (mmsPath !== "false" && isReferredBySearchEngine() && window.basePath != mmsPath) {
        var docsPath = window.fullDocsPath(mmsPath);
        window.location.href = docsPath;
    }

    $('.open-version-modal').on('click', function(e) {
        e.preventDefault();

        $onboardingModal.modal(modalOptions);
    });

    $('.is-hosted, .is-on-prem').on('click', function(e) {
        e.preventDefault();

        var $target = $(e.currentTarget);
        saveSelection($target.data('path'), $target.hasClass('current'));
    });

    $(".mms-version-selector").on('click', function(e) {
        e.preventDefault();
        var path = $(e.currentTarget).data('path');
        $.cookie('mms_version_path', path, {path: '/'});

        $('.option-popup .saving-copy').removeClass('hide');
        $('.mms-version-btn-group').addClass('hide');
        window.setTimeout(function() {
            window.location.href = window.fullDocsPath(path);
        }, 1000);
    });

    $('#onboarding-modal .cancel').on('click', function(e) {
        e.preventDefault();
        $.cookie('mms_version_path', false, {path: '/'});
        $onboardingModal.modal('hide');
    });

    var saveSelection = function(path, isCurrent) {
        var fn;

        $.cookie('mms_version_path', path, {path: '/'});

        $('#onboarding-modal .action-buttons').addClass('hide');
        if (isCurrent) {
            $('#onboarding-modal .saving-copy').removeClass('hide');
            fn = function() {
                $onboardingModal.modal('hide');
            };
        } else {
            $('#onboarding-modal .redirect-copy').removeClass('hide');
            fn = function() {
                window.location.href = window.fullDocsPath(path);
            };
        }

        window.setTimeout(fn, 1000);
    };

});