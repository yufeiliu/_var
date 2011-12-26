var $test = document.getElementById("test1");
var something = "hello";

test('declaring', function() {

	_var("newVar").bind(function(v){});
	newVal = 1;
	ok(newVal == 1, "declare new variable")

	_var("something").bind($test);
	something = 1;
	ok(something==1, "modify existing variable")
});

test('binding', function() {
	var recorded = null;
	var f = function(v) {recorded = v;};

	_var("sampleVar").bind($test).bind(f);

	sampleVar = 1;
    ok($test.innerHTML==1, 'variable bound to DOM element');
    ok(recorded==1, 'variable bound to function');
    ok(_var("sampleVar").bindings.length==2, 'two targets bound')
});

test('unbinding', function() {
	var recorded = null;
	$test.innerHTML = "";
	var f = function(v) {recorded = v;};

	_var("sampleVar2").bind($test).unbind($test).bind(f).unbind(f);

	sampleVar2 = 2;
    ok($test.innerHTML!=2, 'variable unbound to DOM element');
    ok(recorded==null, 'variable unbound to function');
    ok(_var("sampleVar2").bindings.length==0, 'two targets bound')
});