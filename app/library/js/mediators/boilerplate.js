define(
    [
        'jquery',
        'moddef',
        'modules/visualizations/interactions'//,
        // './globals'
    ],
    function(
        $,
        M,
        InteractionChart//,
        // globals
    ) {

        'use strict';

        /**
         * Page-level Mediator
         * @module Boilerplate
         * @implements {Stapes}
         */
        var Mediator = M({

            /**
             * Mediator Constructor
             * @return {void}
             */
            constructor : function(){

                var self = this;
                self.initEvents();

                $(function(){
                    self.resolve('domready');
                });

                self.after('domready').then(function(){
                    self.onDomReady()
                });
            },

            /**
             * Initialize events
             * @return {void}
             */
            initEvents : function(){

                var self = this;
                
            },

            /**
             * DomReady Callback
             * @return {void}
             */
            onDomReady : function(){

                var self = this;

                InteractionChart({
                    el: $('#interactions').get(0)
                });
            }

        }, ['events']);

        return new Mediator();

    }

);




