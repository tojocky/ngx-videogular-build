import { Component, ViewEncapsulation, ElementRef, Input, HostBinding, HostListener, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VgStates, VgApiService, VgFullscreenApiService, VgControlsHiddenService, VgCoreModule } from '@videogular/ngx-videogular/core';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/vg-overlay-play.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class VgOverlayPlayComponent {
    /**
     * @param {?} ref
     * @param {?} API
     * @param {?} fsAPI
     * @param {?} controlsHidden
     */
    constructor(ref, API, fsAPI, controlsHidden) {
        this.API = API;
        this.fsAPI = fsAPI;
        this.controlsHidden = controlsHidden;
        this.vgSkipIfControlsHidden = false;
        this.vgSkipIfControlsHiddenDelay = 0.5;
        this.isNativeFullscreen = false;
        this.areControlsHidden = false;
        this.areControlsHiddenChangeTime = 0;
        this.subscriptions = [];
        this.isBuffering = false;
        this.elem = ref.nativeElement;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.API.isPlayerReady) {
            this.onPlayerReady();
        }
        else {
            this.subscriptions.push(this.API.playerReadyEvent.subscribe((/**
             * @return {?}
             */
            () => this.onPlayerReady())));
        }
    }
    /**
     * @return {?}
     */
    onPlayerReady() {
        this.target = this.API.getMediaById(this.vgFor);
        this.subscriptions.push(this.fsAPI.onChangeFullscreen.subscribe(this.onChangeFullscreen.bind(this)));
        this.subscriptions.push(this.controlsHidden.isHidden.subscribe(this.onHideControls.bind(this)));
        this.subscriptions.push(this.target.subscriptions.bufferDetected.subscribe((/**
         * @param {?} isBuffering
         * @return {?}
         */
        (isBuffering) => this.onUpdateBuffer(isBuffering))));
    }
    /**
     * @param {?} isBuffering
     * @return {?}
     */
    onUpdateBuffer(isBuffering) {
        this.isBuffering = isBuffering;
    }
    /**
     * @param {?} fsState
     * @return {?}
     */
    onChangeFullscreen(fsState) {
        if (this.fsAPI.nativeFullscreen) {
            this.isNativeFullscreen = fsState;
        }
    }
    /**
     * @param {?} hidden
     * @return {?}
     */
    onHideControls(hidden) {
        if (this.vgSkipIfControlsHidden && this.areControlsHidden != hidden) {
            this.areControlsHiddenChangeTime = Date.now();
        }
        this.areControlsHidden = hidden;
    }
    /**
     * @return {?}
     */
    onClick() {
        if (this.vgSkipIfControlsHidden && (this.areControlsHidden || (Date.now() - this.areControlsHiddenChangeTime) < this.vgSkipIfControlsHiddenDelay * 1000)) {
            return;
        }
        /** @type {?} */
        const state = this.getState();
        switch (state) {
            case VgStates.VG_PLAYING:
                this.target.pause();
                break;
            case VgStates.VG_PAUSED:
            case VgStates.VG_ENDED:
                this.target.play();
                break;
        }
    }
    /**
     * @return {?}
     */
    getState() {
        /** @type {?} */
        let state = VgStates.VG_PAUSED;
        if (this.target) {
            if (this.target.state instanceof Array) {
                for (let i = 0, l = this.target.state.length; i < l; i++) {
                    if (this.target.state[i] === VgStates.VG_PLAYING) {
                        state = VgStates.VG_PLAYING;
                        break;
                    }
                }
            }
            else {
                state = this.target.state;
            }
        }
        return state;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscriptions.forEach((/**
         * @param {?} s
         * @return {?}
         */
        (s) => s.unsubscribe()));
    }
}
VgOverlayPlayComponent.decorators = [
    { type: Component, args: [{
                selector: 'vg-overlay-play',
                encapsulation: ViewEncapsulation.None,
                template: `<div
    class="vg-overlay-play"
    [class.native-fullscreen]="isNativeFullscreen"
    [class.controls-hidden]="areControlsHidden"
  >
    <div
      class="overlay-play-container"
      [class.vg-icon-play_arrow]="getState() !== 'playing'"
    ></div>
  </div>`,
                styles: [`
      vg-overlay-play {
        z-index: 200;
      }
      vg-overlay-play.is-buffering {
        display: none;
      }
      vg-overlay-play .vg-overlay-play {
        transition: all 0.5s;
        cursor: pointer;
        position: absolute;
        display: block;
        color: white;
        width: 100%;
        height: 100%;
        font-size: 80px;
        filter: alpha(opacity=60);
        opacity: 0.6;
      }
      vg-overlay-play .vg-overlay-play.native-fullscreen.controls-hidden {
        cursor: none;
      }
      vg-overlay-play
        .vg-overlay-play
        .overlay-play-container.vg-icon-play_arrow {
        pointer-events: none;
        width: 100%;
        height: 100%;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 80px;
      }
      vg-overlay-play .vg-overlay-play:hover {
        filter: alpha(opacity=100);
        opacity: 1;
      }
      vg-overlay-play
        .vg-overlay-play:hover
        .overlay-play-container.vg-icon-play_arrow:before {
        transform: scale(1.2);
      }
    `]
            }] }
];
/** @nocollapse */
VgOverlayPlayComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: VgApiService },
    { type: VgFullscreenApiService },
    { type: VgControlsHiddenService }
];
VgOverlayPlayComponent.propDecorators = {
    vgFor: [{ type: Input }],
    vgSkipIfControlsHidden: [{ type: Input }],
    vgSkipIfControlsHiddenDelay: [{ type: Input }],
    isBuffering: [{ type: HostBinding, args: ['class.is-buffering',] }],
    onClick: [{ type: HostListener, args: ['click',] }]
};
if (false) {
    /** @type {?} */
    VgOverlayPlayComponent.prototype.vgFor;
    /** @type {?} */
    VgOverlayPlayComponent.prototype.vgSkipIfControlsHidden;
    /** @type {?} */
    VgOverlayPlayComponent.prototype.vgSkipIfControlsHiddenDelay;
    /** @type {?} */
    VgOverlayPlayComponent.prototype.elem;
    /** @type {?} */
    VgOverlayPlayComponent.prototype.target;
    /** @type {?} */
    VgOverlayPlayComponent.prototype.isNativeFullscreen;
    /** @type {?} */
    VgOverlayPlayComponent.prototype.areControlsHidden;
    /** @type {?} */
    VgOverlayPlayComponent.prototype.areControlsHiddenChangeTime;
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
class VgOverlayPlayModule {
}
VgOverlayPlayModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, VgCoreModule],
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

export { VgOverlayPlayComponent, VgOverlayPlayModule };
//# sourceMappingURL=videogular-ngx-videogular-overlay-play.js.map
