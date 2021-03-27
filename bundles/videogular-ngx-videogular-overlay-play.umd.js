(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@videogular/ngx-videogular/core')) :
  typeof define === 'function' && define.amd ? define('@videogular/ngx-videogular/overlay-play', ['exports', '@angular/core', '@angular/common', '@videogular/ngx-videogular/core'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.videogular = global.videogular || {}, global.videogular['ngx-videogular'] = global.videogular['ngx-videogular'] || {}, global.videogular['ngx-videogular']['overlay-play'] = {}), global.ng.core, global.ng.common, global.videogular['ngx-videogular'].core));
}(this, (function (exports, core$1, common, core) { 'use strict';

  /**
   * @fileoverview added by tsickle
   * Generated from: lib/vg-overlay-play.component.ts
   * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
   */
  var VgOverlayPlayComponent = /** @class */ (function () {
      /**
       * @param {?} ref
       * @param {?} API
       * @param {?} fsAPI
       * @param {?} controlsHidden
       */
      function VgOverlayPlayComponent(ref, API, fsAPI, controlsHidden) {
          this.API = API;
          this.fsAPI = fsAPI;
          this.controlsHidden = controlsHidden;
          this.vgSkipOnControlsHidden = false;
          this.vgSkipOnControlsHiddenDelay = 0.5;
          this.areControlsHiddenChangeTime = 0;
          this.isNativeFullscreen = false;
          this.areControlsHidden = false;
          this.subscriptions = [];
          this.isBuffering = false;
          this.elem = ref.nativeElement;
      }
      /**
       * @return {?}
       */
      VgOverlayPlayComponent.prototype.ngOnInit = function () {
          var _this = this;
          if (this.API.isPlayerReady) {
              this.onPlayerReady();
          }
          else {
              this.subscriptions.push(this.API.playerReadyEvent.subscribe(( /**
               * @return {?}
               */function () { return _this.onPlayerReady(); })));
          }
      };
      /**
       * @return {?}
       */
      VgOverlayPlayComponent.prototype.onPlayerReady = function () {
          var _this = this;
          this.target = this.API.getMediaById(this.vgFor);
          this.subscriptions.push(this.fsAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this)));
          this.subscriptions.push(this.controlsHidden.isHidden.subscribe(this.onHideControls.bind(this)));
          this.subscriptions.push(this.target.subscriptions.bufferDetected.subscribe(( /**
           * @param {?} isBuffering
           * @return {?}
           */function (isBuffering) { return _this.onUpdateBuffer(isBuffering); })));
      };
      /**
       * @param {?} isBuffering
       * @return {?}
       */
      VgOverlayPlayComponent.prototype.onUpdateBuffer = function (isBuffering) {
          this.isBuffering = isBuffering;
      };
      /**
       * @param {?} fsState
       * @return {?}
       */
      VgOverlayPlayComponent.prototype.onChangeFullscreen = function (fsState) {
          if (this.fsAPI.nativeFullscreen) {
              this.isNativeFullscreen = fsState;
          }
      };
      /**
       * @param {?} hidden
       * @return {?}
       */
      VgOverlayPlayComponent.prototype.onHideControls = function (hidden) {
          if (this.vgSkipOnControlsHidden && this.areControlsHidden != hidden) {
              this.areControlsHiddenChangeTime = Date.now();
          }
          this.areControlsHidden = hidden;
      };
      /**
       * @return {?}
       */
      VgOverlayPlayComponent.prototype.onClick = function () {
          if (this.vgSkipOnControlsHidden && (this.areControlsHidden || (Date.now() - this.areControlsHiddenChangeTime) < this.vgSkipOnControlsHiddenDelay * 1000)) {
              return;
          }
          /** @type {?} */
          var state = this.getState();
          switch (state) {
              case core.VgStates.VG_PLAYING:
                  this.target.pause();
                  break;
              case core.VgStates.VG_PAUSED:
              case core.VgStates.VG_ENDED:
                  this.target.play();
                  break;
          }
      };
      /**
       * @return {?}
       */
      VgOverlayPlayComponent.prototype.getState = function () {
          /** @type {?} */
          var state = core.VgStates.VG_PAUSED;
          if (this.target) {
              if (this.target.state instanceof Array) {
                  for (var i = 0, l = this.target.state.length; i < l; i++) {
                      if (this.target.state[i] === core.VgStates.VG_PLAYING) {
                          state = core.VgStates.VG_PLAYING;
                          break;
                      }
                  }
              }
              else {
                  state = this.target.state;
              }
          }
          return state;
      };
      /**
       * @return {?}
       */
      VgOverlayPlayComponent.prototype.ngOnDestroy = function () {
          this.subscriptions.forEach(( /**
           * @param {?} s
           * @return {?}
           */function (s) { return s.unsubscribe(); }));
      };
      return VgOverlayPlayComponent;
  }());
  VgOverlayPlayComponent.decorators = [
      { type: core$1.Component, args: [{
                  selector: 'vg-overlay-play',
                  encapsulation: core$1.ViewEncapsulation.None,
                  template: "<div\n    class=\"vg-overlay-play\"\n    [class.native-fullscreen]=\"isNativeFullscreen\"\n    [class.controls-hidden]=\"areControlsHidden\"\n  >\n    <div\n      class=\"overlay-play-container\"\n      [class.vg-icon-play_arrow]=\"getState() !== 'playing'\"\n    ></div>\n  </div>",
                  styles: ["\n      vg-overlay-play {\n        z-index: 200;\n      }\n      vg-overlay-play.is-buffering {\n        display: none;\n      }\n      vg-overlay-play .vg-overlay-play {\n        transition: all 0.5s;\n        cursor: pointer;\n        position: absolute;\n        display: block;\n        color: white;\n        width: 100%;\n        height: 100%;\n        font-size: 80px;\n        filter: alpha(opacity=60);\n        opacity: 0.6;\n      }\n      vg-overlay-play .vg-overlay-play.native-fullscreen.controls-hidden {\n        cursor: none;\n      }\n      vg-overlay-play\n        .vg-overlay-play\n        .overlay-play-container.vg-icon-play_arrow {\n        pointer-events: none;\n        width: 100%;\n        height: 100%;\n        position: absolute;\n        display: flex;\n        align-items: center;\n        justify-content: center;\n        font-size: 80px;\n      }\n      vg-overlay-play .vg-overlay-play:hover {\n        filter: alpha(opacity=100);\n        opacity: 1;\n      }\n      vg-overlay-play\n        .vg-overlay-play:hover\n        .overlay-play-container.vg-icon-play_arrow:before {\n        transform: scale(1.2);\n      }\n    "]
              }] }
  ];
  /** @nocollapse */
  VgOverlayPlayComponent.ctorParameters = function () { return [
      { type: core$1.ElementRef },
      { type: core.VgApiService },
      { type: core.VgFullscreenApiService },
      { type: core.VgControlsHiddenService }
  ]; };
  VgOverlayPlayComponent.propDecorators = {
      vgFor: [{ type: core$1.Input }],
      vgSkipOnControlsHidden: [{ type: core$1.Input }],
      vgSkipOnControlsHiddenDelay: [{ type: core$1.Input }],
      isBuffering: [{ type: core$1.HostBinding, args: ['class.is-buffering',] }],
      onClick: [{ type: core$1.HostListener, args: ['click',] }]
  };
  if (false) {
      /** @type {?} */
      VgOverlayPlayComponent.prototype.vgFor;
      /** @type {?} */
      VgOverlayPlayComponent.prototype.vgSkipOnControlsHidden;
      /** @type {?} */
      VgOverlayPlayComponent.prototype.vgSkipOnControlsHiddenDelay;
      /** @type {?} */
      VgOverlayPlayComponent.prototype.elem;
      /** @type {?} */
      VgOverlayPlayComponent.prototype.target;
      /** @type {?} */
      VgOverlayPlayComponent.prototype.areControlsHiddenChangeTime;
      /** @type {?} */
      VgOverlayPlayComponent.prototype.isNativeFullscreen;
      /** @type {?} */
      VgOverlayPlayComponent.prototype.areControlsHidden;
      /** @type {?} */
      VgOverlayPlayComponent.prototype.subscriptions;
      /** @type {?} */
      VgOverlayPlayComponent.prototype.isBuffering;
      /** @type {?} */
      VgOverlayPlayComponent.prototype.API;
      /** @type {?} */
      VgOverlayPlayComponent.prototype.fsAPI;
      /**
       * @type {?}
       * @private
       */
      VgOverlayPlayComponent.prototype.controlsHidden;
  }

  /**
   * @fileoverview added by tsickle
   * Generated from: lib/overlay-play.module.ts
   * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
   */
  var VgOverlayPlayModule = /** @class */ (function () {
      function VgOverlayPlayModule() {
      }
      return VgOverlayPlayModule;
  }());
  VgOverlayPlayModule.decorators = [
      { type: core$1.NgModule, args: [{
                  imports: [common.CommonModule, core.VgCoreModule],
                  declarations: [VgOverlayPlayComponent],
                  exports: [VgOverlayPlayComponent],
              },] }
  ];

  /**
   * @fileoverview added by tsickle
   * Generated from: index.ts
   * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
   */

  /**
   * @fileoverview added by tsickle
   * Generated from: videogular-ngx-videogular-overlay-play.ts
   * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
   */

  exports.VgOverlayPlayComponent = VgOverlayPlayComponent;
  exports.VgOverlayPlayModule = VgOverlayPlayModule;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=videogular-ngx-videogular-overlay-play.umd.js.map
