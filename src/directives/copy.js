const mounted = (el,binding) => {
    let [event,copyContent] = binding.value;
    el.addEventListener(event,()=> {
        const textareaEl = document.createElement('textarea');
        textareaEl.value = copyContent;
        document.body.appendChild(textareaEl);
        textareaEl.select();
        const res = document.execCommand('copy');
        if (res) {
            alert('复制成功')
        } else {
            alert('复制失败')
        }
        document.body.removeChild(textareaEl)
    })
}
export function setupCopyDirective(app) {
    app.directive('copy', {mounted})
}
