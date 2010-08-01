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
        if ( !data ) return false;
        for ( var param in data ) {
                if ( data[param].required && (data[param].value === "") ) {
                        return false;
                }
        }
        return true;
};

FotE.collectParams = function() {
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
