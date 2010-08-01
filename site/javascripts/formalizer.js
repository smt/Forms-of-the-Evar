var FoTE = FoTE || {};
FoTE.UI_BASE_SPEED = 250;
FoTE.form = $("#form-wrapper form");
//$.tmpl.debug = true;

FoTE.initToggleMetaSections = function() {
        var hiddenClass = "ui-meta-hidden";
        $('.meta a.toggle').live('click', function() {
                var $link = $(this);
                var $parent = $link.closest(".meta");
                var $s = $(".section", $parent);
                if ( $parent.hasClass(hiddenClass) ) {
                        $s.slideDown(FoTE.UI_BASE_SPEED);
                        $link.text("Close");
                } else {
                        $s.slideUp(FoTE.UI_BASE_SPEED);
                        $link.text("Open");
                }
                $parent.toggleClass(hiddenClass);
                return false;
        });
};

FoTE.initAddField = function() {
        var $template = $('#field-template');
        $('#add-field-form').live('submit', function() {
                var data = FoTE.collectParams();
                if ( FoTE.valid(data) ) {
                        //console.log("render");
                        $template
                        .render(data)
                        .appendTo(FoTE.form);
                }
                FoTE.updateCopy();
                FoTE.clearParams();
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
                var data = FoTE.collectParams();
                if ( FoTE.valid(data) ) {
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

FoTE.initRemoveField = function() {
        var $template = $('#field-template');
        $('.field', FoTE.form).live('dblclick', function() {
                var $this = $(this);
                $this.css({"height": $this.innerHeight(), "background": "#f60"});
                $this.empty();
                $this.animate({backgroundColor: "#fff", height: 0}, FoTE.UI_BASE_SPEED, function() {
                        $this.remove();
                });
        });
        FoTE.updateCopy();
        return false;
};

FoTE.initNewFieldParams = function() {
        $('#new-field-parameters').find('input').live('blur', function() {
                var $this = $(this);
                if ( $this.val() ) {
                        $this.addClass('filled');
                } else {
                        $this.removeClass('filled');
                }
        });
}

FoTE.valid = function(data) {
        if ( !data ) return false;
        for ( var param in data ) {
                if ( data[param].required && (data[param].value === "") ) {
                        return false;
                }
        }
        return true;
};

FoTE.collectParams = function() {
        var data = {};
        var $paramsContainer = $('#new-field-parameters');
        var fieldType = $('#field-type', $paramsContainer).val();
        var $params = $('#new-' + fieldType, $paramsContainer).find('input');

        data['type'] = { 'value'   : fieldType,
                         'required': true
                       };

        $params.each(function() {
                var $this = $(this);
                // take the input's id and convert it to a consistent usable name
                // 'text-input-id' becomes 'inputid'
                // 'text-label-text' becomes 'labeltext'
                var name = new RegExp("^"+fieldType+"-(.*)$"). // a regex to strip out the input from the id
                               exec($this.attr("id"))[1].       // extract the remainder of the label
                               replace('-','');                 // remove the dashes

                data[name] = { 'value'   : $this.val(),
                               'required': $this.hasClass("required")
                             };
                //console.log(data.params[data.params.length-1].name);
        });

        return data;
        // data has the following structure:
        //
        // {
        //      'type' : {
        //              value : String, one of text, radio, checkbox, date, select
        //              required: Boolean, true
        //              },
        //      'inputid' : {
        //              value: String
        //              required: Boolean
        //              },
        //      'labeltext' : {
        //              value: String
        //              required: Boolean
        //              },
        //      'options': [
        //                      {
        //                              label: String
        //                              value: String
        //                      },
        //                      {
        //                              label: String
        //                              value: String
        //                      },
        //                      {
        //                              label: String
        //                              value: String
        //                      },
        //                      etc.
        //              ]
        // }
};

FoTE.clearParams = function() {
        $('#new-field-parameters').find('input').val('').removeClass('filled');
        $('#new-field-parameters #field-type').focus();
};

FoTE.updateCopy = function() {
        FoTE.updateHTMLCopy();
        FoTE.updateCSSCopy();
};

FoTE.updateHTMLCopy = function() {
        var $copyTarget = $('#copy-html textarea');
        $copyTarget.val(FoTE.form.parent("#form-wrapper").html());
};
FoTE.updateCSSCopy = function() {
};


$(document).ready(function() {
        FoTE.initToggleMetaSections();
        FoTE.initAddField();
        FoTE.initRemoveField();
        FoTE.initNewFieldParams();
});
