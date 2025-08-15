/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/rl-algos/dqn/page",{

/***/ "(app-pages-browser)/./app/utils/weight-table-components/weight-table-indv-container.tsx":
/*!***************************************************************************!*\
  !*** ./app/utils/weight-table-components/weight-table-indv-container.tsx ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



;
    // Wrapped in an IIFE to avoid polluting the global scope
    ;
    (function () {
        var _a, _b;
        // Legacy CSS implementations will `eval` browser code in a Node.js context
        // to extract CSS. For backwards compatibility, we need to check we're in a
        // browser context before continuing.
        if (typeof self !== 'undefined' &&
            // AMP / No-JS mode does not inject these helpers:
            '$RefreshHelpers$' in self) {
            // @ts-ignore __webpack_module__ is global
            var currentExports = module.exports;
            // @ts-ignore __webpack_module__ is global
            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;
            // This cannot happen in MainTemplate because the exports mismatch between
            // templating and execution.
            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);
            // A module can be accepted automatically based on its exports, e.g. when
            // it is a Refresh Boundary.
            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {
                // Save the previous exports signature on update so we can compare the boundary
                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)
                module.hot.dispose(function (data) {
                    data.prevSignature =
                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);
                });
                // Unconditionally accept an update to this module, we'll check if it's
                // still a Refresh Boundary later.
                // @ts-ignore importMeta is replaced in the loader
                module.hot.accept();
                // This field is set when the previous version of this module was a
                // Refresh Boundary, letting us know we need to check for invalidation or
                // enqueue an update.
                if (prevSignature !== null) {
                    // A boundary can become ineligible if its exports are incompatible
                    // with the previous exports.
                    //
                    // For example, if you add/remove/change exports, we'll want to
                    // re-execute the importing modules, and force those components to
                    // re-render. Similarly, if you convert a class component to a
                    // function, we want to invalidate the boundary.
                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {
                        module.hot.invalidate();
                    }
                    else {
                        self.$RefreshHelpers$.scheduleUpdate();
                    }
                }
            }
            else {
                // Since we just executed the code for the module, it's possible that the
                // new exports made it ineligible for being a boundary.
                // We only care about the case when we were _previously_ a boundary,
                // because we already accepted this update (accidental side effect).
                var isNoLongerABoundary = prevSignature !== null;
                if (isNoLongerABoundary) {
                    module.hot.invalidate();
                }
            }
        }
    })();


/***/ }),

/***/ "(app-pages-browser)/./app/utils/weight-table-components/weight-tables-container.tsx":
/*!***********************************************************************!*\
  !*** ./app/utils/weight-table-components/weight-tables-container.tsx ***!
  \***********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ WeightTablesContainer)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _weight_table_indv_container__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./weight-table-indv-container */ \"(app-pages-browser)/./app/utils/weight-table-components/weight-table-indv-container.tsx\");\n/* harmony import */ var _weight_table_indv_container__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_weight_table_indv_container__WEBPACK_IMPORTED_MODULE_1__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \n\nfunction WeightTablesContainer(param) {\n    let { network, selectedNeurons } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex flex-col border-white border-2 p-6 rounded-md items-center bg-slate-900 overflow-scroll\",\n        style: {\n            height: \"500px\"\n        },\n        children: Array.from(network).map((layer, i)=>{\n            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"mt-4 mb-4\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((_weight_table_indv_container__WEBPACK_IMPORTED_MODULE_1___default()), {\n                    layerName: layer.layerName,\n                    layerWeights: layer.layerWeights,\n                    layerBiases: layer.layerBiases,\n                    selectedNeuronsLayer: {\n                        inputNeurons: selectedNeurons[i],\n                        outputNeurons: selectedNeurons[i + 1]\n                    }\n                }, void 0, false, {\n                    fileName: \"/app/app/utils/weight-table-components/weight-tables-container.tsx\",\n                    lineNumber: 21,\n                    columnNumber: 13\n                }, this)\n            }, i, false, {\n                fileName: \"/app/app/utils/weight-table-components/weight-tables-container.tsx\",\n                lineNumber: 20,\n                columnNumber: 11\n            }, this);\n        })\n    }, void 0, false, {\n        fileName: \"/app/app/utils/weight-table-components/weight-tables-container.tsx\",\n        lineNumber: 14,\n        columnNumber: 5\n    }, this);\n}\n_c = WeightTablesContainer;\nvar _c;\n$RefreshReg$(_c, \"WeightTablesContainer\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC91dGlscy93ZWlnaHQtdGFibGUtY29tcG9uZW50cy93ZWlnaHQtdGFibGVzLWNvbnRhaW5lci50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFHaUU7QUFFbEQsU0FBU0Msc0JBQXNCLEtBTTdDO1FBTjZDLEVBQzVDQyxPQUFPLEVBQ1BDLGVBQWUsRUFJaEIsR0FONkM7SUFPNUMscUJBQ0UsOERBQUNDO1FBQ0NDLFdBQVU7UUFDVkMsT0FBTztZQUFFQyxRQUFRO1FBQVE7a0JBRXhCQyxNQUFNQyxJQUFJLENBQUNQLFNBQVNRLEdBQUcsQ0FBQyxDQUFDQyxPQUFPQztZQUMvQixxQkFDRSw4REFBQ1I7Z0JBQUlDLFdBQVU7MEJBQ2IsNEVBQUNMLHFFQUFvQkE7b0JBQ25CYSxXQUFXRixNQUFNRSxTQUFTO29CQUMxQkMsY0FBY0gsTUFBTUcsWUFBWTtvQkFDaENDLGFBQWFKLE1BQU1JLFdBQVc7b0JBQzlCQyxzQkFBc0I7d0JBQ3BCQyxjQUFjZCxlQUFlLENBQUNTLEVBQUU7d0JBQ2hDTSxlQUFlZixlQUFlLENBQUNTLElBQUksRUFBRTtvQkFDdkM7Ozs7OztlQVI0QkE7Ozs7O1FBWXBDOzs7Ozs7QUFHTjtLQTdCd0JYIiwic291cmNlcyI6WyIvYXBwL2FwcC91dGlscy93ZWlnaHQtdGFibGUtY29tcG9uZW50cy93ZWlnaHQtdGFibGVzLWNvbnRhaW5lci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCI7XG5cbmltcG9ydCB7IFdlaWdodFRhYmxlQ29udGFpbmVyUHJvcHMgfSBmcm9tIFwiLi4vd2VpZ2h0LXRhYmxlLXR5cGVzXCI7XG5pbXBvcnQgV2VpZ2h0VGFibGVDb250YWluZXIgZnJvbSBcIi4vd2VpZ2h0LXRhYmxlLWluZHYtY29udGFpbmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFdlaWdodFRhYmxlc0NvbnRhaW5lcih7XG4gIG5ldHdvcmssXG4gIHNlbGVjdGVkTmV1cm9ucyxcbn06IHtcbiAgbmV0d29yazogV2VpZ2h0VGFibGVDb250YWluZXJQcm9wc1tdO1xuICBzZWxlY3RlZE5ldXJvbnM6IFNldDxudW1iZXI+W107XG59KSB7XG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBib3JkZXItd2hpdGUgYm9yZGVyLTIgcC02IHJvdW5kZWQtbWQgaXRlbXMtY2VudGVyIGJnLXNsYXRlLTkwMCBvdmVyZmxvdy1zY3JvbGxcIlxuICAgICAgc3R5bGU9e3sgaGVpZ2h0OiBcIjUwMHB4XCIgfX1cbiAgICA+XG4gICAgICB7QXJyYXkuZnJvbShuZXR3b3JrKS5tYXAoKGxheWVyLCBpKSA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IG1iLTRcIiBrZXk9e2l9PlxuICAgICAgICAgICAgPFdlaWdodFRhYmxlQ29udGFpbmVyXG4gICAgICAgICAgICAgIGxheWVyTmFtZT17bGF5ZXIubGF5ZXJOYW1lfVxuICAgICAgICAgICAgICBsYXllcldlaWdodHM9e2xheWVyLmxheWVyV2VpZ2h0c31cbiAgICAgICAgICAgICAgbGF5ZXJCaWFzZXM9e2xheWVyLmxheWVyQmlhc2VzfVxuICAgICAgICAgICAgICBzZWxlY3RlZE5ldXJvbnNMYXllcj17e1xuICAgICAgICAgICAgICAgIGlucHV0TmV1cm9uczogc2VsZWN0ZWROZXVyb25zW2ldLFxuICAgICAgICAgICAgICAgIG91dHB1dE5ldXJvbnM6IHNlbGVjdGVkTmV1cm9uc1tpICsgMV0sXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgICAgfSl9XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwibmFtZXMiOlsiV2VpZ2h0VGFibGVDb250YWluZXIiLCJXZWlnaHRUYWJsZXNDb250YWluZXIiLCJuZXR3b3JrIiwic2VsZWN0ZWROZXVyb25zIiwiZGl2IiwiY2xhc3NOYW1lIiwic3R5bGUiLCJoZWlnaHQiLCJBcnJheSIsImZyb20iLCJtYXAiLCJsYXllciIsImkiLCJsYXllck5hbWUiLCJsYXllcldlaWdodHMiLCJsYXllckJpYXNlcyIsInNlbGVjdGVkTmV1cm9uc0xheWVyIiwiaW5wdXROZXVyb25zIiwib3V0cHV0TmV1cm9ucyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/utils/weight-table-components/weight-tables-container.tsx\n"));

/***/ })

});