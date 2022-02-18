const mounted = (el,binding) => {
    let [fn,event='click',time=300] = binding.value
    let timer;
    el.addEventListener(event,()=>{
        timer && clearTimeout(timer)
        timer = setTimeout(()=>fn(),time)
    })
}
export function setupDebounceDirective(app) {
    app.directive('debounce', {mounted})
}
