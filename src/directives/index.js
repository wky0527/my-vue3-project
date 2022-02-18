//自定义指令可用来操作一些原生dom操作逻辑
import {setupCopyDirective} from '@/directives/copy.js';
import {setupDebounceDirective} from "@/directives/debounce.js";

export function setupGlobalDirectives(app) {
    setupCopyDirective(app);
    setupDebounceDirective(app);
}
