const f = ()=>{
    return this
}

console.log(f.call({a:1}))