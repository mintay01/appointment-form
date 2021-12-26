var s,
DateWidget = {
  settings: {
    months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'],
    day: new Date().getUTCDate(),
    currMonth: new Date().getUTCMonth(),
    currYear: new Date().getUTCFullYear(),
    yearOffset: 21,
    containers: $(".dateDropdown")
  },

  init: function() {
    s = this.settings;
    DW = this;
    s.containers.each(function(){
    //   DW.removeFallback(this);
      DW.createSelects(this);
      DW.populateSelects(this);
      DW.initializeSelects(this);
      DW.bindUIActions();
    })
  },

  getDaysInMonth: function(month, year) {
     return new Date(year, month, 0).getDate();
  },

  addDays: function(daySelect, numDays){
    $(daySelect).empty();

    for(var i = 0; i < numDays; i++){
      $("<option />")
        .text(i + 1)
        .val(i + 1)
        .appendTo(daySelect);
    }
  },

  addMonths: function(monthSelect){
    for(var i = 0; i < 12; i++){
      $("<option />")
        .text(s.months[i])
        .val(s.months[i])
        .appendTo(monthSelect);
    }
  },

  addYears: function(yearSelect){
    for(var i = 0; i < s.yearOffset; i++){
      $("<option />")
        .text(i + s.currYear)
        .val(i + s.currYear)
        .appendTo(yearSelect);
    }
  },

  removeFallback: function(container) {
    $(container).empty();
  },

  createSelects: function(container) {
    $("<select class='day'>").appendTo(container);
    $("<select class='month'>").appendTo(container);
    $("<select class='year'>").appendTo(container);
  },

  populateSelects: function(container) {
    DW.addDays($(container).find('.day'), DW.getDaysInMonth(s.currMonth, s.currYear));
    DW.addMonths($(container).find('.month'));
    DW.addYears($(container).find('.year'));
  },

  initializeSelects: function(container) {
    $(container).find('.day').val(s.day);
    $(container).find('.currMonth').val(s.month);
    $(container).find('.currYear').val(s.year);
  },

  bindUIActions: function() {
    $(".month").on("change", function(){
      var daySelect = $(this).prev(), 
          yearSelect = $(this).next(),
          month = s.months.indexOf($(this).val()) + 1,
          days = DW.getDaysInMonth(month, yearSelect.val());
      DW.addDays(daySelect, days);
    });

    $(".year").on("change", function(){
      var daySelect = $(this).prev().prev(), 
          monthSelect = $(this).prev(),
          month = s.months.indexOf(monthSelect.val()) + 1,
          days = DW.getDaysInMonth(month, $(this).val());
      DW.addDays(daySelect, days);
    });
  }
};

DateWidget.init();


// dropdown
$(document).ready(function(){
    $('.dropdown-submenu a.test').on("click", function(e){
      $(this).next('ul').toggle();
      e.stopPropagation();
      e.preventDefault();
    });
  });