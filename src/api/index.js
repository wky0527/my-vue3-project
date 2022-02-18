
//立即引入
//
const requireComponent = import.meta.globEager('../api/*.js');
let modules = {};
Object.keys(requireComponent).forEach((key,index)=>{
    if(key === '../api/index.js')return;
    Object.assign(modules,requireComponent[key])
})
export default {
    modules
}
//异步引入
//const directives = import.meta.glob('./*/index.js')
