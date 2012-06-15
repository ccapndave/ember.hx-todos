var $_, $hxClasses = $hxClasses || {}, $estr = function() { return js.Boot.__string_rec(this,''); };
EReg = $hxClasses['EReg'] = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = ["EReg"];
EReg.prototype.r = null;
EReg.prototype.match = function(s) {
	this.r.m = this.r.exec(s);
	this.r.s = s;
	return this.r.m != null;
};
EReg.prototype.matched = function(n) {
	return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
		var $r;
		throw "EReg::matched";
		return $r;
	}(this));
};
EReg.prototype.matchedLeft = function() {
	if(this.r.m == null) throw "No string matched";
	return this.r.s.substr(0,this.r.m.index);
};
EReg.prototype.matchedRight = function() {
	if(this.r.m == null) throw "No string matched";
	var sz = this.r.m.index + this.r.m[0].length;
	return this.r.s.substr(sz,this.r.s.length - sz);
};
EReg.prototype.matchedPos = function() {
	if(this.r.m == null) throw "No string matched";
	return { pos : this.r.m.index, len : this.r.m[0].length};
};
EReg.prototype.split = function(s) {
	var d = "#__delim__#";
	return s.replace(this.r,d).split(d);
};
EReg.prototype.replace = function(s,by) {
	return s.replace(this.r,by);
};
EReg.prototype.customReplace = function(s,f) {
	var buf = new StringBuf();
	while(true) {
		if(!this.match(s)) break;
		buf.add(this.matchedLeft());
		buf.add(f(this));
		s = this.matchedRight();
	}
	buf.b[buf.b.length] = s == null?"null":s;
	return buf.b.join("");
};
EReg.prototype.__class__ = EReg;
Hash = $hxClasses['Hash'] = function() {
	this.h = { };
};
Hash.__name__ = ["Hash"];
Hash.prototype.h = null;
Hash.prototype.set = function(key,value) {
	this.h["$" + key] = value;
};
Hash.prototype.get = function(key) {
	return this.h["$" + key];
};
Hash.prototype.exists = function(key) {
	return this.h.hasOwnProperty("$" + key);
};
Hash.prototype.remove = function(key) {
	key = "$" + key;
	if(!this.h.hasOwnProperty(key)) return false;
	delete(this.h[key]);
	return true;
};
Hash.prototype.keys = function() {
	var a = [];
	for( var key in this.h ) {
	if(this.h.hasOwnProperty(key)) a.push(key.substr(1));
	}
	return a.iterator();
};
Hash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref["$" + i];
	}};
};
Hash.prototype.toString = function() {
	var s = new StringBuf();
	s.b[s.b.length] = "{";
	var it = this.keys();
	while( it.hasNext() ) {
		var i = it.next();
		s.b[s.b.length] = i == null?"null":i;
		s.b[s.b.length] = " => ";
		s.add(Std.string(this.get(i)));
		if(it.hasNext()) s.b[s.b.length] = ", ";
	}
	s.b[s.b.length] = "}";
	return s.b.join("");
};
Hash.prototype.__class__ = Hash;
IntIter = $hxClasses['IntIter'] = function(min,max) {
	this.min = min;
	this.max = max;
};
IntIter.__name__ = ["IntIter"];
IntIter.prototype.min = null;
IntIter.prototype.max = null;
IntIter.prototype.hasNext = function() {
	return this.min < this.max;
};
IntIter.prototype.next = function() {
	return this.min++;
};
IntIter.prototype.__class__ = IntIter;
Lambda = $hxClasses['Lambda'] = function() { };
Lambda.__name__ = ["Lambda"];
Lambda.array = function(it) {
	var a = new Array();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		a.push(i);
	}
	return a;
};
Lambda.list = function(it) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var i = $it0.next();
		l.add(i);
	}
	return l;
};
Lambda.map = function(it,f) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(x));
	}
	return l;
};
Lambda.mapi = function(it,f) {
	var l = new List();
	var i = 0;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(f(i++,x));
	}
	return l;
};
Lambda.has = function(it,elt,cmp) {
	if(cmp == null) {
		var $it0 = it.iterator();
		while( $it0.hasNext() ) {
			var x = $it0.next();
			if(x == elt) return true;
		}
	} else {
		var $it1 = it.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(cmp(x,elt)) return true;
		}
	}
	return false;
};
Lambda.exists = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
Lambda.foreach = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(!f(x)) return false;
	}
	return true;
};
Lambda.iter = function(it,f) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		f(x);
	}
};
Lambda.filter = function(it,f) {
	var l = new List();
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) l.add(x);
	}
	return l;
};
Lambda.fold = function(it,f,first) {
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		first = f(x,first);
	}
	return first;
};
Lambda.count = function(it,pred) {
	var n = 0;
	if(pred == null) {
		var $it0 = it.iterator();
		while( $it0.hasNext() ) {
			var _ = $it0.next();
			n++;
		}
	} else {
		var $it1 = it.iterator();
		while( $it1.hasNext() ) {
			var x = $it1.next();
			if(pred(x)) n++;
		}
	}
	return n;
};
Lambda.empty = function(it) {
	return !it.iterator().hasNext();
};
Lambda.indexOf = function(it,v) {
	var i = 0;
	var $it0 = it.iterator();
	while( $it0.hasNext() ) {
		var v2 = $it0.next();
		if(v == v2) return i;
		i++;
	}
	return -1;
};
Lambda.concat = function(a,b) {
	var l = new List();
	var $it0 = a.iterator();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		l.add(x);
	}
	var $it1 = b.iterator();
	while( $it1.hasNext() ) {
		var x = $it1.next();
		l.add(x);
	}
	return l;
};
Lambda.prototype.__class__ = Lambda;
List = $hxClasses['List'] = function() {
	this.length = 0;
};
List.__name__ = ["List"];
List.prototype.h = null;
List.prototype.q = null;
List.prototype.length = null;
List.prototype.add = function(item) {
	var x = [item];
	if(this.h == null) this.h = x; else this.q[1] = x;
	this.q = x;
	this.length++;
};
List.prototype.push = function(item) {
	var x = [item,this.h];
	this.h = x;
	if(this.q == null) this.q = x;
	this.length++;
};
List.prototype.first = function() {
	return this.h == null?null:this.h[0];
};
List.prototype.last = function() {
	return this.q == null?null:this.q[0];
};
List.prototype.pop = function() {
	if(this.h == null) return null;
	var x = this.h[0];
	this.h = this.h[1];
	if(this.h == null) this.q = null;
	this.length--;
	return x;
};
List.prototype.isEmpty = function() {
	return this.h == null;
};
List.prototype.clear = function() {
	this.h = null;
	this.q = null;
	this.length = 0;
};
List.prototype.remove = function(v) {
	var prev = null;
	var l = this.h;
	while(l != null) {
		if(l[0] == v) {
			if(prev == null) this.h = l[1]; else prev[1] = l[1];
			if(this.q == l) this.q = prev;
			this.length--;
			return true;
		}
		prev = l;
		l = l[1];
	}
	return false;
};
List.prototype.iterator = function() {
	return { h : this.h, hasNext : function() {
		return this.h != null;
	}, next : function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		return x;
	}};
};
List.prototype.toString = function() {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	s.b[s.b.length] = "{";
	while(l != null) {
		if(first) first = false; else s.b[s.b.length] = ", ";
		s.add(Std.string(l[0]));
		l = l[1];
	}
	s.b[s.b.length] = "}";
	return s.b.join("");
};
List.prototype.join = function(sep) {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	while(l != null) {
		if(first) first = false; else s.b[s.b.length] = sep == null?"null":sep;
		s.add(l[0]);
		l = l[1];
	}
	return s.b.join("");
};
List.prototype.filter = function(f) {
	var l2 = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		if(f(v)) l2.add(v);
	}
	return l2;
};
List.prototype.map = function(f) {
	var b = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		b.add(f(v));
	}
	return b;
};
List.prototype.__class__ = List;
Reflect = $hxClasses['Reflect'] = function() { };
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	return Object.prototype.hasOwnProperty.call(o,field);
};
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.getProperty = function(o,field) {
	var tmp;
	return o == null?null:o.__properties__ && (tmp = o.__properties__["get_" + field])?o[tmp]():o[field];
};
Reflect.setProperty = function(o,field,value) {
	var tmp;
	if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && f.__name__ == null;
};
Reflect.compare = function(a,b) {
	return a == b?0:a > b?1:-1;
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
};
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && !v.__enum__ || t == "function" && v.__name__ != null;
};
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
};
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
};
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = Array.prototype.slice.call(arguments);
		return f(a);
	};
};
Reflect.prototype.__class__ = Reflect;
Std = $hxClasses['Std'] = function() { };
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
};
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && x.charCodeAt(1) == 120) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
Std.random = function(x) {
	return Math.floor(Math.random() * x);
};
Std.prototype.__class__ = Std;
StringBuf = $hxClasses['StringBuf'] = function() {
	this.b = new Array();
};
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.add = function(x) {
	this.b[this.b.length] = x == null?"null":x;
};
StringBuf.prototype.addSub = function(s,pos,len) {
	this.b[this.b.length] = s.substr(pos,len);
};
StringBuf.prototype.addChar = function(c) {
	this.b[this.b.length] = String.fromCharCode(c);
};
StringBuf.prototype.toString = function() {
	return this.b.join("");
};
StringBuf.prototype.b = null;
StringBuf.prototype.__class__ = StringBuf;
StringTools = $hxClasses['StringTools'] = function() { };
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
};
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
};
StringTools.htmlEscape = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
};
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && s.substr(0,start.length) == start;
};
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && s.substr(slen - elen,elen) == end;
};
StringTools.isSpace = function(s,pos) {
	var c = s.charCodeAt(pos);
	return c >= 9 && c <= 13 || c == 32;
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return s.substr(r,l - r); else return s;
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return s.substr(0,l - r); else return s;
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		s += c.substr(0,l - sl);
		sl = l;
	} else {
		s += c;
		sl += cl;
	}
	return s;
};
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		ns += c.substr(0,l - sl);
		sl = l;
	} else {
		ns += c;
		sl += cl;
	}
	return ns + s;
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
};
StringTools.fastCodeAt = function(s,index) {
	return s.cca(index);
};
StringTools.isEOF = function(c) {
	return c != c;
};
StringTools.prototype.__class__ = StringTools;
/**********************************************************/;
Todos = $hxClasses['Todos'] = Ember.Application.create()
;
Todos.todosController = null;
Todos.main = function() {
	Todos.todosController = new Todos.controller.TodosController();
};
;
/**********************************************************/;
ValueType = $hxClasses['ValueType'] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; };
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
Type = $hxClasses['Type'] = function() { };
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if(o.__enum__ != null) return null;
	return o.__class__;
};
Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
};
Type.getSuperClass = function(c) {
	return c.__super__;
};
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || cl.__name__ == null) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || e.__ename__ == null) return null;
	return e;
};
Type.createInstance = function(cl,args) {
	switch(args.length) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
};
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
};
Type.createEnumIndex = function(e,index,params) {
	var c = e.__constructs__[index];
	if(c == null) throw index + " is not a valid enum constructor index";
	return Type.createEnum(e,c,params);
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	a.remove("__class__");
	a.remove("__properties__");
	return a;
};
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	a.remove("__name__");
	a.remove("__interfaces__");
	a.remove("__properties__");
	a.remove("__super__");
	a.remove("prototype");
	return a;
};
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.copy();
};
Type["typeof"] = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ != null) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2, _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e ) {
		return false;
	}
	return true;
};
Type.enumConstructor = function(e) {
	return e[0];
};
Type.enumParameters = function(e) {
	return e.slice(2);
};
Type.enumIndex = function(e) {
	return e[1];
};
Type.allEnums = function(e) {
	var all = [];
	var cst = e.__constructs__;
	var _g = 0;
	while(_g < cst.length) {
		var c = cst[_g];
		++_g;
		var v = Reflect.field(e,c);
		if(!Reflect.isFunction(v)) all.push(v);
	}
	return all;
};
Type.prototype.__class__ = Type;
if(typeof ember=='undefined') ember = {};
ember.ArrayExtensions = $hxClasses['ember.ArrayExtensions'] = function() { };
ember.ArrayExtensions.__name__ = ["ember","ArrayExtensions"];
ember.ArrayExtensions.pushObject = function(array,obj) {
	array.pushObject(obj);
};
ember.ArrayExtensions.removeObject = function(array,obj) {
	return array.removeObject(obj);
};
ember.ArrayExtensions.prototype.__class__ = ember.ArrayExtensions;
if(typeof haxe=='undefined') haxe = {};
haxe.Json = $hxClasses['haxe.Json'] = function() {
};
haxe.Json.__name__ = ["haxe","Json"];
haxe.Json.parse = function(text) {
	return new haxe.Json().doParse(text);
};
haxe.Json.stringify = function(value) {
	return new haxe.Json().toString(value);
};
haxe.Json.prototype.buf = null;
haxe.Json.prototype.str = null;
haxe.Json.prototype.pos = null;
haxe.Json.prototype.reg_float = null;
haxe.Json.prototype.toString = function(v) {
	this.buf = new StringBuf();
	this.toStringRec(v);
	return this.buf.b.join("");
};
haxe.Json.prototype.objString = function(v) {
	var first = true;
	this.buf.add("{");
	var _g = 0, _g1 = Reflect.fields(v);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		var value = Reflect.field(v,f);
		if(Reflect.isFunction(value)) continue;
		if(first) first = false; else this.buf.add(",");
		this.quote(f);
		this.buf.add(":");
		this.toStringRec(value);
	}
	this.buf.add("}");
};
haxe.Json.prototype.toStringRec = function(v) {
	var $e = (Type["typeof"](v));
	switch( $e[1] ) {
	case 8:
		this.buf.add("\"???\"");
		break;
	case 4:
		this.objString(v);
		break;
	case 1:
	case 2:
		this.buf.add(v);
		break;
	case 5:
		this.buf.add("\"<fun>\"");
		break;
	case 6:
		var c = $e[2];
		if(c == String) this.quote(v); else if(c == Array) {
			var v1 = v;
			this.buf.add("[");
			var len = v1.length;
			if(len > 0) {
				this.toStringRec(v1[0]);
				var i = 1;
				while(i < len) {
					this.buf.add(",");
					this.toStringRec(v1[i++]);
				}
			}
			this.buf.add("]");
		} else if(c == Hash) {
			var v1 = v;
			var o = { };
			var $it0 = v1.keys();
			while( $it0.hasNext() ) {
				var k = $it0.next();
				o[k] = v1.get(k);
			}
			this.objString(o);
		} else if(v.iterator != null) {
			var a = [];
			var it = v.iterator();
			while( it.hasNext() ) {
				var v1 = it.next();
				a.push(v1);
			}
			this.toStringRec(a);
		} else this.objString(v);
		break;
	case 7:
		var e = $e[2];
		this.buf.add(v[1]);
		break;
	case 3:
		this.buf.add(v?"true":"false");
		break;
	case 0:
		this.buf.add("null");
		break;
	}
};
haxe.Json.prototype.quote = function(s) {
	this.buf.add("\"");
	var i = 0;
	while(true) {
		var c = s.cca(i++);
		if(c != c) break;
		switch(c) {
		case 34:
			this.buf.add("\\\"");
			break;
		case 92:
			this.buf.add("\\\\");
			break;
		case 10:
			this.buf.add("\\n");
			break;
		case 13:
			this.buf.add("\\r");
			break;
		case 9:
			this.buf.add("\\t");
			break;
		case 8:
			this.buf.add("\\b");
			break;
		case 12:
			this.buf.add("\\f");
			break;
		default:
			this.buf.addChar(c);
		}
	}
	this.buf.add("\"");
};
haxe.Json.prototype.doParse = function(str) {
	this.reg_float = new EReg("^-?(0|[1-9][0-9]*)(\\.[0-9]+)?([eE][+-]?[0-9]+)?","");
	this.str = str;
	this.pos = 0;
	return this.parseRec();
};
haxe.Json.prototype.invalidChar = function() {
	this.pos--;
	throw "Invalid char " + this.str.cca(this.pos) + " at position " + this.pos;
};
haxe.Json.prototype.nextChar = function() {
	return this.str.cca(this.pos++);
};
haxe.Json.prototype.parseRec = function() {
	while(true) {
		var c = this.str.cca(this.pos++);
		switch(c) {
		case 32:case 13:case 10:case 9:
			break;
		case 123:
			var obj = { }, field = null, comma = null;
			while(true) {
				var c1 = this.str.cca(this.pos++);
				switch(c1) {
				case 32:case 13:case 10:case 9:
					break;
				case 125:
					if(field != null || comma == false) this.invalidChar();
					return obj;
				case 58:
					if(field == null) this.invalidChar();
					obj[field] = this.parseRec();
					field = null;
					comma = true;
					break;
				case 44:
					if(comma) comma = false; else this.invalidChar();
					break;
				case 34:
					if(comma) this.invalidChar();
					field = this.parseString();
					break;
				default:
					this.invalidChar();
				}
			}
			break;
		case 91:
			var arr = [], comma = null;
			while(true) {
				var c1 = this.str.cca(this.pos++);
				switch(c1) {
				case 32:case 13:case 10:case 9:
					break;
				case 93:
					if(comma == false) this.invalidChar();
					return arr;
				case 44:
					if(comma) comma = false; else this.invalidChar();
					break;
				default:
					if(comma) this.invalidChar();
					this.pos--;
					arr.push(this.parseRec());
					comma = true;
				}
			}
			break;
		case 116:
			var save = this.pos;
			if(this.str.cca(this.pos++) != 114 || this.str.cca(this.pos++) != 117 || this.str.cca(this.pos++) != 101) {
				this.pos = save;
				this.invalidChar();
			}
			return true;
		case 102:
			var save = this.pos;
			if(this.str.cca(this.pos++) != 97 || this.str.cca(this.pos++) != 108 || this.str.cca(this.pos++) != 115 || this.str.cca(this.pos++) != 101) {
				this.pos = save;
				this.invalidChar();
			}
			return false;
		case 110:
			var save = this.pos;
			if(this.str.cca(this.pos++) != 117 || this.str.cca(this.pos++) != 108 || this.str.cca(this.pos++) != 108) {
				this.pos = save;
				this.invalidChar();
			}
			return null;
		case 34:
			return this.parseString();
		case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:case 45:
			this.pos--;
			if(!this.reg_float.match(this.str.substr(this.pos))) throw "Invalid float at position " + this.pos;
			var v = this.reg_float.matched(0);
			this.pos += v.length;
			var f = Std.parseFloat(v);
			var i = f | 0;
			return i == f?i:f;
		default:
			this.invalidChar();
		}
	}
	return null;
};
haxe.Json.prototype.parseString = function() {
	var start = this.pos;
	var buf = new StringBuf();
	while(true) {
		var c = this.str.cca(this.pos++);
		if(c == 34) break;
		if(c == 92) {
			buf.b[buf.b.length] = this.str.substr(start,this.pos - start - 1);
			c = this.str.cca(this.pos++);
			switch(c) {
			case 114:
				buf.b[buf.b.length] = String.fromCharCode(13);
				break;
			case 110:
				buf.b[buf.b.length] = String.fromCharCode(10);
				break;
			case 116:
				buf.b[buf.b.length] = String.fromCharCode(9);
				break;
			case 98:
				buf.b[buf.b.length] = String.fromCharCode(8);
				break;
			case 102:
				buf.b[buf.b.length] = String.fromCharCode(12);
				break;
			case 47:case 92:case 34:
				buf.b[buf.b.length] = String.fromCharCode(c);
				break;
			case 117:
				var uc = Std.parseInt("0x" + this.str.substr(this.pos,4));
				this.pos += 4;
				buf.b[buf.b.length] = String.fromCharCode(uc);
				break;
			default:
				throw "Invalid escape sequence \\" + String.fromCharCode(c) + " at position " + (this.pos - 1);
			}
			start = this.pos;
		} else if(c != c) throw "Unclosed string";
	}
	buf.b[buf.b.length] = this.str.substr(start,this.pos - start - 1);
	return buf.b.join("");
};
haxe.Json.prototype.__class__ = haxe.Json;
if(typeof js=='undefined') js = {};
js.Boot = $hxClasses['js.Boot'] = function() { };
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__string_rec(v,"");
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML += js.Boot.__unhtml(msg) + "<br/>"; else if(typeof(console) != "undefined" && console.log != null) console.log(msg);
};
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		return o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
	}
};
js.Boot.__init = function() {
	js.Lib.isIE = typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null;
	js.Lib.isOpera = typeof window!='undefined' && window.opera != null;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	};
	Array.prototype.remove = Array.prototype.indexOf?function(obj) {
		var idx = this.indexOf(obj);
		if(idx == -1) return false;
		this.splice(idx,1);
		return true;
	}:function(obj) {
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				return true;
			}
			i++;
		}
		return false;
	};
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}};
	};
	if(String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
	String.prototype.charCodeAt = function(i) {
		var x = this.cca(i);
		if(x != x) return undefined;
		return x;
	};
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		} else if(len < 0) len = this.length + len - pos;
		return oldsub.apply(this,[pos,len]);
	};
	Function.prototype["$bind"] = function(o) {
		var f = function() {
			return f.method.apply(f.scope,arguments);
		};
		f.scope = o;
		f.method = this;
		return f;
	};
};
js.Boot.prototype.__class__ = js.Boot;
js.Lib = $hxClasses['js.Lib'] = function() { };
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
};
js.Lib.eval = function(code) {
	return eval(code);
};
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
};
js.Lib.prototype.__class__ = js.Lib;
/**********************************************************/;
if(typeof Todos=='undefined') Todos = {};
if(!Todos.controller) Todos.controller = {};
Todos.controller.TodosController = $hxClasses['Todos.controller.TodosController'] = Ember.ArrayController.extend({
isLoading: null,
init: function() {
	this.isLoading = true;
	this.set("content",[]);
	if(localStorage.getItem(Todos.controller.TodosController.LOCAL_STORAGE_KEY)) {
		var _g = 0, _g1 = (function($this) {
			var $r;
			var $t = haxe.Json.parse(localStorage.getItem(Todos.controller.TodosController.LOCAL_STORAGE_KEY));
			if(Std["is"]($t,Array)) $t; else throw "Class cast error";
			$r = $t;
			return $r;
		}(this));
		while(_g < _g1.length) {
			var obj = _g1[_g];
			++_g;
			this.pushObject(Todos.model.Todo.fromJson(obj));
		}
	}
	this.isLoading = false;
	Ember.ArrayController.prototype.init.call(this);
},
saveTodos: function() {
	if(!this.isLoading && this.get("content") != null) localStorage.setItem(Todos.controller.TodosController.LOCAL_STORAGE_KEY,JSON.stringify(this.get("content")));
}.observes('@each'),
createTodo: function(title) {
	var todo = new Todos.model.Todo();
	todo.set("title",title);
	this.pushObject(todo);
},
clearCompletedTodos: function() {
	Lambda.foreach(Lambda.filter(this.get("content"),function(todo) {
		return todo.get("completed");
	}),this.removeObject.$bind(this));
},
remaining: function() {
	return Lambda.filter(this.get("content"),function(todo) {
		return !todo.get("completed");
	}).length;
}.property('@each.completed'),
completed: function() {
	return Lambda.filter(this.get("content"),function(todo) {
		return todo.get("completed");
	}).length;
}.property('@each.completed'),
isEmpty: function() {
	return this.get("content").length == 0;
}.property('length'),
allAreCompleted: function(key,value) {
	return (function($this) {
		var $r;
		switch(value) {
		case null: case undefined:
			$r = $this.get("content").length > 0 && Lambda.foreach($this.get("content"),function(todo) {
				return todo.get("completed");
			});
			break;
		default:
			$r = Lambda.foreach($this.get("content"),function(todo) {
				return todo.set("completed",value);
			});
		}
		return $r;
	}(this));
}.property('@each.completed'),
});
;
/**********************************************************/;
/**********************************************************/;
if(!Todos.model) Todos.model = {};
Todos.model.Todo = $hxClasses['Todos.model.Todo'] = Ember.Object.extend({
title: null,
completed: null,
});
Todos.model.Todo.fromJson = function(obj) {
	var todo = new Todos.model.Todo();
	todo.set("title",obj.title);
	todo.set("completed",obj.completed);
	return todo;
};
;
/**********************************************************/;
/**********************************************************/;
if(!Todos.view) Todos.view = {};
Todos.view.CreateTodoView = $hxClasses['Todos.view.CreateTodoView'] = Ember.TextField.extend({
insertNewline: function() {
	if(this.get("value") != "") {
		Todos.todosController.createTodo(this.get("value"));
		this.set("value","");
	}
},
});
;
/**********************************************************/;
/**********************************************************/;
Todos.view.MainView = $hxClasses['Todos.view.MainView'] = Ember.View.extend({
pluralizeItems: function() {
	return Todos.todosController.get("remaining") <= 1?"item":"items";
}.property('Todos.todosController.remaining'),
onClearCompletedTodos: function() {
	Todos.todosController.clearCompletedTodos();
},
});
;
/**********************************************************/;
/**********************************************************/;
Todos.view.TodoView = $hxClasses['Todos.view.TodoView'] = Ember.View.extend({
todo: null,
editing: null,
doubleClick: function(event) {
	this.set("editing",true);
},
onDestroy: function(event) {
	Todos.todosController.removeObject(this.get("todo"));
},
});
;
/**********************************************************/;
/**********************************************************/;
Todos.view.TodoTextField = $hxClasses['Todos.view.TodoTextField'] = Ember.TextField.extend({
todo: null,
focusOut: function(event) {
	this.finishEditing();
},
keyUp: function(event) {
	if(event.which == Todos.view.TodoTextField.ENTER) this.finishEditing();
},
finishEditing: function() {
	((function($this) {
		var $r;
		var $t = $this.get("parentView");
		if(Std["is"]($t,Todos.view.TodoView)) $t; else throw "Class cast error";
		$r = $t;
		return $r;
	}(this))).set("editing",false);
	if(this.get("todo").get("title") == "") Todos.todosController.removeObject(this.get("todo"));
},
});
;
/**********************************************************/;
$_ = {};
js.Boot.__res = {};
js.Boot.__init();
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	$hxClasses["Math"] = Math;
	Math.isFinite = function(i) {
		return isFinite(i);
	};
	Math.isNaN = function(i) {
		return isNaN(i);
	};
};
{
	String.prototype.__class__ = $hxClasses["String"] = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = $hxClasses["Array"] = Array;
	Array.__name__ = ["Array"];
	var Int = $hxClasses["Int"] = { __name__ : ["Int"]};
	var Dynamic = $hxClasses["Dynamic"] = { __name__ : ["Dynamic"]};
	var Float = $hxClasses["Float"] = Number;
	Float.__name__ = ["Float"];
	var Bool = $hxClasses["Bool"] = Boolean;
	Bool.__ename__ = ["Bool"];
	var Class = $hxClasses["Class"] = { __name__ : ["Class"]};
	var Enum = { };
	var Void = $hxClasses["Void"] = { __ename__ : ["Void"]};
};
if(typeof(JSON) != "undefined") haxe.Json = JSON;
{
	if(typeof document != "undefined") js.Lib.document = document;
	if(typeof window != "undefined") {
		js.Lib.window = window;
		js.Lib.window.onerror = function(msg,url,line) {
			var f = js.Lib.onerror;
			if(f == null) return false;
			return f(msg,[url + ":" + line]);
		};
	}
};
js.Lib.onerror = null;
;
Todos.controller.TodosController.LOCAL_STORAGE_KEY = "todos-mvc";
;
Todos.view.TodoTextField.ENTER = 13;
;
Todos.main();
