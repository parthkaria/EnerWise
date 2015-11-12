/* global angular, $ */
(function () {
    'use strict';

    var directive = angular.module('SUNSHOT.directive', []);
    directive.directive('onlyDigits', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attr, ctrl) {
                element.keypress(function(event) {
                    if(event.which == 8 || event.which == 0){
                        return true;
                    }
                    if(event.which < 46 || event.which > 59) {
                        return false;
                        //event.preventDefault();
                    } // prevent if not number/dot

                    if(event.which == 46 && $(this).val().indexOf('.') != -1) {
                        return false;
                        //event.preventDefault();
                    } // prevent if already dot
                });
            }
        };
    });
    directive.directive('onlyInteger', function () {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function (scope, element, attr, ctrl) {
                function inputValue(val) {
                    if (val) {
                        var digits = val.replace(/[^0-9]/g, '');

                        if (digits !== val) {
                            ctrl.$setViewValue(digits);
                            ctrl.$render();
                        }
                        return parseFloat(digits);
                    }
                    return undefined;
                }

                ctrl.$parsers.push(inputValue);
            }
        };
    });

    directive.directive('barChart', [
        function () {
            return {
                restrict: 'A',
                scope: {
                    chart: '='
                },
                link: function (scope, element) {
                    var w = $(element[0]).width(),
                        h = 300;


                    w = w < 580 ? 580 : w;
                    // create canvas
                    var vis = d3.select(element[0]).append("svg:svg")
                        .attr("class", "chart")
                        .attr("width", w)
                        .attr("height", h + 10)
                        .append("svg:g")
                        .attr("transform", "translate(10,270)");


                    var render = function (matrix) {
                        var x = d3.scale.ordinal().rangeRoundBands([0, w - 50]);
                        var y = d3.scale.linear().range([0, h - 50]);
                        var z = d3.scale.ordinal().range(["#278dc5", "#0ac57b"]);

                        if (matrix === undefined) {
                            return false;
                        }
                        var remapped = ["c1", "c2"].map(function (dat, i) {
                            return matrix.map(function (d, ii) {
                                return {x: d[0], y: d[i + 1] };
                            })
                        });

                        var stacked = d3.layout.stack()(remapped);

                        x.domain(stacked[0].map(function (d) {
                            return d.x;
                        }));
                        y.domain([0, d3.max(stacked[stacked.length - 1], function (d) {
                            return d.y0 + d.y;
                        })]);

                        var xAxis = d3.svg.axis()
                            .scale(x)
                            .tickPadding(10)
                            .orient("bottom");

                        var yAxis = d3.svg.axis()
                            .scale(y)
                            .tickPadding(0)
                            .tickSize(-w)
                            .tickSubdivide(true)
                            .orient("left");

                        vis.append("g")         // Add the X Axis
                            .attr("class", "x-axis")
                            .attr("transform", "translate(0," + 5 + ")")
                            .call(xAxis);

                        vis.append("g")
                            .attr("class", "y-axis")
                            .attr("transform", "translate(0," + -250 + ")")
                            .call(yAxis);


                        var tip = d3.tip()
                            .attr('class', 'd3-tip')
                            .offset([-10, 0])
                            .html(function (d) {
                                return "<div  class='chart-tooltip'><strong class='blue'>$" + d.y + "</strong><span>Solar</span><hr/><strong class='green'>$" + d.y0 + "</strong><span>Normal</span></div> ";
                            });

                        // Add a group for each column.
                        var valgroup = vis.selectAll("g.valgroup")
                            .data(stacked)
                            .enter().append("svg:g")
                            .attr("class", "valgroup")
                            .style("fill", function (d, i) {
                                return z(i);
                            });


                        // Add a rect for each date.
                        var rect = valgroup.selectAll("rect")
                            .data(function (d) {
                                return d;
                            })
                            .enter().append("svg:rect")
                            .attr("x", function (d) {
                                return x(d.x) + 20;
                            })
                            .attr("y", function (d) {
                                return -y(d.y0) - y(d.y);
                            })
                            .attr("height", function (d) {
                                return y(d.y);
                            })
                            .attr("width", x.rangeBand() - 25);
                        /* tool tip */
                        d3.selectAll("rect")
                            .call(tip)
                            .on('mouseover', tip.show)
                            .on('mouseout', tip.hide);

                        d3.select("path.domain").remove();

                    };

                    scope.$watch(
                        "chart",
                        function () {
                            render(scope.chart);
                        }
                    );
                    /* resize */
                    $(window).off('resize').on('resize', function () {
                        // create canvas
                        w = $(element[0]).width();
                        w = w < 580 ? 580 : w;
                        $(element[0]).empty();
                        vis = d3.select(element[0]).append("svg:svg")
                            .attr("class", "chart")
                            .attr("width", w)
                            .attr("height", h + 10)
                            .append("svg:g")
                            .attr("transform", "translate(10,270)");
                        render(scope.chart);
                    })

                }

            };
        }
    ]);


    directive.directive('lineChart', [
        function () {
            return {
                restrict: 'A',
                scope: {
                    chart: '='
                },
                link: function (scope, element) {
                    var w = $(element[0]).width() - 20,
                        h = 275, margin = {left: 10, right: 10, top: 0, bottom: 30};

                    var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
                    w = w < 580 ? 580 : w;
                    var render = function (d) {
                        var data = d;

                        var colors = [
                            '#0ac57b',
                            '#278dc5'
                        ];
                        var x = d3.scale.linear()
                            .domain([0, 23])
                            .range([0, w]);


                        var y = d3.scale.linear()
                            .domain([0, 100])
                            .range([h, 0]);

                        var xAxis = d3.svg.axis()
                            .scale(x)
                            .tickSize(-h)
                            .tickPadding(19)
                            .tickSubdivide(false)
                            .orient("bottom").tickFormat(function (d) {
                                return months[(d - 1 + 8) % 12];
                            });

                        var yAxis = d3.svg.axis()
                            .scale(y)
                            .tickPadding(5)
                            .tickSize(-w)
                            .tickSubdivide(true)
                            .orient("left");


                        var vis = d3.select(element[0]).append("svg")
                            .attr("width", w + margin.left + margin.right)
                            .attr("height", h + margin.top + margin.bottom)
                            .append("g")
                            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


                        vis.append("g")
                            .attr("class", "x-axis")
                            .attr("transform", "translate(0," + h + ")")
                            .call(xAxis);

                        vis.append("g")
                            .attr("class", "y-axis")
                            .call(yAxis);

                        vis.append("g")
                            .attr("class", "y-axis")
                            .append("text")
                            .attr("class", "axis-label")
                            .attr("transform", "rotate(-90)")
                            .attr("y", (-margin.left) + 10)
                            .attr("x", -h / 2)
                            .text('');

                        vis.append("clipPath")
                            .attr("id", "clip")
                            .append("rect")
                            .attr("width", w)
                            .attr("height", h);

                        var line = d3.svg.line()
                            .interpolate("linear")
                            .x(function (d) {
                                return x(d.x);
                            })
                            .y(function (d) {
                                return y(d.y);
                            });

                        vis.selectAll('.line')
                            .data(data)
                            .enter()
                            .append("path")
                            .attr("class", "line")
                            .attr("clip-path", "url(#clip)")
                            .attr('stroke', function (d, i) {
                                return colors[i % colors.length];
                            })
                            .attr("d", line);

                        var points = vis.selectAll('.dots')
                            .data(data)
                            .enter()
                            .append("g")
                            .attr("class", "dots")
                            .attr("clip-path", "url(#clip)");

                        points.selectAll('.dot')
                            .data(function (d, index) {
                                var a = [];
                                d.forEach(function (point, i) {
                                    a.push({'index': index, 'point': point});
                                });
                                return a;
                            })
                            .enter()
                            .append('circle')
                            .attr('class', 'dot')
                            .attr("r", 6)
                            .attr('stroke', function (d, i) {
                                return colors[d.index % colors.length];
                            })
                            .attr("transform", function (d) {
                                return "translate(" + x(d.point.x) + "," + y(d.point.y) + ")";
                            }
                        );

                    };

                    scope.$watch(
                        "chart",
                        function () {
                            render(scope.chart);
                        }
                    );
                }

            };
        }
    ]);

    // directive currency
    directive.directive('maskCurrency', function () {
        return {
            restrict: 'A',
            scope: {
                amount: '=ngModel'
            },
            link: function (scope, el, attrs) {

                el.bind('focus', function () {
                    var value = scope.amount || '';
                    el.val(scope.amount.replace("$", '').trim());
                });

                el.bind('blur', function () {
                    var value = scope.amount || '';
                    el.val(value !== '' ? "$ " + el.val().replace("$", '').trim() : '');
                });

                el.bind('input', function () {
                    var value = scope.amount || '';
                    scope.amount = value !== '' ? "$ " + el.val().replace("$", '').trim() : '';
                });
                scope.$watch('amount', function () {
                    var value = scope.amount || '';
                    el.val(value !== '' ? "$ " + el.val().replace("$", '').trim() : '');
                });

            }
        }
    });
    // directive currency
    directive.directive('maskPercentage', function () {
        return {
            restrict: 'A',
            scope: {
                amount: '=ngModel'
            },
            link: function (scope, el, attrs) {

                el.bind('focus', function () {
                    var value = scope.amount + '' || '';
                    el.val(value.replace("%", '').trim());
                });

                el.bind('blur', function () {
                    var value = scope.amount + '' || '';
                    if (parseInt(value.replace("%", '').trim(), 10) > 100) {
                        value = '100';
                    }
                    value = value === '' ? '' : parseInt(value.replace("%", '').trim()) + '%';
                    scope.amount = value;
                    el.val(value);
                });

                el.bind('input', function () {
                    var value = scope.amount + '' || '';
                    scope.amount = value === '' ? '' : value.replace("%", '').trim() + '%';
                });

            }
        }
    });

})();