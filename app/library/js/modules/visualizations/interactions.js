define(
    [
        'd3',
        'stapes'
    ],
    function(
        d3,
        Stapes
    ) {

        'use strict';

        var defaults = {
            el: null
        };

        /**
         * Interaction chart module
         * @module InteractionChart
         * @implements {Stapes}
         */
        var Module = Stapes.subclass({

            /**
             * Module Constructor
             * @return {void}
             */
            constructor : function( cfg ){

                var self = this;

                self.width = 600;
                self.height = 600;

                if (!cfg.el){
                    return;
                }

                self.el = d3.select( cfg.el );
                self.svg = self.el
                    .append('svg')
                    .attr('width', self.width)
                    .attr('height', self.height)
                    ;

                self.initRegions();
                self.initLabels();
            },

            initRegions: function(){

                var self = this;
                var regionData = [
                    { x: '38%', y: '34%', r: '25%' },
                    { x: '62%', y: '34%', r: '25%' },
                    { x: '38%', y: '66%', r: '25%' },
                    { x: '62%', y: '66%', r: '25%' },
                    { x: '20%', y: '50%', r: '15%' }
                ];

                var colors = d3.scale.category10();
                var regions = self.svg.append('g').attr('class', 'regions');

                var regionEls = regions.selectAll('.region')
                    .data( regionData )
                    .enter()
                    .append('circle')
                    .attr('class', 'region')
                    .attr('r', '0%')
                    .attr('fill', function( d, idx ){
                        var c = d3.hsl( colors( idx ) ).brighter( 0.8 );
                        d.color = c;
                        return 'hsla('+[c.h, c.s*100+'%', c.l*100 + '%'].join(',')+', 0.25)';
                    })
                    // .style('opacity', 0.25)
                    .attr('cx', function( d ){ return d.x; })
                    .attr('cy', function( d ){ return d.y; })
                    ;

                regionEls.transition()
                    .duration(500)
                    .attr('r', function( d ){ return d.r; })
                    .each('end', function(){
                        regionEls.on('mouseover', function( d, idx ){
                            var el = this;
                            regions.append(function(){ return el; });
                            d3.select(this)
                                .transition()
                                .ease('ease-out')
                                .duration(300)
                                // .style('opacity', 1)
                                .attr('fill', function( d ){
                                    var c = d.color.brighter( 0.3 );
                                    return 'hsla('+[c.h, c.s*100+'%', c.l*100 + '%'].join(',')+', 1)';
                                })
                                ;
                        })
                        .on('mouseout', function( d, idx ){
                            d3.select(this)
                                .transition()
                                .ease('ease-out')
                                .duration(300)
                                // .style('opacity', 0.25)
                                .attr('fill', function( d ){
                                    var c = d.color;
                                    return 'hsla('+[c.h, c.s*100+'%', c.l*100 + '%'].join(',')+', 0.25)';
                                })
                                ;
                        });
                    })
                    ;
            },

            initLabels: function(){

                var self = this;

                var labelData = [
                    { name: 'W', x: '50%', y: '50%', self: true },
                    { name: 'H', x: '50%', y: '68%', self: true },
                    { name: 'Z', x: '50%', y: '78%' },
                    { name: 'q', x: '30%', y: '50%' },
                    { name: 'l', x: '70%', y: '50%' },
                    { name: 'γ', x: '50%', y: '30%' },
                    { name: 'g', x: '10%', y: '50%', self: true }
                ];
                var labels = self.svg.append('g').attr('class', 'labels');

                var labelsSel = labels.selectAll('.label')
                    .data( labelData )
                    .enter()
                    .append('g')
                        .attr('class', 'label')
                    ;

                labelsSel.append('circle')
                    .attr('fill', 'rgba(240, 240, 240, 0.7)')
                    .attr('stroke', function( d ){
                        return d.self ? 'rgba(70, 70, 70, 0.7)' : 'rgba(200, 200, 200, 0.7)';
                    })
                    .attr('stroke-dasharray', '8,8')
                    .attr('stroke-width', function( d ){
                        return d.self ? 3 : 1;
                    })
                    .attr('r', '0.8em')
                    .attr('cx', function( d ){ return d.x; })
                    .attr('cy', function( d ){ return d.y; })
                    ;
                labelsSel.append('text')
                    .text(function( d ){ return d.name; })
                    .attr('x', function( d ){ return d.x; })
                    .attr('y', function( d ){ return d.y; })
                    .attr('dy', '.4em')
                    .style('text-anchor', 'middle')
                    ;
            },

            /**
             * Initialize events
             * @return {void}
             */
            initEvents : function(){

                var self = this;
                

            }
        });

        return function( cfg ){
            return new Module( cfg );
        };
    }
);