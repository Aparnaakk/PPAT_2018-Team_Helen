




function DropDown2(el) {
		this.ee = el;
		this.placeholder = this.ee.children('span');
		this.opts = this.ee.find('ul.dropdown > li');
		this.val = '';
		this.index = -1;
		this.initEvents();
	}
	DropDown2.prototype = {
		initEvents : function() {
			var obj = this;

			obj.ee.on('click', function(event){
				console.log("ee")
				$(this).toggleClass('active');
				return false;
			});

			obj.opts.on('click',function(){
				console.log("ee2")
				var opt = $(this);
				obj.val = opt.text();
				obj.index = opt.index();
				obj.placeholder.text(obj.val);
			});
		},
		getValue : function() {
			return this.val;
		},
		getIndex : function() {
			return this.index;
		}
	}

	$(function() {

		var ee = new DropDown2( $('#ee') );

		$(document).click(function() {
			// all dropdowns
			$('.wrapper-dropdown-3').removeClass('active');
		});

	});




function DropDown1(el) {
		this.dd = el;
		this.placeholder = this.dd.children('span');
		this.opts = this.dd.find('ul.dropdown > li');
		this.val = '';
		this.index = -1;
		this.initEvents();
	}
	DropDown1.prototype = {
		initEvents : function() {
			var obj = this;

			obj.dd.on('click', function(event){
				console.log("dd")
				$(this).toggleClass('active2');
				return false;
			});

			obj.opts.on('click',function(){
				var opt = $(this);
				obj.val = opt.text();
				obj.index = opt.index();
				obj.placeholder.text(obj.val);
			});
		},
		getValue : function() {
			return this.val;
		},
		getIndex : function() {
			return this.index;
		}
	}

	$(function() {

		var dd = new DropDown1( $('#dd') );

		$(document).click(function() {
			// all dropdowns
			$('.wrapper-dropdown-3').removeClass('active');
		});

	});


	

