"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Modal = /** @class */ (function () {
    function Modal() {
    }
    Modal.prototype.close = function (output) {
        this.modalInstance.close(output);
    };
    Modal.prototype.dismiss = function (output) {
        this.modalInstance.dismiss(output);
    };
    return Modal;
}());
exports.Modal = Modal;
//# sourceMappingURL=modal.model.js.map