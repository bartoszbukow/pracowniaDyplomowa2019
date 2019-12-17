"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var ModalRef = /** @class */ (function () {
    function ModalRef(modalContainer, modal) {
        this.modalContainer = modalContainer;
        this.modal = modal;
        this.result$ = new rxjs_1.Subject();
        this.modal.instance.modalInstance = this;
    }
    ModalRef.prototype.close = function (output) {
        this.result$.next(output);
        this.destroy$();
    };
    ModalRef.prototype.dismiss = function (output) {
        this.result$.error(output);
        this.destroy$();
    };
    ModalRef.prototype.onResult = function () {
        return this.result$.asObservable();
    };
    ModalRef.prototype.destroy$ = function () {
        this.modal.destroy();
        this.modalContainer.destroy();
        this.result$.complete();
    };
    return ModalRef;
}());
exports.ModalRef = ModalRef;
//# sourceMappingURL=modal-ref.model.js.map