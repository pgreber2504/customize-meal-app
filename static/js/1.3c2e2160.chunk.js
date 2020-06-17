webpackJsonp([1],{145:function(e,n,t){"use strict";function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}Object.defineProperty(n,"__esModule",{value:!0});var r=t(0),o=t.n(r),i=t(7),l=t(160),s=t.n(l),c=t(49),d=t(12),u=t(146),A=t(11),p=t(19),g=function(){function e(e,n){var t=[],a=!0,r=!1,o=void 0;try{for(var i,l=e[Symbol.iterator]();!(a=(i=l.next()).done)&&(t.push(i.value),!n||t.length!==n);a=!0);}catch(e){r=!0,o=e}finally{try{!a&&l.return&&l.return()}finally{if(r)throw o}}return t}return function(n,t){if(Array.isArray(n))return n;if(Symbol.iterator in Object(n))return e(n,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),b=function(e){var n=Object(r.useState)({email:{elementType:"input",label:"Enter your E-Mail:",elementConfig:{type:"email",placeholder:""},value:"",validation:{required:!0,isEmail:!0},valid:!1,message:"",changed:!1},confirmEmail:{elementType:"input",label:"Confirm your E-Mail:",elementConfig:{type:"email",placeholder:""},value:"",validation:{required:!0,isEmail:!0},valid:!1,message:"",changed:!1},password:{elementType:"input",label:"Enter your Password:",elementConfig:{type:"password",placeholder:"min. 6 characters"},value:"",validation:{required:!0,minLength:6,maxLength:30},valid:!1,message:"",changed:!1},confirmPassword:{elementType:"input",label:"Confirm your Password:",elementConfig:{type:"password",placeholder:"min. 6 characters"},value:"",validation:{required:!0},valid:!1,message:"",changed:!1},acceptPolicy:{elementType:"checkbox",elementConfig:{type:"checkbox"},value:"Do You accept our Policy Terms ?",checked:!1,valid:!1}}),t=g(n,2),i=t[0],l=t[1],A=Object(r.useState)(!1),b=g(A,2),m=b[0],f=b[1],C=Object(r.useState)(null),v=g(C,2),x=v[0],h=v[1],B=function(e,n){var t=Object(d.b)(i[n],{value:e.target.value,valid:Object(d.a)(e.target.value,i[n].validation).isValid,message:Object(d.a)(e.target.value,i[n].validation).message,changed:!0}),r=Object(d.b)(i,a({},n,t)),o=!0;for(var s in r)o=i[s].valid&&o;l(r),f(o)},_=function(e,n){var t=Object(d.b)(i[n],{checked:e.target.checked,valid:e.target.checked}),r=Object(d.b)(i,a({},n,t)),o=!0;for(var s in r)o=i[s].valid&&o;l(r),f(!o)},y=o.a.createElement("h1",null,"Create Account");x&&(y=o.a.createElement("h1",{style:{color:"red",border:"1px solid red"}},x));var k=function(n){var t=i.email.value,a=i.password.value,r=i.confirmPassword.value,o=i.confirmEmail.value;if(t===o&&a===r&&i.acceptPolicy.checked){e.registerUser(t,a);var s=Object(d.b)(i,{acceptPolicy:Object.assign({},i.acceptPolicy,{checked:!1,valid:!1})});l(s),f(!1)}else{var c=!0,u=!0;c=t===o,u=a===r,h(i.acceptPolicy.checked?null:"You must accept our policy terms to continue"),l(Object.assign({},i,{confirmEmail:Object.assign({},i.confirmEmail,{valid:c,message:c?"":"You entered different email"}),confirmPassword:Object.assign({},i.confirmPassword,{valid:u,message:u?"":"You entered different password"})})),f(!1)}n.preventDefault()},E=[];for(var I in i)E.push({id:I,config:i[I]});var w=E.map(function(e){return o.a.createElement(u.a,{key:e.id,label:e.config.label,message:e.config.message,value:e.config.value,checked:function(n){return _(n,e.id)},touched:e.config.changed,placeholder:e.config.elementConfig,elementType:e.config.elementType,elementConfig:e.config.elementConfig,changed:function(n){return B(n,e.id)},invalid:e.config.valid,shouldValidate:e.config.validation})}),j=o.a.createElement(p.a,null),O=null;if(e.error){var R=e.error.message,P=R.replace(/_/g," ");O=o.a.createElement("p",{style:{textAlign:"center",padding:"10px 0",border:"solid 1px red",color:"red"}},e.error.code,": ",P)}return e.loader||(j=o.a.createElement("form",{onSubmit:function(e){return k(e)}},y,w,o.a.createElement(c.a,{disabled:!m,btnType:"Success"},"Create Account"))),o.a.createElement("div",{className:s.a.Register},O,j)},m=function(e){return{registerUser:function(n,t){e(A.i(n,t))}}},f=function(e){return{loader:e.auth.loader,error:e.auth.registerError}};n.default=Object(i.b)(f,m)(b)},146:function(e,n,t){"use strict";var a=t(0),r=t.n(a),o=t(147),i=t.n(o),l=function(e){var n=null,t=[i.a.InputElement];switch(!e.invalid&&e.shouldValidate&&e.touched&&t.push(i.a.Invalid),e.elementType){case"input":n=r.a.createElement("input",Object.assign({className:t.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}));break;case"textarea":n=r.a.createElement("textarea",Object.assign({className:t.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}));break;case"select":n=r.a.createElement("select",{className:t.join(" "),value:e.value,onChange:e.changed},e.elementConfig.options.map(function(e){return r.a.createElement("option",{key:e.value,value:e.value},e.displayVal)}));break;case"checkbox":n=r.a.createElement("label",{style:{color:"#6c757d"}},r.a.createElement("input",{onClick:e.checked,style:{width:"16px",height:"16px"},type:"checkbox"}),e.value);break;default:n=n=r.a.createElement("input",Object.assign({className:t.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}))}return r.a.createElement("div",{className:i.a.Input},r.a.createElement("label",{className:i.a.Label},e.label),n,r.a.createElement("span",{className:i.a.Message},e.message))};n.a=l},147:function(e,n,t){var a=t(148);"string"===typeof a&&(a=[[e.i,a,""]]);var r={hmr:!1};r.transform=void 0;t(141)(a,r);a.locals&&(e.exports=a.locals)},148:function(e,n,t){n=e.exports=t(140)(!0),n.push([e.i,".Input__Input__s67N0{width:100%;padding:10px;-webkit-box-sizing:border-box;box-sizing:border-box;margin:10px auto}.Input__Label___n-1m{font-weight:700;display:block;margin-bottom:8px}.Input__InputElement__2-aFx{outline:none;border:1px solid #212529;background-color:#212529;color:#6c757d;font:inherit;padding:6px 10px;display:block;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box}.Input__InputElement__2-aFx select option{color:#6c757d}.Input__InputElement__2-aFx:focus{outline:none;border:1px solid #40a4c8}.Input__Invalid__1sl1p{border:1px solid red}.Input__Message__1tYna{color:red;font-size:.8rem;text-align:justify;position:absolute}","",{version:3,sources:["/Users/przemekgreber/Desktop/Projects/GOODPROJECTS/React/meal-app/src/components/UI/Input/Input.css"],names:[],mappings:"AAAA,qBACI,WAAY,AACZ,aAAc,AACd,8BAA+B,AACvB,sBAAuB,AAC/B,gBAAkB,CAErB,AAED,qBACI,gBAAkB,AAClB,cAAe,AACf,iBAAmB,CACtB,AAED,4BACI,aAAc,AACd,yBAA0B,AAC1B,yBAA0B,AAC1B,cAAe,AACf,aAAc,AACd,iBAAkB,AAClB,cAAe,AACf,WAAY,AACZ,8BAA+B,AACvB,qBAAuB,CAGlC,AAED,0CACI,aAAc,CACjB,AAGD,kCACI,aAAc,AACd,wBAA0B,CAC7B,AAED,uBACI,oBAAsB,CACzB,AAED,uBACI,UAAW,AACX,gBAAkB,AAClB,mBAAoB,AACpB,iBAAmB,CACtB",file:"Input.css",sourcesContent:[".Input{\n    width: 100%;\n    padding: 10px;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    margin: 10px auto;\n\n}\n\n.Label {\n    font-weight: bold;\n    display: block;\n    margin-bottom: 8px;\n}\n\n.InputElement{\n    outline: none;\n    border: 1px solid #212529;\n    background-color: #212529;\n    color: #6c757d;\n    font: inherit;\n    padding: 6px 10px;\n    display: block;\n    width: 100%;\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n\n\n}\n\n.InputElement select option{\n    color: #6c757d\n}\n\n\n.InputElement:focus {\n    outline: none;\n    border: 1px solid #40a4c8;\n}\n\n.Invalid{\n    border: 1px solid red;\n}\n\n.Message{\n    color: red;\n    font-size: 0.8rem;\n    text-align: justify;\n    position: absolute;\n}"],sourceRoot:""}]),n.locals={Input:"Input__Input__s67N0",Label:"Input__Label___n-1m",InputElement:"Input__InputElement__2-aFx",Invalid:"Input__Invalid__1sl1p",Message:"Input__Message__1tYna"}},160:function(e,n,t){var a=t(161);"string"===typeof a&&(a=[[e.i,a,""]]);var r={hmr:!1};r.transform=void 0;t(141)(a,r);a.locals&&(e.exports=a.locals)},161:function(e,n,t){n=e.exports=t(140)(!0),n.push([e.i,".Register__Register__SMYW-{margin:20px auto;width:80%;-webkit-box-shadow:0 2px 3px #3d4043;box-shadow:0 2px 3px #3d4043;border:1px solid #2c2c30;-webkit-box-sizing:border-box;box-sizing:border-box;padding:10px;background-color:#18191a;border-radius:30px}.Register__Register__SMYW- h1{text-align:center}@media (min-width:600px){.Register__Register__SMYW-{width:500px}}","",{version:3,sources:["/Users/przemekgreber/Desktop/Projects/GOODPROJECTS/React/meal-app/src/containers/Auth/Register/Register.css"],names:[],mappings:"AAAA,2BACI,iBAAkB,AAClB,UAAW,AACX,qCAA8C,AACtC,6BAAsC,AAC9C,yBAAkC,AAClC,8BAA+B,AACvB,sBAAuB,AAC/B,aAAc,AACd,yBAA0B,AAC1B,kBAAoB,CACvB,AAED,8BACI,iBAAmB,CACtB,AAED,yBACI,2BACI,WAAa,CAChB,CACJ",file:"Register.css",sourcesContent:[".Register{\n    margin: 20px auto;\n    width: 80%;\n    -webkit-box-shadow: 0 2px 3px rgb(61, 64, 67);\n            box-shadow: 0 2px 3px rgb(61, 64, 67);\n    border: 1px solid rgb(44, 44, 48);\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    padding: 10px;\n    background-color: #18191A;\n    border-radius: 30px;\n}\n\n.Register h1 {\n    text-align: center;\n}\n\n@media (min-width: 600px) {\n    .Register{\n        width: 500px;\n    }\n}"],sourceRoot:""}]),n.locals={Register:"Register__Register__SMYW-"}}});
//# sourceMappingURL=1.3c2e2160.chunk.js.map