var FotE = FotE || {};
FotE.UI_BASE_SPEED = 250;
FotE.form = $("#form-wrapper form");
//$.tmpl.debug = true;

FotE.initToggleMetaSections = function() {
        var hiddenClass = "ui-meta-hidden";
        $('.meta a.toggle').live('click', function() {
                var $link = $(this);
                var $parent = $link.closest(".meta");
                var $s = $(".section", $parent);
                if ( $parent.hasClass(hiddenClass) ) {
                        $s.slideDown(FotE.UI_BASE_SPEED);
                        $link.text("Close");
                } else {
                        $s.slideUp(FotE.UI_BASE_SPEED);
                        $link.text("Open");
                }
                $parent.toggleClass(hiddenClass);
                return false;
        });
};

FotE.initAddField = function() {
        var $template = $('#field-template');
        $('#add-field-form').live('submit', function() {
                var data = FotE.collectParams();
                if ( FotE.valid(data) ) {
                        //console.log("render");
                        $template
                        .render(data)
                        .appendTo(FotE.form);
                }
                FotE.updateCopy();
                FotE.clearParams();
                return false;
        });
        $('#field-type').live('change', function() {
                var $this = $(this);
                var $paramGroups = $('#new-field-parameters .param-group');
                $paramGroups.hide();
                $('#new-' + $this.val()).show();
        });

        // add and remove class 'disabled' from add-field button as necessary
        $('#add-field-form').live('change keyup', function() {
                var data = FotE.collectParams();
                if ( FotE.valid(data) ) {
                        $(this).find('#add-field').removeClass('disabled');
                } else {
                        $(this).find('#add-field').addClass('disabled');
                }
        });

        $('#add-field').live('click', function() {
                if ( !$(this).hasClass("disabled") ) {
                        $(this).closest('form').submit();
                }
        }).addClass('disabled');
};

FotE.initRemoveField = function() {
        var $template = $('#field-template');
        $('.field', FotE.form).live('dblclick', function() {
                var $this = $(this);
                $this.css({"height": $this.innerHeight(), "background": "#f60"});
                $this.empty();
                $this.animate({backgroundColor: "#fff", height: 0}, FotE.UI_BASE_SPEED, function() {
                        $this.remove();
                });
        });
        FotE.updateCopy();
        return false;
};

FotE.initNewFieldParams = function() {
        $('#new-field-parameters').find('input').live('blur', function() {
                var $this = $(this);
                if ( $this.val() ) {
                        $this.addClass('filled');
                } else {
                        $this.removeClass('filled');
                }
        });
}

FotE.valid = function(data) {
        var $paramsContainer = $('#new-field-parameters');
        var fieldType = $('#field-type', $paramsContainer).val();
        if ( !fieldType ) return false;
        var $subContainer    = $('#new-'+fieldType, $paramsContainer);
        $('.required', $subContainer).each(function() {
                if ( !$(this).val() ) {
                        return false;
                }
        });
        return true;
};

FotE.collectParams = function() {
        var data = {};
        var $paramsContainer = $('#new-field-parameters');
        var fieldType = $('#field-type', $paramsContainer).val();
        var $subContainer    = $('#new-'+fieldType, $paramsContainer);

        data.type     = fieldType;

        data.standard = getDataFromContainer( $('.standard', $subContainer) );

        data.options  = [];

        $('.options li', $subContainer).each(function() {
                var $this = $(this);
                data.options.push( getDataFromContainer($this) );
        });

        console.log(data);
        return data;
        // data should have the following structure:
        //
        // {
        //        'type'     : String,
        //        'standard' : {
        //                             'text' : String,
        //                             'attr' : String
        //                     },
        //        'options'  : [
        //                             {
        //                                     'text' : String,
        //                                     'attr' : String,
        //                             },
        //                             {
        //                                     'text' : String,
        //                                     'attr' : String,
        //                             },
        //                             {
        //                                     'text' : String,
        //                                     'attr' : String,
        //                             }
        //                     ]
        // }

        function getDataFromContainer(container) {
                var $container = $(container);
                console.log($container);
                console.log($container.find('.text-value'));
                console.log($container);
                return {
                        'text'  : $container.find('.text-value').val(),
                        'attr' : $container.find('.attr-value').val()
                };
        }
};

FotE.clearParams = function() {
        $('#new-field-parameters').find('input').val('').removeClass('filled');
        $('#new-field-parameters #field-type').focus();
};

FotE.updateCopy = function() {
        FotE.updateHTMLCopy();
        FotE.updateCSSCopy();
};

FotE.updateHTMLCopy = function() {
        var $copyTarget = $('#copy-html textarea');
        $copyTarget.val(FotE.form.parent("#form-wrapper").html());
};
FotE.updateCSSCopy = function() {
};


$(document).ready(function() {
        FotE.initToggleMetaSections();
        FotE.initAddField();
        FotE.initRemoveField();
        FotE.initNewFieldParams();
});
