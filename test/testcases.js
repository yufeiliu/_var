var $test = document.getElementById("test1");
var obj = {prop:1};
something = "hello";

test('declaring', function() {

	_var("newVar").bind(function(v){});
	newVal = 1;
	ok(newVal == 1, "declare new variable")

	_var("something").bind($test);
	ok($test.innerHTML=="hello", "modify existing variable")
});

test('binding', function() {
	var recorded = null;
	var f = function(v) {recorded = v;};

	_var("sampleVar").bind($test).bind(f);

	sampleVar = 1;
    ok($test.innerHTML==1, 'variable bound to DOM element');
    ok(recorded==1, 'variable bound to function');
    ok(_var("sampleVar").bindings.length==2, 'two targets bound')


    _var("obj.prop").bind($test);
    ok($test.innerHTML==1, "object property bound to DOM element, initialization");
    obj.prop=2;
    ok($test.innerHTML==2, "object property bound to DOM element, updating");

    var sum = 0;
    var stateful = function(e) {sum+=e};
	sampleStateful = 1;
	_var("sampleStateful").bind(stateful);
	sampleStateful = 2;
	_var("sampleStateful").bind($test);
	ok(sum==3, "bindings initializations do not repeat unnecessarily");
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


    _var("sampleVar3").bind($test).bind(f).unbind(1);
    sampleVar3 = 3;
    ok(recorded==null, 'variable unbound using indexed argument');
});