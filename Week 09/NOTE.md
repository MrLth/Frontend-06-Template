# 最佳实践

1. 将零散在各处的相关逻辑，通过一个类似 reducer 的函数集中起来。方便维护

   也可以使用对象来实现

   ```typescript
   function emit(token) {
       // common sth ...
       
       const t = token.type
       /*sw*/ if (t === 'startTag') {
         	// do startTag ... 
       } else if (t === 'endTag') {
           // do endTag ...
       } else if (t === 'text') {
           // do text ...
       }
   }
   
   function closure(){
       // excu once common sth ...
       return {
           startTag(){},
           endTag(){}
           text(){}
       }
   }
   ```

2. 利用 **`proxy`** 或者 **`getter、setter`** 将时间成本分摊到被需要时