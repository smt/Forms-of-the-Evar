var Formalizer = Formalizer || {};
Formalizer.UI_BASE_SPEED = 250;
$.tmpl.debug = true;

Formalizer.initToggleMetaSections = function() {
        var hiddenClass = "ui-meta-hidden";
        $('.meta a.toggle').live('click', function() {
                var $link = $(this);
                var $parent = $link.closest(".meta");
                var $s = $(".section", $parent);
                if ( $parent.hasClass(hiddenClass) ) {
                        $s.slideDown(Formalizer.UI_BASE_SPEED);
                        $link.text("Close");
                } else {
                        $s.slideUp(Formalizer.UI_BASE_SPEED);
                        $link.text("Open");
                }
                $parent.toggleClass(hiddenClass);
                return false;
        });
};

Formalizer.initAddField = function() {
        var $form = $('#form-wrapper form');
        var $template = $('#field-template');
        $('#add-field').live('click', function() {
                var data = Formalizer.collectParams();
                if ( Formalizer.valid(data) ) {
                        $template
                        .render(data)
                        .appendTo($form);
                }
                return false;
        });
        $('#field-type').bind('change', function() {
                var $this = $(this);
                var $paramGroups = $('#new-field-parameters .param-group');
                $paramGroups.hide();
                $('#new-' + $this.val()).show();
        });
};

Formalizer.initRemoveField = function() {
        var $form = $('#form-wrapper form');
        var $template = $('#field-template');
        $('.field', $form).live('dblclick', function() {
                var $this = $(this);
                $this.css({"height": $this.innerHeight(), "background": "#f60"});
                $this.empty();
                $this.animate({backgroundColor: "#fff", height: 0}, Formalizer.UI_BASE_SPEED, function() {
                        $this.remove();
                });
        });
        return false;
};

Formalizer.valid = function(data) {
        if ( !data ) return false;
        if ( !data.type ) return false;
        for ( var i = 0; i < data.params.length; i++ ) {
                if ( data.params[i].required && (data.params[i].value === "") ) {
                        return false;
                }
        }
        return true;
};

Formalizer.collectParams = function() {
        var data = {};
        data['params'] = [];
        var $paramsContainer = $('#new-field-parameters');
        var fieldType = $('#field-type', $paramsContainer).val();
        var $params = $('#new-' + fieldType, $paramsContainer).find('input');

        data['type'] = fieldType;

        $params.each(function() {
                var $this = $(this);
                data.params.push( { 'name': $this.attr("id"),
                                    'value': $this.val(),
                                    'required': $this.hasClass("required")
                                  } );
        });

        return data;
};

$(document).ready(function() {
        Formalizer.initToggleMetaSections();
        Formalizer.initAddField();
        Formalizer.initRemoveField();
});
