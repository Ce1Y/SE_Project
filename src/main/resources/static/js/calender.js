document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');
    var calendar;
    initThemeChooser({
        init: function (themeSystem) {
            // var calendar = new FullCalendar.Calendar(calendarEl, {
            calendar = new FullCalendar.Calendar(calendarEl, {
                themeSystem: themeSystem,
                locale: "zh-tw",
                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek'
                },
                navLinks: true, // can click day/week
                editable: true,
                nowIndicator: true,
                dayMaxEvents: true,
                selectable: true,
                selectMirror: true,
                select: function (arg) {
                    var myDate = document.querySelector('#Date-name');
                    var tomo = new Date(arg.start);
                    tomo.setDate(tomo.getDate() + 1);
                    myDate.value = tomo.toISOString().substr(0, 10);
                    $("#staticBackdrop").modal('show');
                    calendar.addEvent({
                        title: "test",
                        start: arg.start,
                        end: arg.end,
                        allDay:arg.allDay
                    })
                    calendar.unselect()
                }
            });
            calendar.render();
        },

        change: function (themeSystem) {
            calendar.setOption('themeSystem', themeSystem);
        }
    });
});