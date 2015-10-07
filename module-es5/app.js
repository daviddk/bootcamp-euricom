(function($, calc) {
    'use strict'
    $(document).ready(function() {

        $('.mul').on('click', function(e) {
            e.preventDefault();
            var values = getValues();
            calculate('mul', values);
            $('.btn').removeClass('btn-success');
            $(this).addClass('btn-success');
        });

        $('.add').on('click', function(e) {
            e.preventDefault();
            var values = getValues();
            calculate('add', values);
            $('.btn').removeClass('btn-success');
            $(this).addClass('btn-success');
        });
    });

    function getValues() {
        return [parseInt($('#val1').val()),
            parseInt($('#val2').val())
        ]
    }

    function calculate(cMethod, values) {
        var result;
        if (values[0] && values[1]) {
            if (cMethod == 'add') {
                result = calc.add(values[0], values[1]);
            } else {
                result = calc.mul(values[0], values[1]);
            }
            $('#result').html(result);
        } else {
            showError();
        }
    }

    function showError() {
        $('.result').text('Gelieve alle inputs correct in te vullen.');
    }

})(jQuery, calc);
