var Formalizer = Formalizer || {};

Formalizer.initToggleMetaSections = function() {
        var hiddenClass = "ui-meta-hidden";
        $('.meta a.toggle').live(function() {
                var $parent = $(this).closest(".meta");
                var $sections = $(".section", $parent);
                if ( $parent.hasClass(hiddenClass) ) {
                        $sections.slideUp();
                } else {
                        $sections.slideDown();
                }
                $parent.toggleClass(hiddenClass);
                return false;
        });
};

Formalizer.initAddField = function() {
};

Formalizer.initRemoveField = function() {
};
