/**
 * @author wushubin@mail.39.net
 * @returns
 */
function Map() {
	this.arr = new Array();

	var struct = function(key, value) {
		this.key = key;
		this.value = value;
	}

	this.getKeys = function() {
		var array = new Array();
		for ( var i = 0; i < this.arr.length; i++) {
			array[i] = this.arr[i].key;
		}
		return array;
	}
	
	this.getValues = function() {
		var array = new Array();
		for ( var i = 0; i < this.arr.length; i++) {
			array[i] = this.arr[i].value;
		}
		return array;
	}
	
	this.put = function(key, value) {
		for ( var i = 0; i < this.arr.length; i++) {
			if (this.arr[i].key === key) {
				this.arr[i].value = value;
				return;
			}
		}
		this.arr[this.arr.length] = new struct(key, value);
	}

	this.get = function(key) {
		for ( var i = 0; i < this.arr.length; i++) {
			if (this.arr[i].key === key) {
				return this.arr[i].value;
			}
		}
		return null;
	}

	this.remove = function(key) {
		var v;
		for ( var i = 0; i < this.arr.length; i++) {
			v = this.arr.pop();
			if (v.key === key) {
				continue;
			}
			this.arr.unshift(v);
		}
	}

	this.size = function() {
		return this.arr.length;
	}

	this.isEmpty = function() {
		return this.arr.length <= 0;
	}
}