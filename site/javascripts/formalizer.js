var Formalizer = Formalizer || {};
Formalizer.UI_BASE_SPEED = 250;
Formalizer.form = $("#form-wrapper form");
//$.tmpl.debug = true;

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
        var $template = $('#field-template');
        $('#add-field').live('click', function() {
                var data = Formalizer.collectParams();
                if ( Formalizer.valid(data) ) {
                        //console.log("render");
                        $template
                        .render(data)
                        .appendTo(Formalizer.form);
                }
                Formalizer.updateCopy();
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
        var $template = $('#field-template');
        $('.field', Formalizer.form).live('dblclick', function() {
                var $this = $(this);
                $this.css({"height": $this.innerHeight(), "background": "#f60"});
                $this.empty();
                $this.animate({backgroundColor: "#fff", height: 0}, Formalizer.UI_BASE_SPEED, function() {
                        $this.remove();
                });
        });
        Formalizer.updateCopy();
        return false;
};

Formalizer.valid = function(data) {
        if ( !data ) return false;
        /*
        if ( !data.type ) return false;
        for ( var i = 0; i < data.params.length; i++ ) {
                if ( data.params[i].required && (data.params[i].value === "") ) {
                        return false;
                }
        }
        */
        for ( var param in data ) {
                if ( data[param].required && (data[param].value === "") ) {
                        return false;
                }
        }
        return true;
};

Formalizer.collectParams = function() {
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
};

Formalizer.updateCopy = function() {
        Formalizer.updateHTMLCopy();
        Formalizer.updateCSSCopy();
};

Formalizer.updateHTMLCopy = function() {
        var $copyTarget = $('#copy-html textarea');
        $copyTarget.val(Formalizer.form.parent("#form-wrapper").html());
};
Formalizer.updateCSSCopy = function() {
};


$(document).ready(function() {
        Formalizer.initToggleMetaSections();
        Formalizer.initAddField();
        Formalizer.initRemoveField();
});
