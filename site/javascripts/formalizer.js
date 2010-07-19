var Formalizer = Formalizer || {};
Formalizer.UI_BASE_SPEED = 50;

Formalizer.initToggleMetaSections = function() {
        var hiddenClass = "ui-meta-hidden";
        $('.meta a.toggle').live('click', function() {
                var $link = $(this);
                var $parent = $link.closest(".meta");
                var $s = $(".section", $parent);
                if ( $parent.hasClass(hiddenClass) ) {
                        $s.slideDown(Formalizer.UI_BASE_SPEED * 5);
                        $link.text("Close");
                } else {
                        $s.slideUp(Formalizer.UI_BASE_SPEED * 5);
                        $link.text("Open");
                }
                $parent.toggleClass(hiddenClass);
                return false;
        });
};

Formalizer.initAddField = function() {
        var $form = $('#form-wrapper form');
        var $template = $('#field-template');
        $('.add-field').live('click', function() {
                var data = { inputID: "first-name", labelText: "First Name" };
                $template.render(data).appendTo($form);
                return false;
        });
};

Formalizer.initRemoveField = function() {
        return false;
};

$(document).ready(function() {
        Formalizer.initToggleMetaSections();
        Formalizer.initAddField();
        Formalizer.initRemoveField();
});
