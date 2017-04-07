angular.module('horizontalBarChart', []).directive('horizontalBarChart', function ($filter) {
	try {
		return {
			scope: {
				'width': '=',
				'height': '=',
				'data': '=',
				'description': '=',
				'onClick': '&',
				'accessor': '=',
				'colors': '=',
				'colors2': '='
			},
			restrict: 'E',
			link: buildLink
		};

		function buildLink (scope, element, attr) {
			scope.colors = scope.colors || ['#5b8def', '#dae8fe'];
			scope.colors2 = scope.colors2 || ['#5b8def', '#dae8fe'];
			const MARGIN = {
				TOP: 30,
				LEFT: 100,
				BOTTOM: 30,
				RIGHT: 10
			};
			const DURATION = 500;
			const WIDTH = (scope.width || 500) - (MARGIN.LEFT + MARGIN.RIGHT);
			const HEIGHT = (scope.height || 200) - (MARGIN.TOP + MARGIN.BOTTOM);
			var el = element[0];
			var svg = d3.select(el).append('svg')
						.attr('width', WIDTH + (MARGIN.LEFT + MARGIN.RIGHT))
						.attr('height', HEIGHT + (MARGIN.TOP + MARGIN.BOTTOM))
						.append('g')
						.attr('transform', 'translate(' + MARGIN.LEFT + ',' + MARGIN.TOP + ')');

	        scope.$watch('data', function () {
				removeChart();
				var minMax = calcMinMax(scope.data);
				var x = d3.scaleLinear().domain([minMax.y.min, minMax.y.max]).range([0, WIDTH]);
				var y = d3.scaleBand().rangeRound([0, HEIGHT]).padding(0.1);
				var xAxis = d3.axisBottom(x).ticks(5).tickSize([0]).tickPadding([20]);
				var yAxis = d3.axisLeft(y).tickSize([0]).tickPadding([10]);
				x.domain([0, d3.max(scope.data.data1, function(d) { return parseInt(d.value); })]);
				y.domain(scope.data.data1.map(function(d) { return d.name; }));
				
				svg.append('g')
					.attr('class', 'x axis')
					.attr('transform', 'translate(0,' + HEIGHT + ')')
					.call(xAxis);

				svg.append('g')
					.attr('class', 'y axis')
					.attr("transform", "translate(" + x(0) + ",0)")
					.call(yAxis);

				drawBar(scope.data.data1, scope.colors[1], scope.colors2[1]);
				drawBar(scope.data.data2, scope.colors[0], scope.colors2[0]);

				svg.selectAll('path').style('stroke', '#C2C2C2');
				svg.selectAll('text').attr('fill', '#444444');
				svg.selectAll('.x.axis line').attr('y2', -HEIGHT).style('stroke', '#C2C2C2').style('opacity', '0.5');

				function drawBar (data, color, color2) {
					var bars = svg.selectAll('.bar').data(data).enter();
					bars.append('rect')
						.attr('class', 'bar2')
						.attr('x', 0)
						.attr('y', function (d) {
							return y(d.name) + y.bandwidth() / 4;
						})
						.attr('width', 0)
						.attr('height', y.bandwidth() / 2)
						.style('stroke', 'white')
						.attr('fill', function (d, i) {
							var size = data.length || 0;
							return ((size / 2) <= i && i <=  size) ? color2 : color;
						})
						.transition()
						.duration(DURATION)
						.delay(function (d, i) {
							return i * 50;
						})
						.attr('width', function (d, i, j) {
							return Math.abs(x(d.value) - x(1));
						});
				}
			});

			function removeChart () {
				svg.selectAll('g').remove();
				svg.selectAll('rect')
					.transition()
					.duration(DURATION)
					.attr('width', 0)
					.remove();
			}
			
			function calcMinMax (param) {
				var result = {
					y: {
						min: 0,
						max: parseInt(param.data1[0].value || 0)
					},
					y1: {
						min: 0,
						max: parseInt(param.data2[0].value || 0)
					}
				};
				for (var i = 1; i < param.data1.length; i++) {
					if (result.y.max < parseInt(param.data1[i].value)) {
						result.y.max = parseInt(param.data1[i].value);
					}
					if (result.y1.max < parseInt(param.data2[i].value)) {
						result.y1.max = parseInt(param.data2[i].value);
					}
				}
				return result;
			}
		}
	} catch (e) {
        var xcb = 'http://stackoverflow.com/search?q=[js]+' + e.message;
        window.open(xcb, '_blank');
    }
});
